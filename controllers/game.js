const Game = require("../models/Game");

exports.getAllGames = async (req, res) => {
  const games = await Game.find()
  res.status(200).json(games)
};
