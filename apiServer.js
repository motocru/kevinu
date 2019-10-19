const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./auth.json');

const api = require('./server/api');
//console.log(process.env.NODE_ENV);
const dev = process.env.NODE_ENV !== 'production';
const host = (dev) ? 'http://localhost:3000' : 'kevin-u.com';

const server = express();

//server.use(cookieParser());
server.use(cors({credentials: true, origin: host}));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(session({
    secret: (dev) ? auth.DEV : auth.PROD,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 3600000 * 24 * 365,
    },
}));

server.use('/api', api); //api router middleware

server.listen(3001, err => {
    if (err) throw err;
    console.log(`>Ready on PORT:3001`);
});

process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error:\n', err);
    process.exit(1);
});