//MODEL ASSOCIATION
const Game = require("../models/Game");
var mongoose = require('mongoose');

//console.log("In Games Controller");

// exports.getOGGames =  function() {
//   return Game.find({leagueID:1}).sort({gameDate:-1}).limit(6).exec();
// };

// exports.getFamGames =  async () => {
//   try{
//     await Game.find(({leagueID:2}).sort({gameDate:-1}).limit(6),function(err,res){
//       if(!err){
//         console.log('Response from controller', res);
//         return res;
//       }
//     });
//   }catch(e){
//     next(e);
//   }
// };
