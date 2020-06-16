var express = require('express');
var router = express.Router(); 
var controller = require("../controllers/dethi.controller");
var auth = require('../middleware/auth.middleware.js');
	
router.get('/search',auth.authMiddleware,controller.search);
router.get('/:type/:name/:page',auth.authMiddleware, controller.typeDethi);
module.exports = router;
