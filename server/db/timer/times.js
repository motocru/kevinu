const db = require('../db');
var mongo = require('mongodb');

/**searches the database for a time game that has the given userId first
 * if the ID is found it deletes it from the database and then adds a new one
 * if not found, then a new one is added withoput any need for deletion
 */
function create(game, cb) {
   find(game.userId, function(err1, foundGame) {
      if (foundGame.length === 0) {
         insertion(game, cb);
      } else {
         db.collection('times').deleteOne({userId: game.userId}, function(err2, obj) {
            if (err2) console.error(err2);
            insertion(game, cb);
         });
      }
   });
}
module.exports.create = create;

/**code for inserting a new time game into the database */
function insertion(gameObject, cb) {
   db.collection('times').insertOne(gameObject, function(err, newGame) {
      if (err) console.error(err);
      cb(err, newGame.ops[0]);
   })
}

/**searches for a time game using a userId */
function find(userId, cb) {
   db.collection('times').find({userId: userId}).toArray(function(err, game) {
      if (err) console.error(err);
      cb(err, game);
   });
}
module.exports.find = find;

/**updates the database value of the game and then returns the updated game */
function updateGame(game, cb) {
   var newValues = {
      currentItem: game.currentItem,
      startTime: game.startTime,
      endTime: game.endTime,
      results: game.results
   };
   db.collection('times').updateOne({userId: game.userId}, {$set: newValues}, function(err, res) {
      find(game.userId, cb);
   });
}
module.exports.updateGame = updateGame;