var Daicuong = require('../models/daicuong.model');
var db = require('../db');

module.exports.index = function(req,res){

	Daicuong.find().then(function(daicuong){
		res.render('daicuong',{
			daicuong:daicuong
		});
	});
};


module.exports.search = function(req,res){
	var  q= req.query.q;


	Daicuong.find().then(function(subs){
		var matched = subs.filter(function(dc){
		return dc.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;	
		});
		res.render('daicuong',{
		daicuong:matched
		});
	});

};





