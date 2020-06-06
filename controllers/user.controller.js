
var  User  = require('../models/user.model');
var Upload = require('../models/upload.model');
var middleware = require('../middleware/auth.middleware');
var fs = require('fs');


module.exports.profile = function(req,res){
	
	middleware.checkLoggedMiddleware().then( async function(userId){
		var matched =await User.findOne({ _id : userId } ); 
		res.render('users/profile',{
		userInfo: matched
	});

	});
	
}

module.exports.postProfile = function(req,res){
	middleware.checkLoggedMiddleware().then( async function(userId){		
		var matched =await User.findOne({ _id : userId } ); 
		var updateUser = matched;
		if(req.file){
			
			if( matched.avatar !== 'default-male.jpg'&&matched.avatar !== 'default-female.jpg'&&matched.avatar !==req.file.filename){
					fs.unlinkSync('./public/uploads/'+matched.avatar);
					updateUser.avatar = req.file.filename;
					updateUser.gender = req.body.gender;
					if(req.body.name){
						updateUser.name = req.body.name;
					}else
						updateUser.name = matched.name;
						
					var saveUser = await updateUser.save();
					res.render('users/profile',{
						userInfo:updateUser
					});
			}
			else {
				updateUser.gender = req.body.gender;
					if(req.body.name){
						updateUser.name = req.body.name;
					}else
						updateUser.name = matched.name;
				updateUser.avatar = req.file.filename;
				var saveUser = await updateUser.save();
				res.render('users/profile',{
					userInfo:updateUser
				});
			}
		}
		else{
			updateUser.gender = req.body.gender;
				if(req.body.name){
					updateUser.name = req.body.name;
				}else
					updateUser.name = matched.name;
					var saveUser = await updateUser.save();
			res.render('users/profile',{
				userInfo: matched			
			});

		}
			
	});

}
