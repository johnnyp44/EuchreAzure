const express = require("express");
const gamesRoute = require("./routes/game");
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

app.use("/games", gamesRoute);

const Game = require("./models/Game");
const Player = require("./models/Player");
app.get('/', async function(req, res, next) {
  try{
    //LEADERBOARD SECTION
    const OGLB = await Player.aggregate([
      {$match: {"gamesPlayed.leagueID":1 }},
      {$group: {
        _id: "playerID",
        gameCount :{$sum:"gamesPlayed"}}
      }
    ]);
    //console.log("Count of gamesPlayed: " + OGLB.length);
    //for (var x=0; x<OGLB.length; x++){console.log(OGLB[x].gameCount);}
    //GAMES SECTION
    const OGgames = await Game.find({leagueID:1}).sort({gameDate:-1}).limit(6);
    //console.log("OGgames has this many: " + OGgames.length);
    const FamGames = await Game.find({leagueID:2}).sort({gameDate:-1}).limit(6);
    //console.log("FamGames has this many: " + FamGames.length);
    // for (var x=0; x<OGgames.length; x++){console.log(OGgames[x].gameID);}
    //PLAYERS SECTION
    const Players = await Player.find().sort({playerID:1});
    //console.log("Players has this many: " + Players.length);
    // for (var i=0; i<Players.length; i++){console.log(Players[i].firstName);}

  res.render("index", {auth: "false", OGgames:OGgames, FamGames:FamGames, Players:Players});
  }catch(err){
    console.log(err);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
