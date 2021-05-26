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
  try {
    const OGPlayersData = await Player.aggregate([
      {$unwind: "$gamesPlayed"},
      {$match: {"gamesPlayed.leagueID":1}},
      {$group: {"_id"        : "$_id",
                "firstName"  : {"$first": "$firstName" },
                "playerID"   : {"$first": "$playerID"},
                "gamesWon"   : {"$sum": {$cond:[{"$eq":["$gamesPlayed.winLoss","W"]},1,0]}},
                "gamesLost"  : {"$sum": {$cond:[{"$eq":["$gamesPlayed.winLoss","L"]},1,0]}},
                //"totalGames" : {"$sum": ["gamesWon", "gamesLost"]}, //not working yet
                "totalScore" : {"$sum": "$gamesPlayed.score"}
      }}
      ]).exec();
    OGPlayersData.sort(function(a, b){return b.totalScore-a.totalScore});
    //console.log("PlayerData in leaderboard ", OGPlayersData);
    res.render('leaders_index', {auth:"false",PlayerData:OGPlayersData});
  }catch(e){
    console.log(e);
    res.render('error_index',{auth:"false"} );
  }
});

module.exports = leaderBoardRouter;
