//MODEL ASSOCIATION
// const Game = require("../models/Game");
// const GamesPlayed = require("../models/GamesPlayed");
// const Player = require("../models/Player")
// var mongoose = require('mongoose');


exports.addGame = function (game){
  console.log("In games controller - addGame");
  console.log(game);
  game.save(function (err, game) {
    if (err) return console.error(err);
      console.log(game.gameID + " saved to games collection.");
  });
}
