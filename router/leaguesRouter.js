const express = require('express');
const {Calendar} = require('node-calendar-js');
const bodyParser = require('body-parser');
//const playersController = require('../controllers/playersController');

const leaguesRouter = express.Router();

const League = require("../models/League");

leaguesRouter.get('/listJSON', async function(req, res, next) {
  try{
    console.log("Router is: /leagues/list");
    const Leagues = await League.find().exec();
    res.render('leagues/index_listJSON', {
      isAuthenticated: req.session.isAuthenticated,
      username: req.session.account?.username,
      fullName: req.session.account?.name,
      Leagues: Leagues
    });
  }catch(e){
    console.log(e);
    res.render('error/index',{
      isAuthenticated: req.session.isAuthenticated,
      username: req.session.account?.username,
      fullName: req.session.account?.name
    });
  }
});

module.exports = leaguesRouter;
