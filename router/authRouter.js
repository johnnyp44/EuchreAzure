// const express = require('express');
// const authRouter = express.Router()
// const bodyParser = require('body-parser');
// const mongoose = require("mongoose");
// const session = require("express-session");
// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
// const findOrCreate = require("mongoose-findorcreate");
// // const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

// //setup Auth & Sessions
// // app.use(session({
// //   secret: 'This is a really cool string. CashOut$ Doughboy$',
// //   resave: true,
// //   saveUninitialized: true
// //   // cookie: { secure: true }
// // }));
// authRouter.use(passport.initialize());
// authRouter.use(passport.session());

// //const User = require("../models/User");
// // const userSchema = new mongoose.Schema({
// //   googleId: String,
// //   email: String,
// //   given_name: String,
// //   family_name: String
// // });

// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

// const User = new mongoose.model("User", userSchema);

// passport.use(User.createStrategy());

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

// passport.use(new GoogleStrategy({
//     clientID:     process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/secrets",
//     userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
//     passReqToCallback   : true
//   },
//   function(request, accessToken, refreshToken, profile, done) {
//     //console.log(profile);
//     User.findOrCreate({ googleId: profile.id, given_name: profile.given_name, family_name: profile.family_name, email: profile.email }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));

// authRouter.get("/google",
//   passport.authenticate("google", { scope:
//       ["email","profile"] }
// ));

// authRouter.get("/google/secrets",
//   passport.authenticate("google", {failureRedirect: "/"}),
//   function(req,res){
//     //Successful Authentication
//     res.redirect("/secrets");
// });



// // authRouter.get('/facebook', function(req,res){
// //   res.render('index', {auth:"Clicked Facebook"});
// // });
// //
// // authRouter.get('/instagram', function(req,res){
// //   res.render('index', {auth:"Clicked Instagram"});
// // });
// //
// // authRouter.get('/twitter', function(req,res){
// //   res.render('index', {auth:"Clicked Twitter"});
// // });
// //
// // authRouter.get('/linkedin', function(req,res){
// //   res.render('index', {auth:"Clicked LinkedIn"});
// // });


// module.exports = authRouter;
