const mongoose = require("mongoose");

const gamesPlayedSchema = new mongoose.Schema({
  gameID  : {type: Number, require:true},
  playerID: {type: Number},
  leagueID: {type: Number},
  score   : {type: Number},
  winLoss : {type: String},
  createdAt: {type: Date, required:true, default: Date.now},
  updatedAt: {type: Date, required:true, default: Date.now}
});

const playerSchema = new mongoose.Schema({
  playerID: {type: Number, require:true, unique:true},
  firstName: {type: String},
  lastName: {type: String},
  email: {type: String, require:true, unique:true},
  enrollmentDate: {type: Date},
  gamesPlayed: [gamesPlayedSchema],
  leaguesOwned: {type: Array},
  createdAt: {type: Date, required:true, default: Date.now},
  updatedAt: {type: Date, required:true, default: Date.now}
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
