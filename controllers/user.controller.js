var  User  = require('../models/user.model');
var middleware = require('../middleware/auth.middleware');
var fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports.profile = async function(req,res){
	var matched = await User.findOne({where : { _id : req.user._id}});
			res.render('users/profile',{
			userInfo : matched
			});
}
	module.exports.postProfile = async function(req,res){
		var errNoti = 'Password length must be at least 6 characters long and matched!';
		var succNoti = 'Great! Everything has been changed!! ';
		var message = '';
		var matched = await User.findOne( {where :{ _id : req.user._id}});	
			var updateUser = matched;
			if(req.file){
				if( matched.avatar !== 'default-male.jpeg'&&matched.avatar !== 'default-female.jpeg'&&matched.avatar !==req.file.filename){
					fs.unlinkSync('./public/uploads/'+matched.avatar);
					updateUser.avatar = req.file.filename;
					updateUser.gender = req.body.gender;
					if(req.body.name){
						updateUser.name = req.body.name;
					}else updateUser.name = matched.name;
					if( req.body.newPass||req.body.oldPass ){
						const validPass = await bcrypt.compare(req.body.oldPass,matched.password);
						if(validPass){
							if(newPass.length>5) {
								updateUser.password = await bcrypt.hashSync(req.body.newPass,saltRounds);
								message = succNoti;
								console.log(req.body.newPass);

							}else message = errNoti;
						}
						else message = errNoti;
					}else message = succNoti;
	
					var saveUser = await updateUser.save();
					
					res.render('users/profile',{
						userInfo : updateUser,
						message : message
					});
				}
				else {
					updateUser.gender = req.body.gender;
					if(req.body.name){
						updateUser.name = req.body.name;
					}else updateUser.name = matched.name;
					if( req.body.newPass||req.body.oldPass ){
						const validPass = await bcrypt.compare(req.body.oldPass,matched.password);
						if(validPass){
							if(newPass.length>5) {
								updateUser.password = await bcrypt.hashSync(req.body.newPass,saltRounds);
								message = succNoti;
								console.log(req.body.newPass);

							}else message = errNoti;
						}
						else message = errNoti;
					}else message = succNoti;
					updateUser.avatar = req.file.filename;
					var saveUser = await updateUser.save();
					res.render('users/profile',{
						userInfo : updateUser,
						message : message
					});
				}
			}
			else{
				updateUser.gender = req.body.gender;
				if(req.body.name){
				updateUser.name = req.body.name;
				}else updateUser.name = matched.name;
				if( req.body.newPass||req.body.oldPass ){
						const validPass = await bcrypt.compare(req.body.oldPass,matched.password);
						if(validPass){
							if(req.body.newPass.length>5) {
								updateUser.password = await bcrypt.hashSync(req.body.newPass,saltRounds);
								message = succNoti;
								console.log(req.body.newPass);
							}
							else message = errNoti;
						}
						else message = errNoti;
				}else message = succNoti;
				var saveUser = await updateUser.save();

				
				res.render('users/profile',{
						userInfo : updateUser,
						message : message
					});
			}
	};

	module.exports.seeProfile = async function(req,res){
		var matched = await User.findOne({where :  {_id: req.params._id } });
			res.render('users/profileOther',{
			userInfo: matched
			});
	}

