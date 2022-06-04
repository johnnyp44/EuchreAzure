const express = require('express');
const {Calendar} = require('node-calendar-js');
const bodyParser = require('body-parser');
const gamesController = require('../controllers/gamesController');
const playersController = require('../controllers/playersController');

const gamesRouter = express.Router();

gamesRouter.use((req, res, next) => {
  if(
    [ 'PUT', 'PATCH'].indexOf(req.method) !== -1 &&
    !req.is('json')
  ){
    return res.status(415).send('Content-Type must be application/json');
  }
  return next();
});
/////////////////////////////////////////////////////////////////////////////
//MODELS         ////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
const Game   = require("../models/Game");
const Player = require("../models/Player");
const League = require("../models/League");

/////////////////////////////////////////////////////////////////////////////
//ROUTES         ////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
gamesRouter.get('/list', async function(req, res, next) {
  try{
    console.log("Router is: /games/list");
    const AllGames = await Game.find().exec();
    const Players = await Player.find().exec();
    const OGGames = AllGames.filter(game => game.leagueID === 1);
    OGGames.sort(function(a,b){return b.gameID-a.gameID});
    const FamGames = AllGames.filter(game => game.leagueID === 2);
    FamGames.sort(function(a,b){return b.gameID-a.gameID});
    const OG150Games = AllGames.filter(game => game.leagueID === 3);
    OG150Games.sort(function(a,b){return b.gameID-a.gameID});
    res.render('games/index_list', {
      isAuthenticated: req.session.isAuthenticated,
      username: req.session.account?.username,
      fullName: req.session.account?.name,
      OGGames:OGGames,
      FamGames:FamGames,
      OG150Games:OG150Games,
      Players:Players
    });
  }catch(e){
    console.log(e);
    res.render('error/index',{
      isAuthenticated: req.session.isAuthenticated,
      username: req.session.account?.username,
      fullName: req.session.account?.name
    });
  }
});

gamesRouter.get('/listJSON', async function(req, res, next) {
  try{
    console.log("Router is: /games/listJSON");
    const AllGames = await Game.find().exec();
    AllGames.sort(function(a,b){return b.gameID-a.gameID});
    res.render('games/index_gamesJSON', {
      isAuthenticated: req.session.isAuthenticated,
      username: req.session.account?.username,
      fullName: req.session.account?.name,
      AllGames: AllGames
    });
  }catch(e){
    console.log(e);
    res.render('error/index',{
      isAuthenticated: req.session.isAuthenticated,
      username: req.session.account?.username,
      fullName: req.session.account?.name,
    });
  }
});

gamesRouter.get('/new', async function(req, res, next) {
  try{
    console.log("Router is: /games/new");
    const Players = await Player.find().exec();
    const Leagues = await League.find().exec();
    const calendar = new Calendar({year:2022, month:6}).toHTML();
    res.render('games/index_new',{
      isAuthenticated: req.session.isAuthenticated,
      username: req.session.account?.username,
      fullName: req.session.account?.name,
      Players:Players, 
      Leagues:Leagues, 
      Calendar:calendar
    });
  }catch(e){
    console.log(e);
    res.render('error/index',{
      isAuthenticated: req.session.isAuthenticated,
      username: req.session.account?.username,
      fullName: req.session.account?.name
    });
  }
});

gamesRouter.get('/update', async function(req, res, next) {
  try{
    console.log("Router is: /games/update");
    const Players = await Player.find().exec();
    //console.log(Players);
    const Leagues = await League.find().exec();
    const calendar = new Calendar({year:2021, month:6}).toHTML();
    res.render('games_new',{
      isAuthenticated: req.session.isAuthenticated,
      username: req.session.account?.username,
      fullName: req.session.account?.name,
      Players:Players, 
      Leagues:Leagues, 
      Calendar:calendar
    });
  }catch(e){
    console.log(e);
    res.render('error/index',{
      isAuthenticated: req.session.isAuthenticated,
      username: req.session.account?.username,
      fullName: req.session.account?.name
    });
  }
});

gamesRouter.post('/gameConfirm', async function(req, res, next){
  try{
    const AllGames = await Game.find().exec();
    var maxID = (AllGames.sort((a, b) => b.gameID - a.gameID)[0].gameID) + 1;
    console.log("Max Game ID is: " + maxID);

    var newGame = new Game({
      gameID: maxID,
      gameDate: req.body.gameDate,
      leagueID: req.body.league,
      T1P1: req.body.T1P1,
      T1P2: req.body.T1P2,
      T2P1: req.body.T2P1,
      T2P2: req.body.T2P2,
      team1Score: req.body.t1Score,
      team2Score: req.body.t2Score
    });
    gamesController.addGame(newGame);  //it works - just uncomment the line
    playersController.addGame(newGame);
    res.redirect("/games/list");
  }catch(e){
    console.log(e);
    res.render('error/index',{
      isAuthenticated: req.session.isAuthenticated,
      username: req.session.account?.username,
      fullName: req.session.account?.name
    });
  }
});


module.exports = gamesRouter;
