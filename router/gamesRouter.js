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
  try{
    const AllGames = await Game.find().exec();
    const Players = await Player.find().exec();
    const OGGames = AllGames.filter(game => game.leagueID === 1);
    OGGames.sort(function(a,b){return b.gameID-a.gameID});
    const FamGames = AllGames.filter(game => game.leagueID === 2);
    FamGames.sort(function(a,b){return b.gameID-a.gameID});
    res.render('games_index', {auth:"false",OGGames:OGGames,FamGames:FamGames, Players:Players});
  }catch(e){
    console.log(e);
    res.render('error_index',{auth:"false"} );
  }

});

// //IDEA TWO
//gamesRouter.get('/',gamesController.getOGGames); //{
//  res.render('games_index', {auth:"false",OGGames:OGGames,FamGames:FamGames});
// });

module.exports = gamesRouter;
