var express = require('express');
var router = express.Router(); 

var controller = require("../controllers/author.controller.js");
router.get('/support', controller.author);
router.get('/support/:sp', controller.support);
module.exports = router;