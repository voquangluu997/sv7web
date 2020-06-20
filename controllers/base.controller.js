var Subject = require('../models/subject.model');
var Course = require('../models/course.model');
var User = require('../models/user.model');
var db = require('../database/db.js');
var middleware = require('../middleware/auth.middleware');


module.exports.home =async function(req,res){
	var matched = await User.findAll();
		// matched.forEach( async function(e){
		// 	var x = e.email.split('@');
		// 	x[1] = '@gmail.com';
		// 	User.update(
		// 		{
		// 			email : x.join(''),
		// 		},{
		// 			returning : true,
		// 			where : {_id : e._id}
		// 		})
		// })

	 var k = 0;
	 var top1=[];
	 var top25=[];
	 var top610=[];
	 var temp;
	 for(var i=0; i<matched.length-1;i++)
	 	for(var j=i+1;j<matched.length;j++){	
	 		if(matched[i].dataValues.donggop < matched[j].dataValues.donggop){
	 			temp= matched[i].dataValues;
	 			matched[i].dataValues =   matched[j].dataValues;
	 			matched[j].dataValues = temp;
	 		}	
	 	}
	 	matched.forEach(function(e){
	 		if( k < 1 ) top1.push(e.dataValues);
	 		if( k > 0 && k < 5 ) top25.push(e.dataValues);
	 		if( k > 5 && k <= 10 ) top610.push(e.dataValues);
	 		k++;
	 		if (k>10) return;
	 	});
			
        for(var x=0;x<matched.length;x++){
	        if(req.user._id == (matched[x]._id)){
	            matched[x].rank = x+1;
	            var userUpdate = await matched[x].save();
	            break;
	        }
        }
		res.render('base/index',{
		userInfo: userUpdate,
		top1 : top1,
		top25 : top25,
		top610 : top610,
		});
};                            
                   

module.exports.field =  async function(req,res){
	var header = '';
	if(req.params.field == 'daicuong')
	 header = 'đề thi đại cương';
	if(req.params.field == 'chuyennganh')
	 header = 'đề thi chuyên ngành';
	if(req.params.field == 'toeic')
	 header = 'đề thi toeic';
	if(req.params.field == 'avnl')
	 header = 'đề thi anh văn năng lực';
	// console.log(req.user);
	var matched = await User.findOne({where : { _id : req.user._id}});
	// console.log(matched);
	Subject.findAll( {where :{field: req.params.field }}).then(function(doc){
			res.render('base/listSub',{
			field: req.params.field,
 			list:doc,
 			header: header,
 			userInfo:matched,
 			});
		
	});
};

module.exports.course = async  function(req,res){
	header = req.params.skill =='hocdan'? "Trọn bộ video hướng dẫn chơi Guitar" :" Khóa học lập trình full không che ";
	var matched = await User.findOne({where : { _id : req.user._id}});
	// console.log(matched);
	Course.findAll({where : { field : req.params.skill } }).then(function(doc){
			res.render('base/listCourse',{
 			list:doc,
 			header: header,
 			userInfo: matched,
 			field: req.params.skill
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
	 			res.render('base/listCourse',{
				list : matched,
				message : message,
				header : header,
				userInfo : User.findOne({where : { _id : req.user._id}}),
				field: req.params.skill
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
	 	Subject.findAll({where : {field : req.params.field }}).then(async function(item){
	 		var matched = item.filter(function(i){
			return i.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;	
			});
			var matchedUser = await  User.findOne({where : { _id : req.user._id}})
			if(matched.length==0){
				message = 'Opps! Không tìm thấy rồi.. bạn thử nhập lại nhé!';
				matched = item;
			}
	 			res.render('base/listSub',{
				field : req.params.field,
				list : matched,
				message : message,
				header : header,
				userInfo :matchedUser
				});
	 	});
};

module.exports.postDonggop =async function(req,res){
	if(req.files && req.files.length>0){
		
		var doc = await User.findOne({where :{ _id : req.user._id}});
			if(!doc){ res.redirect('/');}
			else{
				doc.noti= doc.noti +  'Bạn vừa được + ' +  req.files.length + ' điểm Hero,';
				doc.donggop = doc.donggop + req.files.length;
				var updateUser = await doc.save();
				res.redirect('back');
			} 
		
	}

	else res.redirect('back');	

}
