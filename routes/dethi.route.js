var express = require('express');
var router = express.Router(); 
var controller = require("../controllers/dethi.controller");
	
router.get('/search',controller.search);
router.get('/gk/:name/:page', controller.giuaky);
router.get('/cc/:name/:page', controller.cuoiky);

module.exports = router;
