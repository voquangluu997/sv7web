
var User = require('../models/user.model');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

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
	else{
		const emailExist = await User.findOne({email: req.body.email});
		if(emailExist) res.render('auth/register',{ noti: 'Email already exists.'});
		else{
			const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			avatar : (req.body.gender=='Male') ? 'default-male.jpg': 'default-female.jpg',
			gender : 'female',
			donggop:0,
			rank : 0,
			noti : ['Chào mừng thành viên mới!', 'Đóng góp đề thi để sớm có tên trên bảng vinh danh \"Heros rank \" nhé😘'],

			// mylist:[],
			});
			user.password = await bcrypt.hashSync(req.body.password,saltRounds);
			try{
				const saveUser = await user.save();
				const token = jwt.sign({ _id:saveUser._id }, process.env.SECRET_KEY );
				localStorage.setItem('auth-token',token);
				res.redirect('/');
			}catch(err){
				throw err;
			}

		}
		
	}
	
};

module.exports.login =  function(req,res){
  	res.render('auth/login');
};

module.exports.postLogin = async function(req, res){

	const { error } = loginValidation(req.body);
	if(error) res.render('auth/login', { noti : error.details[0].message});
	else{
		const user = await User.findOne({email: req.body.email});
		if(!user) res.render('auth/login', { noti : 'Email is not found.'});
		else{
			const validPass = await bcrypt.compare(req.body.password,user.password);
			if(!validPass) res.render('auth/login', { noti : 'Invalid Password'});
			else{
				const token = jwt.sign({ _id:user._id }, process.env.SECRET_KEY );
				localStorage.setItem('auth-token',token);
				res.redirect('/');
			}
		}

	}
 
}

module.exports.logout =  function(req,res){

	localStorage.removeItem('auth-token');
  	res.render('auth/login', { 
  		saygb : 'Logged out!'
  	});
};



