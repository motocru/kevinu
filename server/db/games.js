const Game = require('./gameModel');
const targets = require('./targets');
const db = require('./db');

/**creates a new game based off of the given input, writes the game to the 
 * DB and then creates and writes a new Target value with that
 * assocaited word value
 */
function create(userId, colors, font, level, word, cb) {
  db.collection('games').insertOne(new Game(userId, colors, font, level), function(err, game) {
    if (err) console.error(err);
    targets.create(game.ops[0]._id, word, function(err2, target) {
      if (err2) console.error(err);
      cb(err, game.ops[0]);
    })
  });
}
module.exports.create = create;

/**finds a single game by its game id value */
function find(gid, cb) {
  db.collection('games').findOne({'_id': gid}, function(err, game) {
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
function updateGame(gid, newGame, done, cb) {
  /**nothing here for now. I want to try and re-work this function
   * rather than have a whole new game getting created each time
   * a single letter is guessed
   */
}
module.exports.updateGame = updateGame;