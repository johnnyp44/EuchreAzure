const express = require('express');
//const gamesController = require('../controllers/gamesController');

const gamesRouter = express.Router();

//console.log("In Games Router");

gamesRouter.use((req, res, next) => {
  if(
    ['POST', 'PUT', 'PATCH'].indexOf(req.method) !== -1 &&
    !req.is('json')
  ){
    return res.status(415).send('Content-Type must be application/json');
  }
  return next();
});

//IDEA ONE


const Game = require("../models/Game");
const Player = require("../models/Player");

gamesRouter.get('/', async function(req, res, next) {
  const AllGames = await Game.find().exec();
  const OGGames = AllGames.filter(game => game.leagueID === 1);
  const FamGames = AllGames.filter(game => game.leagueID === 2);
  //console.log(FamGames);
  //const OGGames = await Game.find({leagueID:1}).sort({gameDate:-1}).limit(6).exec();
  //const Players = await Player.find().sort({playerID:1}).exec();
  const Players = await Player.find().exec();
  //const Players = AllPlayers
  //const FamGames = await Game.find({leagueID:2}).sort({gameDate:-1}).limit(6).exec();
  //console.log("In router OGGames is :", OGGames);
  res.render('games_index', {auth:"false",OGGames:OGGames,FamGames:FamGames, Players:Players});
});

// //IDEA TWO
//gamesRouter.get('/',gamesController.getOGGames); //{
//  res.render('games_index', {auth:"false",OGGames:OGGames,FamGames:FamGames});
// });

module.exports = gamesRouter;
