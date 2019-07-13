/**This file serves as a kind of middle-man for routing 
 * to the different api endpoints of the website
 */
const express = require('express');
var router = express.Router();

router.use('/authentication', require('./authentication'));
router.use('/wordgame', require('./wordgame'));

module.exports = router;