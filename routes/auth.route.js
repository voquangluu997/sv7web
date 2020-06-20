
	var express = require('express');
	var router = express.Router(); 
	var passport = require('passport');
	var controller = require("../controllers/auth.controller");
	router.get('/register',controller.register);	
	router.post('/register', controller.postRegister);
	router.get('/login',controller.login);	
	router.post('/login',controller.postLogin);	
	router.get('/logout',controller.logout);
	

	router.get('/facebook',passport.authenticate('facebook', {scope: ['email']}));
	router.get('/facebook/callback',passport.authenticate('facebook', {
            						successRedirect: '/profile',
            						failureRedirect: '/'
        							}));
	module.exports = router;