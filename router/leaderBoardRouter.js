const express = require('express');
//const leaderBoardController = require('../controllers/leaderBoardController');

const leaderBoardRouter = express.Router();

//console.log("In Games Router");

leaderBoardRouter.use((req, res, next) => {
  if(
    ['POST', 'PUT', 'PATCH'].indexOf(req.method) !== -1 &&
    !req.is('json')
  ){
    return res.status(415).send('Content-Type must be application/json');
  }
  return next();
});

//IDEA ONE

const Player = require("../models/Player");

leaderBoardRouter.get('/', async function(req, res, next) {
  //const PlayersData = await Player.find().sort({playerID:1}).exec();
  const PlayersData = await Player.aggregate([
    {$match: {"gamesPlayed.leagueID":1}},
    {$unwind: "$gamesPlayed"},
    {$group: {"_id"        : "$_id",
              "firstName"  : {"$first": "$firstName" },
              "playerID"   : {"$first": "$playerID"},
              "gamesWon"   : {"$sum": {$cond:[{"$eq":["$gamesPlayed.winLoss","W"]},1,0]}},
              "gamesLost"  : {"$sum": {$cond:[{"$eq":["$gamesPlayed.winLoss","L"]},1,0]}},
              "totalScore" : {"$sum": "$gamesPlayed.score"}
    }},
    {$sort: {totalScore: -1}}
    ]).exec();
  console.log("PlayerData in leaderboard ", PlayersData);
  res.render('leaders_index', {auth:"false",PlayerData:PlayersData});
});

// //IDEA TWO
//gamesRouter.get('/',gamesController.getOGGames); //{
//  res.render('games_index', {auth:"false",OGGames:OGGames,FamGames:FamGames});
// });

module.exports = leaderBoardRouter;
