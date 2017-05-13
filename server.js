'use strict'

require('dotenv').config()
const express = require('express')
const bodyParser = require("body-parser")
const jwt = require('jsonwebtoken')
const models = require('./models/index')
const passport = require('passport')
const path = require('path')
const request = require('request')
const _ = require("lodash")
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
import { authorizeWithAuthCode } from './services/slackAuth'

const app = express();
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(bodyParser.urlencoded({
  extended: true
}));

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'turboKoala2000';

require('./initializers/passport')

app.get('/', (req, res) => {
  res.send('Hello in sample events app api !!!')
})

app.get('/secured', passport.authenticate('bearer', { session: false }), (req, res) => {
  res.json({message: 'SECURED CIA INFO'})
})

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname+'/log_button.html'))
})

app.get('/slack/auth', (req, res) =>{
  authorizeWithAuthCode(req.query.code)
    .then(({username, slack_id}) => {
      return models.User.findOrCreate({where: { name: username, slack_id: slack_id }})
        .then((result) => {
          let user = result[0]
          let payload = {id: user.dataValues.id};
          jwt.sign(payload, jwtOptions.secretOrKey, (err, token) => {
            if(err) { console.error(err); }

            user.update({token: token}).then(function() {
              res.json({message: "ok", token: token})
            })
          })
        }).catch((error) => res.send(error))
    })
})

const port = process.env.PORT || 10010;
app.listen(port);

console.log(`Server started at port ${port}`);
module.exports = app;
