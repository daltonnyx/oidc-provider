const express = require('express');
const path = require('path');
const https = require('https');
const app =express();
const port = 3200;
const fs = require('fs');
const bodyParser = require('body-parser');
const OidcProvider = require('oidc-provider');

const CognitoAdapter = require('./adapters/cognitoUserAdapter');
const Account = require('./tests/account');
const routes = require('./routes');

const privateKey  = fs.readFileSync('config/selfsigned.key', 'utf8');
const certificate = fs.readFileSync('config/selfsigned.crt', 'utf8');

const credentials = {key: privateKey, cert: certificate};
const jwks = require('./config/jwks.json');

const interactions = OidcProvider.interactionPolicy.base();

const oidc = new OidcProvider(`https://localhost:${port}`, {
    findAccount: Account.findAccount,
    //adapter: CognitoAdapter,
    clients: [
        {
            client_id: '339b515b7e05',
            client_secret: 'sRdrHdpuogkN24P19DKX7T44ZZFDUIuYYQH7N61qQnqYBXR2Oo2WDAq51Yg7mnjK',
            grant_types: ['authorization_code', 'refresh_token'],
            redirect_uris: ['https://fusang-sso-poc.auth.ap-southeast-1.amazoncognito.com/oauth2/idpresponse'],
        }
    ],
    cookies: {
        long: {signed: true, maxAge: (1 * 24 * 60 * 60) * 1000},
        short: {signed: true},
        keys: ['YD4iKyFljdjf96kciAFOaPqnMQmrKR92']
    },
    claims: {
        address: ['address'],
        email: ['email', 'email_verified'],
        phone: ['phone_number', 'phone_number_verified'],
        profile: ['birthdate', 'family_name', 'gender', 'given_name', 'locale', 'middle_name', 'name',
        'nickname', 'picture', 'preferred_username', 'profile', 'updated_at', 'website', 'zoneinfo'],
    },
    jwks: jwks,
    interactions: {
        policy: interactions,
        url(ctx, interation) {
            return `/interaction/${ctx.oidc.uid}`;
        }
    },
    features: {
        devInteractions: { enabled: false },
        deviceFlow: { enabled: false },
        introspection: { enabled: true },
        revocation: { enabled: true }
    },
    ttl: {
        AccessToken: 1 * 60 * 60, // 1 hour in seconds
        AuthorizationCode: 10 * 60, // 10 minutes in seconds
        IdToken: 1 * 60 * 60, // 1 hour in seconds
        DeviceCode: 10 * 60, // 10 minutes in seconds
        RefreshToken: 1 * 24 * 60 * 60, // 1 day in seconds
    }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
routes(app, oidc);

app.get('/', (req, res) => {
    res.send("Oidc");
});

app.use('/openid',oidc.callback);



const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port);