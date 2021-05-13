const Game = require("../models/Game");

exports.getAllGames = async (req, res) => {
  const games = await Game.find()
  res.status(200).json(games)
};


// app.get('/', async function(req, res, next) {
//   console.log("in / function");
//   try{
//     //LEADERBOARD SECTION
//     const OGLB = await Player.aggregate([
//       {$match: {"gamesPlayed.leagueID":1 }},
//       {$group: {
//         _id: "playerID",
//         gameCount :{$sum:"gamesPlayed"}}
//       }
//     ]);
//     //console.log("Count of gamesPlayed: " + OGLB.length);
//     //for (var x=0; x<OGLB.length; x++){console.log(OGLB[x].gameCount);}
//     //GAMES SECTION
//     const OGgames = await Game.find({leagueID:1}).sort({gameDate:-1}).limit(6);
//     //console.log("OGgames has this many: " + OGgames.length);
//     const FamGames = await Game.find({leagueID:2}).sort({gameDate:-1}).limit(6);
//     //console.log("FamGames has this many: " + FamGames.length);
//     // for (var x=0; x<OGgames.length; x++){console.log(OGgames[x].gameID);}
//     //PLAYERS SECTION
//     const Players = await Player.find().sort({playerID:1});
//     //console.log("Players has this many: " + Players.length);
//     // for (var i=0; i<Players.length; i++){console.log(Players[i].firstName);}
//
//   res.render("index", {auth: "false", OGgames:OGgames, FamGames:FamGames, Players:Players});
//   }catch(err){
//     console.log(err);
//   }
// });
