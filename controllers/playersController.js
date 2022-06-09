//MODEL ASSOCIATION
const Player = require("../models/Player")
var mongoose = require('mongoose');

function updatePlayerData(player){
  console.log("playerData to be added includes:", player);
  Player.find({playerID:player.playerID}).lean().exec(function(err, results) {
    if(err){
      console.log("player NOT added");
      console.log(err);
    }else{
      console.log("addGame found this player ", results);
      results.forEach(function(result){
        console.log("playerID is", result._id);
        Player.findOneAndUpdate({_id: result._id},{$push: {"gamesPlayed": player}}, (err,doc)=>{
          if(!err){
            console.log("updated player");
          }else{
            console.log("oops");
          }
        });
      });
    }
  });
  return;
}

exports.addGame = function(game){
  console.log("In players controller - addGame");
  const t1result = (game.team1Score == game.team2Score)? ("T") : (game.team1Score > game.team2Score) ? ("W") : ("L");
  const t2result = (game.team1Score == game.team2Score)? ("T") : (game.team1Score > game.team2Score) ? ("L") : ("W");
  const player1 = {gameID:game.gameID,playerID:game.T1P1,score:game.team1Score,winLoss : t1result,leagueID:game.leagueID};
  const player2 = {gameID:game.gameID,playerID:game.T1P2,score:game.team1Score,winLoss : t1result,leagueID:game.leagueID};
  const player3 = {gameID:game.gameID,playerID:game.T2P1,score:game.team2Score,winLoss : t2result,leagueID:game.leagueID};
  const player4 = {gameID:game.gameID,playerID:game.T2P2,score:game.team2Score,winLoss : t2result,leagueID:game.leagueID};
  updatePlayerData(player1);
  updatePlayerData(player2);
  updatePlayerData(player3);
  updatePlayerData(player4);
}

exports.updatePlayerGames = function(game){
  console.log("In games controller - updatePlayerGames");
  console.log(game);
}
