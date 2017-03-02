// var express = require ('express');
// var app = express();
// var passport = require('passport');
// var strategy = require("./config/auth");
// var Auth0Strategy = require('passport-auth0');

// // Configure Passport to use Auth0
// var strategy = new Auth0Strategy({
//     domain:       process.env.dflint1.auth0.com,
//     clientID:     process.env.vhEttCE1CDX47iLcwqrD9QzktODnIRSm,
//     clientSecret: process.env.XvFQK_a1BXGeecc4GPiMvtiBU4fMdwGe5ja71gIQr_LKh8AMHkB8BnzlYPWtG3Aj,
//     callbackURL:  process.env.AUTH0_CALLBACK_URL || "localhost:3000/user"
//   }, function(accessToken, refreshToken, extraParams, profile, done) {
//     // accessToken is the token to call Auth0 API (not needed in the most cases)
//     // extraParams.id_token has the JSON Web Token
//     // profile has all the information from the user
//     return done(null, profile);
//   });

// passport.use(strategy);

// // This can be used to keep a smaller payload
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });


// //add middlewares
// app.use(passport.initialize());
// app.use(passport.session());

// //add route handlers
// var user = require('./routes/user');