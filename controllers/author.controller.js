var Support = require('../models/support.model.js');
module.exports.author = async function(req,res){
	Support.findOne().then(function(doc){
		res.render('author/author',{
		support:doc.support,
		unsupport:doc.unsupport
		});

	});

}

module.exports.support = async function(req,res){
	Support.findOne().then(async function(doc){
		console.log(doc.support);
		console.log(doc.unsupport);

		req.params.sp == 'support' ? doc.support++ : doc.unsupport++;
		var saveClick =await doc.save();
		res.render('author/author',{
		support:doc.support,
		unsupport:doc.unsupport,
		});
	});

}
