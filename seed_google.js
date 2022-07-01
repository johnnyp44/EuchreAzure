// const Game       = require("./models/Game");
// const Player     = require("./models/Player");
// const gameData   = require("./data/games.json");
// const playerData = require("./data/players_all.json");
//import { League }  from './models/League.js';
//import leagueData from './data/leagues.json' assert { type: 'json' };

import { db } from './dbGoogleConfig.js';
import { collection, addDoc, doc, setDoc} from 'firebase/firestore';

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

const seedLeagues = async function(req, res) {
  try {
    await setDoc(doc(db,'leagues','2'),{
      name: "This is the name",
      other: "this is the other",
    });
    console.log('it has been written', newDoc.id);
  } catch (e) {
    console.log("Faile: ", e);
  }
};


seedLeagues();
//seedGames();
//seedPlayers();

process.exit();
