var Item = require('../models/item.model');
var Subject = require('../models/subject.model');
var User = require('../models/user.model');
var Course = require('../models/course.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports.CRUD = function(req,res){
	var field = ['daicuong', 'chuyennganh', 'avnl', 'toeic', 'hocdan', 'laptrinh'];
	res.render('CRUD/CRUD',{
		field: field
	});
};

module.exports.manager = function(req, res){
	Item.findAll({where :{field: req.params.field, type: req.params.type }}).then(function(item){
		res.render('CRUD/CRUD subject/manager',{
			item : item,
			lastPart: req.params.field + '/' + req.params.type
		});	
	});
};

module.exports.managerField = async function(req,res){
	matched = await Subject.findAll({where :{ field: req.params.field }});
	res.render('CRUD/CRUD subject/managerField',{
			item : matched,
			lastPart: req.params.field
		});	
	
};

module.exports.managerCourse = async function(req,res){
	matched = await Course.findAll({where :{ field: req.params.field }});
	res.render('CRUD/CRUD subject/managerField',{
			item : matched,
			lastPart: req.params.field
		});	
	
};


module.exports.managerUser = async function(req,res){
	var userList =await User.findAll() ;
	res.render('CRUD/CRUD user/CRUDuser',{
		item: userList
	});
}



module.exports.searchItem= function(req,res){
	var q = req.query.q ;
	var message='';

	Item.findAll({where :{ field: req.params.field, type : req.params.type}}).then(function(item){
		var matched = item.filter(function(i){
			return i.name.toLowerCase().indexOf(q.toLowerCase())!== -1;
		});
		if(matched.length==0){
			message = 'Opps! Không tìm thấy rồi.. bạn thử nhập lại nhé!';
			matched = item;
		}
		res.render('CRUD/CRUD subject/manager',{
			item:matched,
			message : message
		});
	});
};


module.exports.searchField= function(req,res){
	var q = req.query.q ;
	var message='';

	Subject.findAll({where :{ field: req.params.field }}).then(function(item){
		var matched = item.filter(function(i){
			return i.name.toLowerCase().indexOf(q.toLowerCase())!== -1;
		});
		if(matched.length==0){
			message = 'Opps! Không tìm thấy rồi.. bạn thử nhập lại nhé!';
			matched = item;
		}
		res.render('CRUD/CRUD subject/managerField',{
			item:matched,
			message : message
		});
	});
};

module.exports.searchCourse= function(req,res){
	var q = req.query.q ;
	var message='';

	Course.findAll({where :{ field: req.params.field }}).then(function(item){
		var matched = item.filter(function(i){
			return i.name.toLowerCase().indexOf(q.toLowerCase())!== -1;
		});
		if(matched.length==0){
			message = 'Opps! Không tìm thấy rồi.. bạn thử nhập lại nhé!';
			matched = item;
		}
		res.render('CRUD/CRUD subject/managerField',{
			item:matched,
			message : message
		});
	});
};



module.exports.searchUser= function(req,res){
	var q = req.query.q ;
	var message='';

	User.findAll({ }).then(function(item){
		var matched = item.filter(function(i){
			return (i.name.toLowerCase().indexOf(q.toLowerCase())!== -1)
			|| (i._id == q)
			|| (i.email.toLowerCase().indexOf(q.toLowerCase())!== -1);

		});
		if(matched.length==0){
			message = 'Opps! Không tìm thấy rồi.. bạn thử nhập lại nhé!';
			matched = item;
		}
		res.render('CRUD/CRUD user/CRUDuser',{
			item:matched,
			message : message
		});
	});
};



module.exports.insertItem= function(req, res){
	res.render('CRUD/CRUD subject/insert');
};

module.exports.postInsertItem= function(req, res){

	insertMany(req,res);
};


module.exports.insertField = function(req,res){
	res.render('CRUD/CRUD subject/insertField');
};

module.exports.postInsertField= function(req, res){

	var name =req.body.name;
	var end = name.indexOf(',');
	var start = 0;
	var startId = Number(req.body.id);
	do{
		const newSubject = new Subject({
			_id : startId.toString(),
			name : name.slice(start,end),
			field : req.body.field
		});
		try{
			const saveSubject = newSubject.save();
		}catch(err){
			console.log(err);
		}	
		start = end +1;
		end = name.indexOf(',' , end + 1);
		startId = startId + 1;		
	}while(end !== -1 );
	res.redirect('/CRUD/managerField/'+req.body.field);
	
};


module.exports.insertCourse = function(req,res){
	res.render('CRUD/CRUD subject/insertCourse');
};

module.exports.postInsertCourse= function(req, res){
var name =req.body.name;
var url =req.body.url;
console.log(name);
console.log(url);

	var endName = name.indexOf(',');
	var startName = 0;
	var endUrl = url.indexOf(',');
	var startUrl = 0;
	var startId = Number(req.body.id);
	do{
		console.log(name.slice(startName,endName));
		console.log(url.slice(startUrl,endUrl),);
		const newCourse = new Course({
			_id : startId.toString(),
			name : name.slice(startName,endName),
			url : url.slice(startUrl,endUrl),
			field : req.body.field
		});
		try{
			const saveCourse = newCourse.save();
		}catch(err){
			console.log(err);
		}	
		startName = endName +1;
		endName = name.indexOf(',' , endName + 1);
		startUrl = endUrl +1;
		endUrl = url.indexOf(',' , endUrl + 1);
		startId = startId + 1;		
	}while(endName !== -1 && endUrl !=-1 );
	res.redirect('/CRUD/managerCourse/'+req.body.field);
};

module.exports.editItem = async function(req, res){
	var  matched = await  Item.findOne({ where : { _id : req.params._id}} );
	res.render('CRUD/CRUD subject/editItem',{
		item: matched
	});
};

module.exports.postEditItem = async function(req,res){
	Item.update(
	{
		_id: req.body.id,
		name: req.body.name,
		url: req.body.url,
		field: req.body.field,
		type: req.body.type
	},{
		returning : true,
		where : {_id : req.params._id}

	}).then(function(doc){
		res.redirect('/CRUD/manager/'+ req.body.field + '/' + req.body.type);
	})
}

module.exports.editField = async function(req, res){
	var  matched = await  Subject.findOne({ where : { _id : req.params._id}} );
	res.render('CRUD/CRUD subject/editField',{
		item: matched
	});
};

module.exports.postEditField = async function(req,res){
	Subject.update(
	{
		_id: req.body.id,
		name: req.body.name,
		field: req.body.field
	},{
		returning : true,
		where : {_id : req.params._id}
	}).then(function(doc){
		res.redirect('/CRUD/managerField/'+ req.body.field );
	})
}

module.exports.editCourse = async function(req, res){
	var  matched = await  Course.findOne({ where : { _id : req.params._id}} );
	res.render('CRUD/CRUD subject/editCourse',{
		item: matched
	});
};

module.exports.postEditCourse = async function(req,res){
	Course.update(
	{
		_id: req.body.id,
		name: req.body.name,
		url: req.body.url,
		field: req.body.field
	},{
		returning : true,
		where : {_id : req.params._id}
	}).then(function(doc){
		res.redirect('/CRUD/managerCourse/'+ req.body.field );
	})
}


module.exports.editUser = async function(req, res){
	var  matched = await  User.findOne({ where : { _id : req.params._id}} );
	res.render('CRUD/CRUD user/editUser',{
		item: matched
	});
};


module.exports.postEditUser = async function(req,res){
	 
	User.update(
	{
		_id: req.body.id,
		name: req.body.name,
		email:req.body.email,
		password: await bcrypt.hashSync(req.body.password,saltRounds),
		avatar: req.body.avatar,
		gender: req.body.gender,
		donggop: req.body.donggop,
		noti: req.body.noti,
		rank: req.body.rank,
		admin: req.body.admin,
	},{
		returning : true,
		where : {_id : req.params._id}

	}).then(function(doc){
		res.redirect('/CRUD/manageruser');
	})
	
}

module.exports.deleteItem = async function(req,res){
	var matched = await Item.findOne({where : {_id :  req.params._id}});
	Item.destroy({where : {_id: req.params._id}}).then(async function(d){
		res.redirect('/CRUD/manager/'+matched.field + '/' + matched.type);
	});

};


module.exports.deleteField = async function(req,res){

	var matched =await Subject.findOne({where: {_id : req.params._id}});
	Subject.destroy( {where: {_id : req.params._id}}).then(function(doc){
		res.redirect('/CRUD/managerField/'+matched.field);
	});
};


module.exports.deleteCourse = async function(req,res){
	var matched =await Course.findOne({where: {_id : req.params._id}});
	Course.destroy( {where: {_id : req.params._id}}).then(function(doc){
		res.redirect('/CRUD/managerCourse/'+matched.field);
	});
};

module.exports.deleteUser = function(req,res){
	User.destroy({where : {_id : req.params._id }}).then( function(doc){
		res.redirect('/CRUD/managerUser');
	});
};

/user CRUD controller -------------------------------------------------------/ 




function insertMany(req,res){
	var url =req.body.url;
	var end = url.indexOf(',');
	var start = 0;
	var startId = Number(req.body.id);
	do{
		const newItem = new Item({
			_id : startId.toString(),
			name : req.body.name,
			url : url.slice(start,end),
			field : req.body.field,
			type : req.body.type
		});
		try{
			const saveItem = newItem.save();
		}catch(err){
			console.log(err);
		}	
		start = end +1;
		end = url.indexOf(',' , end + 1);
		startId = startId + 1;		
	}while(end !== -1 );
	res.redirect('/CRUD/manager/'+req.body.field+'/'+req.body.type);
}
	

module.exports.noti = function(req, res){
	res.render('CRUD/CRUD user/noti');
}


module.exports.postNoti =async function(req, res){
	if(req.body.email =='all'){
		var matched = await User.findAll();
		matched.forEach(function(e){
			User.update(
			{
				noti:   'New! '+req.body.noti + ',' + e.noti 
			},{
				returning : true,
				where : {}
			})
		})
		
		

	}else{
		var matched = await User.findOne({where : {email : req.body.email }});
		User.update(
			{
				noti:   'New! '+req.body.noti + ',' +matched.noti 
			},{
				returning : true,
				where : {email : req.body.email}
			})
	}

	res.redirect('/crud'); 
}
