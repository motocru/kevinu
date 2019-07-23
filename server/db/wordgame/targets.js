const db = require('./db');
const Target = require('./targetModel');

function create(id, word, cb) {
  db.collection('targets').insertOne(new Target(id, word), function(err, target) {
    if (err) console.error(err);
    cb(err, target.ops[0]);
  });
}
module.exports.create = create;

function find(id, cb) {
  db.collection('targets').findOne({id: id}, function(err, target) {
    if (err) console.error(err);
    cb(err, target);
  });
}
module.exports.find = find;