const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index_', {
    title: 'EuchreStats',
    isAuthenticated: req.session.isAuthenticated,
    username: req.session.account?.username,
    fullName: req.session.account?.name
  });
  console.log("Index Router = user is " + req.session.account?.username);
});

module.exports = router;
