const express = require('express');
const {Calendar} = require('node-calendar-js');
const bodyParser = require('body-parser');
const playersController = require('../controllers/playersController');

const playersRouter = express.Router();

const Player = require("../models/Player");

playersRouter.get('/list', async function(req, res, next) {
  try{
    console.log("Router is: /players/list");
    const Players = await Player.find().exec();
    res.render('index_players', {
      isAuthenticated: req.session.isAuthenticated,
      username: req.session.account?.username,
      fullName: req.session.account?.name,
      Players:Players
    });
  }catch(e){
    console.log(e);
    res.render('index_error');
  }
});

module.exports = playersRouter;
