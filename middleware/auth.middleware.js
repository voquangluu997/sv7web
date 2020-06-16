var User = require('../models/user.model');
var jwt =require('jsonwebtoken');
var express = require('express');
module.exports.authMiddleware = async function(req,res,next){
	try{
		const token = req.signedCookies.auth;
		if (!token) res.render('auth/login',{
			saygb: 'KHU VỰC DÀNH RIÊNG CHO BKER, BẠN PHẢI ĐĂNG NHẬP ĐỂ TRUY CẬP!'
		});
		else{
				jwt.verify(token, process.env.SECRET_KEY,function(err,payload){
				if(payload){
					req.user = payload;
					// req.locals.userInfo=user;
					
					next();
				}else{
					res.render('auth/login',{
						saygb: 'KHU VỰC DÀNH CHO BKer, BẠN PHẢI ĐĂNG NHẬP ĐỂ TRUY CẬP!'
					});
				}			
					});
		}

	} catch(err){
		throw err;
	};
}; 

module.exports.authAdmin = async function(req,res,next){
	const token = req.signedCookies.auth;
	if(!token) res.redirect('/auth/login');
	else{
		jwt.verify(token, process.env.SECRET_KEY, async function(err,payload){
		if(payload){
			var doc = await User.findOne({where : {_id : payload._id}});
			if(doc.admin && doc.admin==process.env.ADMIN_KEY)
				next();	
		 	else res.redirect('/');
		}else  res.redirect('/');
	});
	}
};

