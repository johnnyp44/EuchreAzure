const mongoose = require("mongoose");

const leagueSchema = new mongoose.Schema({
  leagueID   : {type: Number, require:true, unique:true},
  leagueName : {type: String},
  createdAt: {type: Date},
  updatedAt: {type: Date}
});

const League = mongoose.model("League", leagueSchema);

module.exports = League;
