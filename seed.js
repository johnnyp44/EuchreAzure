//const Post = require("./models/Post");
const Game       = require("./models/Game");
const League     = require("./models/League");
const Player     = require("./models/Player");
//const Post       = require("./models/Post");
const gameData   = require("./data/games.json");
const leagueData = require("./data/leagues.json");
const playerData = require("./data/players_all.json");
//const postData   = require("./data/post.json");

require("./config")();

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

const seedPosts = async () => {
  try {
    await Post.insertMany(postData);
    console.log("post data seeded");
  } catch (err) {
    console.log(err.message);
  }
};


//seedPosts();
seedGames();
seedLeagues();
seedPlayers();

//process.exit();
