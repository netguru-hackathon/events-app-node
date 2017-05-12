'use strict';

require('dotenv').config()
const express = require('express')
const models = require('./models/index');
const request = require('request')
const path = require('path')
const app = express()

const _ = require("lodash");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');

const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'turboKoala2000';

const jwtStrategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  console.log('payload received', jwt_payload);
  let user_id = jwt_payload.id
  models.User.findById(user_id).then((result) => {
    return next(null, result.dataValues)
  }, (value) => {
    console.log('value', value);
    return next(null, false)
  })
});

const bearerStrategy = passport.use(new BearerStrategy(
  (token, done) => {
     models.User.findOne({where: {token: token}}).then((user, err) => {
       if (err) { return done(err); }
       if (!user) { return done(null, false); }
       return done(null, user, { scope: 'all' });
     })
    }
  ));

passport.use('bearerStrategy', bearerStrategy);
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send('Hello!')
})

app.get('/secured', passport.authenticate('bearer', { session: false }), (req, res) => {
  res.json({message: 'SECURED CIA INFO'});
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
    return request(options, (error, response, body) => {
        var JSONresponse = JSON.parse(body)
        if (!JSONresponse.ok){
            console.log(JSONresponse)
            res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
        } else {
          let username = JSONresponse.user.name;
          let slack_id = JSONresponse.user.id;
          return models.User.findOrCreate({where: { name: username, slack_id: slack_id }})
            .then((result) => {
              let user = result[0]
              let payload = {id: user.dataValues.id};
              jwt.sign(payload, jwtOptions.secretOrKey, (err, token) => {
                if(err) { console.error(err); }

                user.update({token: token}).then(function() {
                  res.json({message: "ok", token: token});
                })
              });
            })
        }
    })
})

// JWT authenticate
//
// app.get('/slack/auth', (req, res) =>{
//     var options = {
//         uri: 'https://slack.com/api/oauth.access?code='
//             +req.query.code+
//             '&client_id='+process.env.CLIENT_ID+
//             '&client_secret='+process.env.CLIENT_SECRET+
//             '&redirect_uri='+process.env.REDIRECT_URI,
//         method: 'GET'
//     }
//     request(options, (error, response, body) => {
//         var JSONresponse = JSON.parse(body)
//         if (!JSONresponse.ok){
//             console.log(JSONresponse)
//             res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
//         } else {
//           let username = JSONresponse.user.name;
//           let slack_id = JSONresponse.user.id;
//           models.User.findOrCreate({where: { name: username, slack_id: slack_id }})
//             .then((result) => {
//               let user = result[0]
//               let payload = {id: user.dataValues.id};
//               let token = jwt.sign(payload, jwtOptions.secretOrKey);
//               res.json({message: "ok", token: token});
//             })
//         }
//     })
// })

const port = process.env.PORT || 10010;
app.listen(port);

console.log(`Server started at port ${port}`);
module.exports = app;
