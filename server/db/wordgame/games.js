const db = require('./db');
var mongo = require('mongodb');

/**this file serves as a model for the grammarguru games */
function Game(userId, colors, font, level, word) {
  this.userId = userId;
  this.colors = colors;
  this.font = font;
  this.level = level.name;
  this.word = word;
  this.view = Array(word.length+1).join('_');
  this.remaining = level.rounds;
  this.status = 'Unfinished',
  this.guesses = "";
}

/**creates a new game based off of the given input, writes the game to the 
 * DB and then creates and writes a new Target value with that
 * assocaited word value
 */
function create(userId, colors, font, level, word, cb) {
  db.collection('games').insertOne(new Game(userId, colors, font, level, word), function(err, game) {
    if (err) console.error(err);
    cb(err, game.ops[0]);   
  });
}
module.exports.create = create;

/**finds a single game by its game id value */
function find(gid, cb) {
  db.collection('games').findOne({'_id': new mongo.ObjectID(gid)}, function(err, game) {
    if (err) console.error(err);
    cb(err, game);
  });
}
module.exports.find = find;

/**gets the total selection of games created by a single user
 * as an array
 */
function findByOwner(userId, cb) {
  db.collection('games').find({userId: userId}).toArray(function(err, games) {
    if (err) console.error(err);
    cb(err, games);
  });
}
module.exports.findByOwner = findByOwner;

/**updates the values of the current game whenever a single guess is made */
function updateGame(gid, newGame, cb) {
  var myQuery = {userId: newGame.userId, '_id': new mongo.ObjectID(gid)};
  var newValues = {
    remaining: newGame.remaining,
    view: newGame.view,
    status: newGame.status,
    guesses: newGame.guesses
  }
  db.collection('games').updateOne(myQuery, {$set: newValues}, function(err, res) {
    find(gid, cb);
  });
}
module.exports.updateGame = updateGame;