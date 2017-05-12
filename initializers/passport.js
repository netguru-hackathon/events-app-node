'use strict';

const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

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
