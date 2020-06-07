var Item = require('../models/item.model');

module.exports.search = function(req,res){
	var  q= req.query.q;
	 	Item.find().then(function(item){
	 		
	 		var matched = item.filter(function(dc){
			return dc.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;	
			});
			res.render('/dethi',{
			item:matched
			});
	 	});
};

module.exports.giuaky = async function(req,res){
	var header = '';
	var perPage = 9;
	var page = parseInt(req.params.page) || 1;
	var start = (page-1)*perPage;
	var end = page*perPage;
	var totalPage = Math.ceil((await Item.find({name: req.params.name, type : 'giuaky'}).count())/perPage);

var doc = await Item.find({ name: req.params.name, 
							type : 'giuaky'});
res.render('dethi/img',{
	page: req.params.page, 
	sub:req.params.name,
	totalPage : totalPage,
	field: doc.slice(start, end),
	header : doc.length !==0 ? ('đề thi giữa kỳ ' + req.params.name).toUpperCase() : ('Đang đợi một thiên thần đóng góp vào đề thi '+req.params.name).toUpperCase()
});
};


module.exports.cuoiky = async function(req,res){
	var header = '';
	var perPage = 9;
	var page = parseInt(req.params.page) || 1;
	var start = (page-1)*perPage;
	var end = page*perPage;
	var totalPage = Math.ceil((await Item.find({name: req.params.name, type : 'cuoiky'}).count())/perPage);

var doc = await Item.find({ name: req.params.name, 
							type : 'cuoiky'});
res.render('dethi/img',{
	page: req.params.page, 
	sub:req.params.name,
	totalPage : totalPage,
	field: doc.slice(start, end),
	header : doc.length !==0 ? ('đề thi cuối kỳ ' + req.params.name).toUpperCase() : ('Đang đợi một thiên thần đóng góp vào đề thi '+req.params.name).toUpperCase()
});
};


