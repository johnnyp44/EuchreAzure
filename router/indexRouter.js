const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  try{
    res.render('index', {
      isAuthenticated: req.session.isAuthenticated,
      username: req.session.account?.username,
      fullName: req.session.account?.name
    });
  }catch(e){
    console.log(e);
    res.render('error/index',{
      isAuthenticated: req.session.isAuthenticated,
      username: req.session.account?.username,
      fullName: req.session.account?.name,
      error: e,
      CustomErrorMessage: ""
    });
  }
});

module.exports = router;
