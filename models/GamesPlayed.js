const mongoose = require("mongoose");

const gamesPlayedSchema = new mongoose.Schema({
  gameID  : {type: Number, require:true, unique:true},
  playerID: {type: Number},
  leagueID: {type: Number},
  score   : {type: Number},
  winLoss : {type: String},
  createdAt: {type: Date},
  updatedAt: {type: Date}
});

const GamesPlayed = mongoose.model("GamesPlayed", gamesPlayedSchema);

module.exports = GamesPlayed;
