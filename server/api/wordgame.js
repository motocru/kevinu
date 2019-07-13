/**npm and express requires */
const express = require('express');
var router = express.Router();

/**database requires */
const games = require('../db/games');
const targets = require('../db/targets');

router.get('/test', function(req, res, next) {
  res.status(200).json({'msg': 'we got here boss'});
});

router.get('/:user', function(req, res, next) {
  games.findByOwner(req.params.user, function(err, games) {
    if (err) {res.status(500).json([]);}
    else {res.status(200).json(games);}
  });
});

module.exports = router;