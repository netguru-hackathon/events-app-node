'use strict';

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
