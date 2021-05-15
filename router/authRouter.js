const express = require('express')
//const { getAllPosts } = require('../controllers/ct_post')

const authRouter = express.Router()

authRouter.get('/', function(req, res){
  res.render('index', {auth:"NotYet"});
});

module.exports = authRouter;
