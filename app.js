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
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
const gamesRoute = require("./routes/game");
const indexRoute = require("./routes/index");

app.use("/", indexRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
