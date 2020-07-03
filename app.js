const express = require('express');
const https = require('https');
const app =express();
const port = 3200;
const fs = require('fs');
const bodyParser = require('body-parser');
const privateKey  = fs.readFileSync('config/selfsigned.key', 'utf8');
const certificate = fs.readFileSync('config/selfsigned.crt', 'utf8');

const credentials = {key: privateKey, cert: certificate};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("Oidc");
})

app.get('/authorize', (req, res) => {
    //TODO: check authentication on this server
    let uri = decodeURIComponent(req.query.redirect_uri);
    let state = req.query.state;
    res.redirect(302, uri + `?state=${state}&code=eyJraWQiOiJLNmJUQllYeGZiRGNVOElUSER5YnJZSWZ3cnVXa3JMbnEwdDNTQ2ltNGpvPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoieDBiUVUtWnZuSDUzb1k5YmxzLWNlZyIsInN1YiI6Ijg1YmI4ZDVlLTNlYjctNGU0My1iMDc5LTE0MzkzNjJmZGRhYSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTFfdzFoU2FrOFVMIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnVzZXJuYW1lIjoicXV5LnRydW9uZyIsInBpY3R1cmUiOiJpbWFnZS5wbmciLCJhdWQiOiIyazUyYTR2bDhmZW9qbGl0cmJkaWxtb3VlNCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTkzNzc0MjkxLCJuYW1lIjoiUXV5IFRydW9uZyIsInBob25lX251bWJlciI6Iis4NDkxMTI5NzMzMiIsImV4cCI6MTU5Mzc3Nzg5MSwiaWF0IjoxNTkzNzc0MjkxLCJlbWFpbCI6InF1eS50cnVvbmdAc2FpZ29udGVjaG5vbG9neS5jb20ifQ.cPhLOT6BTIXVmvIudy3JKkyNBfPJY7FojShdysJqu1xE_x3xiHujTos35zRkzlhEPWENbXhCQVXTC6ep873tKcdsLk5Rowak6KROPnfhOdTJnEaL_dWEM9X4VX03eC6pLkJqVDnu2j2Xu2zGUzjxWGCdX37BVpgx3ka5vNCNAWAKz9fmzVcbJO_KDdepo-e9p1COrH_yD06X4o6Hw-cwbDJ513DHkbOjOsQb9YDHCnBTqOev-QoM4BXqG4hClIe-Zhw2OjgZXHKUxhxYdE5lOC79PHp_UiV6jUic1UBfW41GaM_qBYVi7uZAa_Zm4rNgZACKMXCuhgCfPGUSsmy9qg&access_token=eyJraWQiOiJGeGFJUWRJSjlsVERcL3VYK1RTRlRwRG5kdTZkNlBBWk5tQ3drWHp3cmp2cz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4NWJiOGQ1ZS0zZWI3LTRlNDMtYjA3OS0xNDM5MzYyZmRkYWEiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNTkzNzc0MjkxLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTFfdzFoU2FrOFVMIiwiZXhwIjoxNTkzNzc3ODkxLCJpYXQiOjE1OTM3NzQyOTEsInZlcnNpb24iOjIsImp0aSI6IjY4YTAxNjZiLTU5MGYtNGU5MC1iOWY5LTc3ZjJiNTQ2MmY0MiIsImNsaWVudF9pZCI6IjJrNTJhNHZsOGZlb2psaXRyYmRpbG1vdWU0IiwidXNlcm5hbWUiOiJxdXkudHJ1b25nIn0.N4ZUGVWFLeDOTgQRHXMqMc_rSkfxbrQhPBvYgRsJK3j_jlNxCshKRUvCLFpxc958JTMlXPDqapkr-wu-fVSxz_Nj5j6t8anhsOmNb6XEDucklz_6VWXGAmIGbnq7bK1DA0TwMT6q7Dg0jLfCdQBxRgqfdQN6d5WevWGxswqvf99b6N9EsOb47USalF_7VwFiqv0IBCO975NEWyXTplE-GtHb-j1SQQa5D5n1QpJGBr4Ny2nyKVcO8ZgclrPXyge7EeEEXIAEKUPYNSWX1AXq0KDcbEaIeBppqWy23JL_96kAJ4HbRWziQ582uXjM9eErUKNmfSIwW-kwCY1xvYct-A`);
});

app.post('/token', (req, res) => {

});

app.post('/userinfo', (req, res) => {

});

app.post('/jwks', (req, res) => {

});
app.get('/login', (req,res) => {

});
app.post('/login', (req, res) => {

});

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port);