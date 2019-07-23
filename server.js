const express = require('express');
const session = require('express-session');
const next = require('next');
const bodyParser = require('body-parser');

const api = require('./server/api');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(session({
      secret: 'SEN.BLUTARSKY',
      resave: false,
      saveUninitialized: true,
      cookie: {secure: false}
    }))

    server.use('/api', api);

    server.get('*', (req, res) => {
      return handle(req, res);
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