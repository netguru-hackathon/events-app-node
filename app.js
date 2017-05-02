'use strict';

require('dotenv').config()
const express = require('express')
const request = require('request')
const path = require('path')
const app = express()

app.get('/', (req, res) => {
  console.log(req.query.log);
  res.send('Hello!')
})

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname+'/log_button.html'))
})

app.get('/slack/auth', (req, res) =>{
    var options = {
        uri: 'https://slack.com/api/oauth.access?code='
            +req.query.code+
            '&client_id='+process.env.CLIENT_ID+
            '&client_secret='+process.env.CLIENT_SECRET+
            '&redirect_uri='+process.env.REDIRECT_URI,
        method: 'GET'
    }
    request(options, (error, response, body) => {
        var JSONresponse = JSON.parse(body)
        if (!JSONresponse.ok){
            console.log(JSONresponse)
            res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
        }else{
            console.log(JSONresponse)
            res.sendFile(path.join(__dirname+'/after_login.html'))
        }
    })
})

const port = process.env.PORT || 10010;
app.listen(port);

console.log(`Server started at port ${port}`);
module.exports = app;
