var User = require('../models/user.model');
var jwt =require('jsonwebtoken');
var express = require('express');
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
module.exports.authMiddleware = async function(req,res,next){
	try{
		// const token =  req.header('auth-token');
		const token =  localStorage.getItem('auth-token');
		if (!token) res.redirect('/login');

		jwt.verify(token, process.env.SECRET_KEY,function(err,payload){
			if(payload){
				// console.log(payload + 'payload');
				req.user = payload;
				next();
			}else{
				res.redirect('/login');
			}			
		 })
	} catch{ res.redirect('/login')}
		
}; 

module.exports.authAdmin = async function(req,res,next){
	const token = localStorage.getItem('auth-token');
	if(!token) res.redirect('/');
	jwt.verify(token, process.env.SECRET_KEY, async function(err,payload){
		if(payload){
			var doc = await User.findOne({_id : payload._id});
			console.log(doc);
			console.log(doc.name);
			console.log(doc.admin);
			if(doc.admin && doc.admin==process.env.ADMIN_KEY)
				next();	
		 	else res.redirect('/');
		}else res.redirect('/');
	});

};

module.exports.checkLoggedMiddleware = async  function(req,res){

  const token = localStorage.getItem('auth-token');
  if(!token) return null;
  var check = jwt.verify(token,process.env.SECRET_KEY)._id;
  var content = await User.findOne({_id: check});
  return content;

};

