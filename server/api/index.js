/**This file serves as a kind of middle-man for routing 
 * to the different api endpoints of the website
 */
const express = require('express');
var router = express.Router();
const uuid = require('uuid');

router.all('*', (req, res, next) => {
    //console.log(req.session.user);
    if (!req.session.user) {
        req.session.regenerate(function(err) {
            if (err) console.error(err);
            req.session.user = {"user": uuid()};
            //req.session.save();
            next();
        });
        
    } else {
        //req.session.save();
        next();
    }
});

router.use('/wordgame', require('./wordgame'));
router.use('/authentication', require('./authentication'));


module.exports = router;