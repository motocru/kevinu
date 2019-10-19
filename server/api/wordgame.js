/**npm and express requires */
const express = require('express');
const fs = require('fs');
var router = express.Router();

const Metadata = require('../db/wordgame/metadata.json');

/**database requires */
const games = require('../db/wordgame/games');

/**read from the wordlist then populate the object */
var wordlist = {};
fs.readFile(require('path').resolve(__dirname, '../db/wordgame/wordlist.txt'), function(err, data) {
  wordlist = data.toString().split('\n');
});

/**=====================ASSISTING FUNCTIONS=========================== */
/**selects a word from the dictionary file within the specific max and min lengths */
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

/**replaces a character at a specific location inside of a string */
String.prototype.setCharAt = function(index, chr) {
  if (index > this.length) return this.toString();
  return this.substring(0, index) + chr + this.substring(index+1);
}

/**======================API ENDPOINTS=============================== */
/**returns the meta file, or a specific part of the meta if specified with
 * a query string
 */
router.get('/meta', function(req, res, next) {
  var meta = (req.query.parameter === undefined) ? Metadata : Metadata[req.query.parameter];
  if (meta === undefined) {res.status(400).json({"msg": "invalid metadata parameter"});}
  else {res.status(200).json(meta);}
});

/**returns the list of all games associated with a userID */
router.get('/:user', function(req, res, next) {
  games.findByOwner(req.params.user, function(err, games) {
    if (err) {console.error(err); res.status(500).json([]);}
    else {
      for (var i = 0; i < games.length; i++) {
        if (games[i].status === "Unfinished") {delete games[i].word;}
      }
      res.status(200).json(games);
    }
  });
});

/**adds a new game to the total list of games associated with a single session ID */
router.post('/:user', function(req, res, next) {
  var skill = Metadata.levels.filter(level => level.name === req.query.level);
  var word = wordPick(skill[0].minLength, skill[0].maxLength);
  games.create(req.params.user, req.body.colors, req.body.font, skill[0], word, function(err, game) {
    if (err) {res.status(500).json({'msg': 'internal server error'})}
    else {
      delete game["word"];
      res.status(200).json(game);
    }
  });
});

/**Gets an individual game from the database and returns it if the user id
 * matches the session ID
 */
router.get('/:user/:gid', function(req, res, next) {
  console.log(req.session.user);
  if (req.session.user.user !== req.params.user) {
    res.status(401).json({"msg": "Unauthorized"});
  } else {
    games.find(req.params.gid, function(err, game) {
      if (err) {res.status(500).json({"msg": "Internal Server Error"});}
      else {res.status(200).json(game);}
    });
  }
});

/**handles a guess of a single letter toward the selected word and returns the 
 * updated word object after guess
 */
router.put('/:user/:gid/guess', function(req, res, next) {
  if (!req.session.user || req.session.user.user !== req.params.user) {
    res.status(401).json({"msg": "Unauthorized"});
  } else {
    if (req.query.letter === "") {res.status(400).json({"msg": "a letter is required to guess"}); return;}
    games.find(req.params.gid, function(err, game) {
      if (err) {res.status(500).json({"msg": "INTERNAL SERVER ERROR"}); return;}
      if (game.remaining <= 0) {res.status(400).json({"msg": "you cannot guess more than the limit"}); return;}
      var guess = req.query.letter.toLowerCase();
      game.guesses += guess;
      if (game.word.includes(guess)) {
        for (var i = 0; i < game.word.length; i++) {
          if (game.word[i] === guess) {game.view = game.view.setCharAt(i, guess);}
        }
      } else {
        game.remaining--;
      }
      if (!game.view.includes('_') || game.remaining === 0) {
        game.status = (!game.view.includes('_')) ? 'Victory' : 'Loss';
      }
      games.updateGame(req.params.gid, game, function(err2, result) {
        if (err2) {res.status(500).json({"msg": "INTERNAL SERVER ERROR"}); return;}
        if (result.status === "Unfinished") {delete result.word};
        res.status(200).json(result);
      });
    });
  }
});

module.exports = router;