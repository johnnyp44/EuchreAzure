const express = require("express");
const appInsights = require("applicationinsights");
const ejs = require("ejs");
const path = require('path');
const app = express();


require("./config")();
//Azure Portal Application Insights
appInsights.setup('327fb52c-4445-40be-8bac-247428924e13').start();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));


//ROUTES
const authRoute    = require("./router/authRouter");
const indexRoute   = require("./router/indexRouter");
const gamesRoute   = require("./router/gamesRouter");
const leadersRoute = require("./router/leaderBoardRouter");

//app.use("/", postRoute);
app.use('/', indexRoute);
app.use('/auth', authRoute);
app.use('/games', gamesRoute);
app.use('/leaderboards', leadersRoute);

app.get("/secrets", function(req, res){
  if(req.isAuthenticated()){
    res.render("secrets");
  }else{
    res.render('index', {auth:"Ya not logged in", });
  }
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
