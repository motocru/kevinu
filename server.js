const express = require('express');
const session = require('express-session');
const next = require('next');
const bodyParser = require('body-parser');

const api = require('./server/api');
var uuid = require('uuid');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', "GET,POST,PUT,DELETE,OPTIONS");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(allowCrossDomain);
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(session({
      secret: 'SEN.BLUTARSKY',
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false,
        maxAge: 3600000 * 24 * 14
      }
    }))

    server.use('/api', api);

    server.get('*', (req, res) => {
      if (!req.session.user) {
        req.session.regenerate(function(err) {
          if (err) {console.log(err)}
          else {
            req.session.user = {"user": uuid()};
          }
          return handle(req, res);
        });
      } else {
        return handle(req, res);
      }
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });