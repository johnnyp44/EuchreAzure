const Game       = require("./models/Game");
const League     = require("./models/League");
const Player     = require("./models/Player");
const gameData   = require("./data/games.json");
const leagueData = require("./data/leagues.json");
const playerData = require("./data/players_all.json");

require('dotenv').config();
require("./dbConfig")();

const seedPlayers = async () => {
  try {
    await Player.insertMany(playerData);
    console.log("player data seeded");
  } catch (err) {
    console.log(err.message);
  }
};

const seedGames = async () => {
  try {
    await Game.insertMany(gameData);
    console.log("game data seeded");
  } catch (err) {
    console.log(err.message);
  }
};

const seedLeagues = async () => {
  try {
    await League.insertMany(leagueData);
    console.log("league data seeded");
  } catch (err) {
    console.log(err.message);
  }
};


seedLeagues();
seedGames();
seedPlayers();

//process.exit();
