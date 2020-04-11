const express = require('express');
var router = express.Router();
const times = require('../db/timer/times');

function Game(userId, rounds, items) {
   this.userId = userId;
   this.rounds = rounds;
   this.items = items;
   this.results = [];
}

/**Selects a new item to use based on the available ones for the game, then determines
 * what the new end time will be based on the item
 */
function newRound(game) {
   game.currentItem = game.items[Math.floor(Math.random() * Math.floor(game.items.length))];
   game.startTime = Math.floor(Math.random() * Math.floor(60));
   game.endTime = (game.currentItem === "mega") ? game.startTime+35 : game.startTime+25;
   if (game.endTime >= 60) game.endTime = game.endTime%60;
   return game;
}

//=============================ENDPOINT FUNCTIONS==============================

/**gets the game that currently associated with that specific user ID */
router.get('/:user', function(req, res, next) {
   if (req.session.user.user !== req.params.user) {
      res.status(401).json({'msg': 'Unauthorized'});
   } else {
      times.find(req.params.user, function(err, game) {
         res.status(200).json(game);
      });
   } 
});

/**creates a new game and adds it to the database of games, then returns
 * to the front end
 */
router.post('/:user', function(req, res, next) {
   if (req.session.user.user !== req.params.user) {
      res.status(401).json({'msg': 'Unauthorized'});
   } else if (req.query.rounds < 1 || req.query.rounds > 10) {
      res.status(400).json({'msg': 'Number of rounds must be between 1-10'});
   } else if ((req.body.red != true && req.body.red != false) || (req.body.mega != true && req.body.mega != false)) {
      res.status(400).json({'msg': 'the values for red & mega must either be true or false'});
   } else {
      var tempArray = [];
      if (req.body.red) tempArray.push("red");
      if (req.body.mega) tempArray.push("mega");
      var game = new Game(req.params.user, req.query.rounds, tempArray);
      game = newRound(game);
      times.create(game, function(err, storedGame) {
         delete storedGame.endTime;
         res.status(200).json(storedGame);
      });
   }
});

/**Checks if the guess given for the next spawn time was correct or not,
 * adds the round info to the results array and then increments the next round
 * unless that was  the last round
 */
router.put('/:user/guess', function(req, res, next) {
   if (req.session.user.user !== req.params.user) {
      res.status(401).json({'msg': 'Unauthorized'});
   } else if (req.query.time === parseInt(req.query.time, 10)) {
      res.status(400).json({'msg': 'The time variable must be a valid integer'});
   } else {
      if (req.query.time.length > 1) {
         if (req.query.time.substr(0,1) == '0') req.query.time = req.query.time.substr(1);
      }
      times.find(req.params.user, function(err, game) {
         game = game[0]
         var roundObj = {};
         roundObj.startTime = game.startTime;
         roundObj.guessTime = req.query.time;
         roundObj.endTime = game.endTime;
         roundObj.item = game.currentItem;
         game.results.push(roundObj);
         if (game.results.length < game.rounds) {
            game = newRound(game);
         }
         times.updateGame(game, function(err, updatedGame) {
            res.status(200).json(updatedGame);
         });
      });
   }
});

module.exports = router;