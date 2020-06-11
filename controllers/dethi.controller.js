var Item = require('../models/item.model');

module.exports.search = function(req,res){
	var  q= req.query.q;
	 	Item.findAll().then(function(item){
	 		
	 		var matched = item.filter(function(dc){
			return dc.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;	
			});
			res.render('/dethi',{
			item:matched
			});
	 	});
};

module.exports.typeDethi = async function(req,res){
	var header = '';
	var perPage = 9;
	var page = parseInt(req.params.page) || 1;
	var start = (page-1)*perPage;
	var end = page*perPage;
	 Item.findAll({where :{ type : req.params.type,name: req.params.name} }).then(function(doc){
	 	var totalPage = Math.ceil(doc.length/perPage);
	 	res.render('dethi/img',{
		page: req.params.page, 
		sub:req.params.name,
		type: req.params.type,
		totalPage : totalPage,
		field: doc.slice(start, end),
		header : doc.length !==0 ? ('đề thi ' + req.params.name).toUpperCase() : ('Đang đợi một thiên thần đóng góp vào đề thi '+req.params.name).toUpperCase()
	});

	});

};



