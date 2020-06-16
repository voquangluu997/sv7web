
var User = require('../models/user.model');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require('../validation/validation');

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

module.exports.register =  function(req,res){
 	res.render('auth/register');
};

module.exports.postRegister = async function(req,res){
	const { error } = registerValidation(req.body);
	console.log(error + 'err');
	if(error) res.render('auth/register',{ noti: error.details[0].message});
	
		const emailExist = await User.findOne({where : {email: req.body.email}});
		if(emailExist) res.render('auth/register',{ noti: 'Email already exists.'});

		
			const user = new User({
			_id: Date.now().toString(),
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			avatar : (req.body.gender=='Male') ? 'default-male.jpeg': 'default-female.jpeg',
			gender : req.body.gender,
			donggop:0,
			rank : 99,
			noti : 'Chào mừng thành viên mới!, '+ ' Đóng góp đề thi để sớm có tên trên bảng vinh danh \"Heros rank \" nhé!,',
			});

			user.password = await bcrypt.hashSync(req.body.password,saltRounds);
			try{
				const saveUser = await user.save();
				const token = jwt.sign({ _id:saveUser._id }, process.env.SECRET_KEY );
				res.cookie('auth', token,{
					signed: true
				});
				res.redirect('/');
			}catch(err){
				throw err;
			}
};

module.exports.login =  function(req,res){
  	res.render('auth/login');
};

module.exports.postLogin = async function(req, res){
	try{
		const { error } = loginValidation(req.body);
		if(error) res.render('auth/login', { noti : error.details[0].message});
		else{
			const user = await User.findOne( {where :{email: req.body.email} });
			if(user){
				const validPass = await bcrypt.compare(req.body.password,user.password);
				if(!validPass) res.render('auth/login', { noti : 'Invalid Password'});
				else{
					const token = jwt.sign({ _id:user._id }, process.env.SECRET_KEY );
					res.cookie('auth',token,{
						signed: true
					});
					res.redirect('/');
				}
			}else{
			    res.render('auth/login', { noti : 'Email is not found.'});
			}
		}	
	}catch(err){
		throw err;
		}
		
}

module.exports.logout = function(req,res){
	res.clearCookie('auth');
  	res.render('auth/login', { 
  		saygb : 'Logged out!'
  	});
};



