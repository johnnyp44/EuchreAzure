const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  gameID: {type: Number, unique:true, index:true},
  gameDate: {type: Date},
  leagueID: {type: Number},
  T1P1: {type: Number},
  T1P2: {type: Number},
  T2P1: {type: Number},
  T2P2: {type: Number},
  team1Score: {type: Number},
  team2Score: {type: Number},
  createdAt: {type: Date},
  updatedAt: {type: Date}
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
