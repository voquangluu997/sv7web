var Subject = require('../models/subject.model');
var Course = require('../models/course.model');
var User = require('../models/user.model');
var db = require('../database/db.js');
var middleware = require('../middleware/auth.middleware');


module.exports.home =async function(req,res){
	 var matched = await User.findAll({order :  db.sequelize.literal('donggop DESC')});
	 	var i = 0;
	 	var top1=[];
	 	var top25=[];
	 	var top610=[];
	 	matched.forEach(function(e){
	 		if( i < 1 ) top1.push(e.dataValues);
	 		if( i > 0 && i < 5 ) top25.push(e.dataValues);
	 		if( i > 5 && i <= 10 ) top610.push(e.dataValues);
	 		i++;
	 	});
	middleware.checkLoggedMiddleware().then(async function(status){
		if(!status){
			res.render('base/index',{
			top1 : top1,
			top25 : top25,
			top610 : top610,
			});
		}
		else{
			var i;
        	for(i=0;i<matched.length;i++){
	           if(status._id == (matched[i]._id)){
	             status.rank = i+1;
	             var userUpdate = await status.save();
	             break;

	           }
         	}
			res.render('base/index',{
			userInfo: userUpdate,
			top1 : top1,
			top25 : top25,
			top610 : top610,
			});
		}
		
	});
};                            
 
module.exports.field =  function(req,res){
	var header = '';
	if(req.params.field == 'daicuong')
	 header = 'đề thi đại cương';
	if(req.params.field == 'chuyennganh')
	 header = 'đề thi chuyên ngành';
	if(req.params.field == 'toeic')
	 header = 'đề thi toeic';
	if(req.params.field == 'avnl')
	 header = 'đề thi anh văn năng lực';

	Subject.findAll( {where :{field: req.params.field }}).then(function(doc){
		middleware.checkLoggedMiddleware().then(function(status){
			res.render('base/listSub',{
			field: req.params.field,
 			list:doc,
 			header: header,
 			userInfo: status
 			});
		});
		
	});
};

module.exports.course =  function(req,res){
	header = req.params.skill =='hocdan'? "Trọn bộ video hướng dẫn chơi Guitar" :" Khóa học lập trình full không che ";
	Course.findAll({where : { field : req.params.skill } }).then(function(doc){

		middleware.checkLoggedMiddleware().then(function(status){
			res.render('base/listCourse',{
 			list:doc,
 			header: header,
 			userInfo: status,
 			field: req.params.skill
 			});
		});
		
	});
};

module.exports.courseSearch = function(req,res){
	var  q= req.query.q;
	var message ='';
	var header = '';
	if(req.params.field == 'daicuong')
	 header = 'đề thi đại cương';
	if(req.params.field == 'chuyennganh')
	 header = 'đề thi chuyên ngành';
	if(req.params.field == 'toeic')
	 header = 'đề thi toeic';
	if(req.params.field == 'avnl')
	 header = 'đề thi anh văn năng lực';
	 	Course.findAll({ where: {field : req.params.skill } }).then(function(item){
	 		var matched = item.filter(function(i){
			return i.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;	
			});
			if(matched.length==0){
				message = 'Opps! Không tìm thấy rồi.. bạn thử nhập lại nhé!';
				matched = item;
			}
	 		middleware.checkLoggedMiddleware().then(function(status){
	 			res.render('base/listCourse',{
				list : matched,
				message : message,
				header : header,
				userInfo : status,
				field: req.params.skill
				});
	 		});
	 	});
};


module.exports.fieldSearch = function(req,res){
	var  q= req.query.q;
	var message ='';
	var header = '';
	if(req.params.field == 'daicuong')
	 header = 'đề thi đại cương';
	if(req.params.field == 'chuyennganh')
	 header = 'đề thi chuyên ngành';
	if(req.params.field == 'toeic')
	 header = 'đề thi toeic';
	if(req.params.field == 'avnl')
	 header = 'đề thi anh văn năng lực';
	 	Subject.findAll({where : {field : req.params.field }}).then(function(item){
	 		var matched = item.filter(function(i){
			return i.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;	
			});
			if(matched.length==0){
				message = 'Opps! Không tìm thấy rồi.. bạn thử nhập lại nhé!';
				matched = item;
			}
	 		middleware.checkLoggedMiddleware().then(function(status){
	 			res.render('base/listSub',{
				field : req.params.field,
				list : matched,
				message : message,
				header : header,
				userInfo : status
				});
	 		});
	 	});
};

module.exports.postDonggop =async function(req,res){
	if(req.files && req.files.length>0){
		middleware.checkLoggedMiddleware().then( async function(doc){
			if(!doc){ res.redirect('/');}
			else{
				doc.noti= doc.noti +  'Bạn vừa được + ' +  req.files.length + ' điểm Hero,'
				var updateUser = await doc.save();
				res.redirect('back');
			} 
		});
	}

	else res.redirect('back');	

}
