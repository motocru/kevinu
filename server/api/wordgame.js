/**npm and express requires */
const express = require('express');
const fs = require('fs');
var router = express.Router();

const Metadata = require('../db/wordgame/metadata.json');

/**database requires */
const games = require('../db/wordgame/games');
const targets = require('../db/wordgame/targets');

/**read from the wordlist then populate the object */
var wordlist = {};
fs.readFile(require('path').resolve(__dirname, '../db/wordgame/wordlist.txt'), function(err, data) {
  wordlist = data.toString().split('\n');
});

/**=====================ASSISTING FUNCTIONS=========================== */

function Colors(guess, txt, word) {
  this.guess = guess;
  this.txt = txt;
  this.word = word;
}

function Font(category, family, rule, url) {
  this.category = category;
  this.family = family;
  this.rule = rule;
  this.url = url;
}

function Level(rounds, maxLength, minLength, name) {
  this.rounds = rounds;
  this.maxLength = maxLength;
  this.minLength = minLength;
  this.name = name;
}

function wordPick(minLength, maxLength) {
  function getInt() {
    return Math.floor(Math.random() * Math.floor(wordlist.length));
  }
  var pick = wordlist[getInt()];
  while (pick.length < minLength || pick.length > maxLength) {
    pick = wordlist[getInt()];
  }
  return pick;
}

/**======================API ENDPOINTS=============================== */
router.get('/test', function(req, res, next) {
  res.status(200).json({'msg': 'we got here boss'});
});

router.get('/meta', function(req, res, next) {
  var meta = (req.query.parameter === undefined) ? Metadata : Metadata[req.query.parameter];
  if (meta === undefined) {res.status(400).json({"msg": "invalid metadata parameter"});}
  else {res.status(200).json(meta);}
});

router.get('/:user', function(req, res, next) {
  games.findByOwner(req.params.user, function(err, games) {
    if (err) {res.status(500).json([]);}
    else {res.status(200).json(games);}
  });
});

router.post('/:user', function(req, res, next) {
  
});

module.exports = router;