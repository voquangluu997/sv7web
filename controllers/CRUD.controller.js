var Item = require('../models/item.model');
var Subject = require('../models/subject.model');
var User = require('../models/user.model');
var Course = require('../models/course.model');
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

module.exports.search= function(req,res){
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

module.exports.insert= function(req, res){
	res.render('CRUD/CRUD subject/insert');
};

module.exports.postInsert= function(req, res){

	insertMany(req,res);
};


module.exports.edit = async function(req, res){

	var  q= req.params._id;
	 	Item.findAll().then(function(doc){
	 		var matched = doc.filter(function(i){
			return i._id==q._id;	
			});
			
			res.render('CRUD/CRUD subject/edit',{
			item:matched
			});
	 	});
};

// module.exports.postEdit = function(req,res){
// 	 updateItem(req,res);
// }

function insertMany(req,res){
	var url =req.body.url;
	var index = url.indexOf(',');
	var start = 0;
	var startId = Number(req.body.id);
	do{
		var checking = url.slice(start,index);
		var startNum = checking.indexOf('src=')+5;
	 	var endNum =  -1;
	 	
	 	if(checking.indexOf('png')!== -1)
	 	endNum = checking.indexOf('png') +3;
		else endNum = checking.indexOf('jpg') +3;
	 
		const newItem = new Item({
			_id : startId.toString(),
			name : req.body.name,
			url : checking.slice(startNum,endNum),
			field : req.body.field,
			type : req.body.type
		});
		try{
			const saveItem = newItem.save();
		}catch(err){
			console.log(err);
		}	
		start = index +1;
		index = url.indexOf(',' , index + 1);
		startId = startId + 1;		
	}while(index !== -1 );
	res.redirect('/CRUD/manager/'+req.body.field+'/'+req.body.type);
}
	


function updateItem(req,res){
	
	Item.findOneAndUpdate({ _id: req.body.id} , req.body, {new:true},function(err,doc){
		console.log(doc+' doc');
		if(!err){
			res.redirect('/CRUD/manager/'+req.body.field+'/'+req.body.type,{
				item:req.body
			});

		}else{
			console.log(err);
		}
	});
}

module.exports.delete = function(req,res){

	Item.destroy({_id:req.params._id}).then(function(doc){
		res.redirect('/CRUD/manager/'+doc.field + '/' + doc.type);
	});
};


module.exports.deleteUser = function(req,res){

	User.destroy({where : {_id:req.params._id }}).then(function(doc){
		res.redirect('/CRUD/user');
	});
};


module.exports.managerField = function(req,res){
	Course.findAll({where :{field: req.params.field }}).then(function(doc){
		res.render('CRUD/CRUD subject/managerField',{
			item : doc,
			lastPart: req.params.field 
		});	
	});
	
};

module.exports.insertField = function(req,res){
	res.render('CRUD/CRUD subject/insertField');
};


module.exports.postInsertField = function(req, res){

	const newSub = new Subject({
		_id:req.body.id,
		name:req.body.name,
		field:req.body.field
	});
	
	try{
		const saveSub = newSub.save();
		res.redirect('/CRUD/manager/'+ newSub.field) 
	}catch(err){
		console.log(err);
	}
};

module.exports.searchField= function(req,res){
	var q = req.query.q ;
	var message='';
	Subject.findAll( {where:{ field: req.params.field}}).then(function(item){
		var matched = item.filter(function(i){
			return i.name.toLowerCase().indexOf(q.toLowerCase())!== -1;
		});
		if(matched.length==0){
			message = 'Opps! Không tìm thấy rồi.. bạn thử nhập lại nhé!';
			matched = item;
		}
		res.render('CRUD/CRUD subject/managerField',{
			item : matched,
			message : message
		});
	});
};

module.exports.deleteField = function(req,res){
	Subject.destroy({_id : req.params._id}).then(function(doc){
		res.redirect('/CRUD/deleteField/'+doc._id);
	});
};


/user CRUD controller -------------------------------------------------------/ 


module.exports.user = async function(req,res){

	var userList =await User.findAll() ;

	res.render('CRUD/CRUD user/CRUDuser',{
		item: userList
	});
}


module.exports.userSearch= function(req,res){
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
