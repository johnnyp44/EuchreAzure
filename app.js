require('dotenv').config();

const path = require('path');
const express = require("express");
const ejs = require("ejs");
var session = require('express-session');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const appInsights = require("applicationinsights");

require("./dbAzureConfig")();

//Azure Portal Application Insights
appInsights.setup('327fb52c-4445-40be-8bac-247428924e13').start();

// initialize express
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

//ROUTES
const authRoute    = require("./router/auth");
const indexRoute   = require("./router/indexRouter");
const playersRoute = require("./router/playersRouter");
const gamesRoute   = require("./router/gamesRouter");
const leaguesRoute = require("./router/leaguesRouter");
const leadersRoute = require("./router/leaderBoardRouter");
const usersRoute   = require("./router/users");



/**
 * Using express-session middleware for persistent user session. Be sure to
 * familiarize yourself with available options. Visit: https://www.npmjs.com/package/express-session
 */
app.use(session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // set this to true on production
    }
}));

app.use('/', indexRoute);
app.use('/auth', authRoute);
app.use('/games', gamesRoute);
app.use('/leaderboards', leadersRoute);
app.use('/users', usersRoute);
app.use('/players', playersRoute);
app.use('/leagues', leaguesRoute);

var NO_PAGE = 'That page does not exist.';

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error/index',{
    isAuthenticated: req.session.isAuthenticated,
    username: req.session.account?.username,
    fullName: req.session.account?.name,
    error: res.locals.message,
    CustomErrorMessage : NO_PAGE,
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
