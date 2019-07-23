var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var db;

mongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, function(err , database) {
  assert.equal(null, err);
  console.log('database connection made');

  db = database.db('kevinu');
  /**below is code to drop the tables from the database so I can just uncomment this
   * any time I need to on start up rather than go into the DB
   */
  /*
  db.collection('games').drop(function(err, delOk) {
    if (err) console.error(err);
    if (delOk) console.log('games table successfully dropped');
    db.collection('targets').drop(function(err2, delOk2) {
      if (err2) console.error(err2);
      if (delOk2) console.log('Targets table successfully dropped');
    });
  });
  */
});
module.exports = {collection : (name) => db.collection(name)};