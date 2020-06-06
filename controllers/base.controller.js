var Subject = require('../models/subject.model');
var middleware = require('../middleware/auth.middleware');
var User = require('../models/user.model');

module.exports.home = async function(req,res){
	var top1 = await User.find().sort({donggop: -1}).limit(1);
	var top25 = await User.find().sort({donggop: -1}).skip(1).limit(4);
	var top610 = await User.find().sort({donggop: -1}).skip(5).limit(5);
	
	middleware.checkLoggedMiddleware().then(function(status){
		res.render('base/index',{
			userInfo: status,
			top1 : top1,
			top25 : top25,
			top610 : top610,
		});

	});
};

module.exports.daicuong =  function(req,res){
	Subject.find({field: 'daicuong'}).then(function(doc){
		middleware.checkLoggedMiddleware().then(function(status){
			res.render('base/listSub',{
 			field:doc,
 			header: 'đề thi đại cương',
 			userInfo: status
 			});
		});
		
	});

};

module.exports.search = function(req,res){
	var  q= req.query.q;
	var message ='';
	 	Subject.find({field : 'daicuong'}).then(function(item){
	 		var matched = item.filter(function(i){
			return i.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;	
			});
			if(matched.length==0){
				message = 'Opps! Không tìm thấy rồi.. bạn thử nhập lại nhé!';
				matched = item;
			}
	 		middleware.checkLoggedMiddleware().then(function(status){
	 			res.render('base/listSub',{
				field:matched,
				message:message,
				header: 'đề thi đại cương',
				userInfo: status
				});
	 		});
	 	});
};

module.exports.chuyennganh =  function(req,res){
	Subject.find({field : 'chuyennganh'}).then(function(doc){
		middleware.checkLoggedMiddleware().then(function(status){

			res.render('base/listSub',{
 			field:doc,
 			header: 'đề thi chuyên ngành',
 			userInfo : status
 			});
		});

		});
		

};

module.exports.chuyennganhSearch = function(req,res){
	var  q= req.query.q;
	var message ='';
	Subject.find({field:'chuyennganh'}).then(function(item){
	 	var matched = item.filter(function(i){
		return i.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;	
		});
		if(matched.length==0){
			message = 'Opps! Không tìm thấy rồi.. bạn thử nhập lại nhé!';
			matched = item;
		}
		middleware.checkLoggedMiddleware().then(function(status){
			res.render('base/listSub',{
			field:matched,
			message:message,
			header: 'đề thi chuyên ngành',
			userInfo: status
			});
		});
	 });
};


