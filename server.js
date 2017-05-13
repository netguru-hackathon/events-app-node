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
import SessionSerializer from './serializers/session'
import { handleError } from './helpers/common'

const app = express();


function createSession(req, res) {
  authorizeWithAuthCode(req.body.code || req.query.code)
    .then(({username, slack_id}) => {
      models;
      debugger;
      return models.User.findOrCreate({where: { name: username, slack_id: slack_id }})
        .then((result) => {
          let user = result[0]
          let payload = {id: user.dataValues.id};
          return jwt.sign(payload, jwtOptions.secretOrKey, (err, token) => {
            return user.update({token: token}).then(function() {
              res.json(SessionSerializer.serialize({id: user.id, token: token}))
            })
          })
        })
    }).catch((error) => handleError(res, 404, error))
}
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

app.get('/slack/auth', createSession)
app.post('/api/session', createSession)

app.post('/session')

const port = process.env.PORT || 10010;
app.listen(port);

console.log(`Server started at port ${port}`);
module.exports = app;
