
	var express = require('express');
	var router = express.Router(); 

	var controller = require("../controllers/auth.controller");
	router.get('/register',controller.register);	
	router.post('/register', controller.postRegister);
	router.get('/login',controller.login);	
	router.post('/login',controller.postLogin);	
	router.get('/logout',controller.logout);
	module.exports = router;
