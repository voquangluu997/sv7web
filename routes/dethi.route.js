var express = require('express');
var router = express.Router(); 
var controller = require("../controllers/dethi.controller");
	
router.get('/search',controller.search);
router.get('/:type/:name/:page', controller.typeDethi);
module.exports = router;
