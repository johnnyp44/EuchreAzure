const express = require('express');
//const leaderBoardController = require('../controllers/leaderBoardController');

const leaderBoardRouter = express.Router();

leaderBoardRouter.use((req, res, next) => {
  if(
    ['POST', 'PUT', 'PATCH'].indexOf(req.method) !== -1 &&
    !req.is('json')
  ){
    return res.status(415).send('Content-Type must be application/json');
  }
  return next();
});
/////////////////////////////////////////////////////////////////////////////
//MODELS         ////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
const Player = require("../models/Player");

/////////////////////////////////////////////////////////////////////////////
//MODELS         ////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
leaderBoardRouter.get('/', async function(req, res, next) {
  try {
    console.log("Router is: /leaderBoardRouter");

    //LEAGUE 1
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

    //LEAGUE 2
    const FamPlayersData = await Player.aggregate([
      {$unwind: "$gamesPlayed"},
      {$match: {"gamesPlayed.leagueID":2}},
      {$group: {"_id"        : "$_id",
                "firstName"  : {"$first": "$firstName" },
                "playerID"   : {"$first": "$playerID"},
                "gamesWon"   : {"$sum": {$cond:[{"$eq":["$gamesPlayed.winLoss","W"]},1,0]}},
                "gamesLost"  : {"$sum": {$cond:[{"$eq":["$gamesPlayed.winLoss","L"]},1,0]}},
                //"totalGames" : {"$sum": ["gamesWon", "gamesLost"]}, //not working yet
                "totalScore" : {"$sum": "$gamesPlayed.score"}
      }}
      ]).exec();
    FamPlayersData.sort(function(a, b){return b.totalScore-a.totalScore});

    //LEAGUE 3
    const OG150PlayersData = await Player.aggregate([
      {$unwind: "$gamesPlayed"},
      {$match: {"gamesPlayed.leagueID":3}},
      {$group: {"_id"        : "$_id",
                "firstName"  : {"$first": "$firstName" },
                "playerID"   : {"$first": "$playerID"},
                "gamesWon"   : {"$sum": {$cond:[{"$eq":["$gamesPlayed.winLoss","W"]},1,0]}},
                "gamesLost"  : {"$sum": {$cond:[{"$eq":["$gamesPlayed.winLoss","L"]},1,0]}},
                "gamesTied"  : {"$sum": {$cond:[{"$eq":["$gamesPlayed.winLoss","T"]},1,0]}},
                //"totalGames" : {"$sum": ["gamesWon", "gamesLost"]}, //not working yet
                "totalScore" : {"$sum": "$gamesPlayed.score"}
      }}
      ]).exec();
    OG150PlayersData.sort(function(a, b){return b.totalScore-a.totalScore});

    //LEAGUE 4
    const FamilyRRPlayersData = await Player.aggregate([
      {$unwind: "$gamesPlayed"},
      {$match: {"gamesPlayed.leagueID":4}},
      {$group: {"_id"        : "$_id",
                "firstName"  : {"$first": "$firstName" },
                "playerID"   : {"$first": "$playerID"},
                "gamesWon"   : {"$sum": {$cond:[{"$eq":["$gamesPlayed.winLoss","W"]},1,0]}},
                "gamesLost"  : {"$sum": {$cond:[{"$eq":["$gamesPlayed.winLoss","L"]},1,0]}},
                "gamesTied"  : {"$sum": {$cond:[{"$eq":["$gamesPlayed.winLoss","T"]},1,0]}},
                //"totalGames" : {"$sum": ["gamesWon", "gamesLost"]}, //not working yet
                "totalScore" : {"$sum": "$gamesPlayed.score"}
      }}
      ]).exec();
    FamilyRRPlayersData.sort(function(a, b){return b.totalScore-a.totalScore});

    //console.log("PlayerData in leaderboard ", OGPlayersData);
    res.render('leaders/index', {
      isAuthenticated: req.session.isAuthenticated,
      username: req.session.account?.username,
      fullName: req.session.account?.name,
      OGPlayerData:OGPlayersData,
      FamPlayerData:FamPlayersData,
      OG150PlayerData:OG150PlayersData,
      FamilyRRPlayerData: FamilyRRPlayersData
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

module.exports = leaderBoardRouter;
