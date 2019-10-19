const express = require('express');
//const session = require('express-session');
var router = express.Router();

router.post('/user', function(req, res, next) {
  //console.log(req.session.user);
  res.status(200).send(req.session.user);
});

module.exports = router;