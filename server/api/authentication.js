const express = require('express');
var router = express.Router();
var uuid = require('uuid');

router.post('/user', function(req, res, next) {
  if (req.session.user) res.status(200).json(req.session.user);
  else {
    req.session.regenerate(function(err) {
      if (err) {
        console.log(err)
        res.status(500).json({msg: "Server Side issue"});
      } else {
        req.session.user = {"user": uuid()};
        req.session.cookie.maxAge = 60000000;
        res.status(200).json(req.session.user);
      }
    })
  }
});

module.exports = router;