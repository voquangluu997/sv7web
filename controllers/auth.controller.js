
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
const someOtherPlaintextPassword = 'not_bacon';

module.exports.register =  function(req,res){
 	res.render('auth/register');
};

module.exports.postRegister = async function(req,res){
	const { error } = registerValidation(req.body);
	if(error) return res.status(400).send(error.details[0].message);
	const emailExist = await User.findOne({email: req.body.email});
	if(emailExist) return res.status(400).send('Email already exists.');
	// const toDay = new Date();
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});

	user.password = await bcrypt.hashSync(req.body.password,saltRounds);

	try{
		 const saveUser = await user.save();

		res.send({user: user._id});
	}catch(err){
		res.status(400).send(err);


	}
};

module.exports.login =  function(req,res){
  	res.render('auth/login',{
 	});
};

module.exports.postLogin = async function(req, res){

	const { error } = loginValidation(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	const user = await User.findOne({email: req.body.email});
	if(!user) return res.status(400).send('Email is not found.');

	const validPass = await bcrypt.compare(req.body.password,user.password);
	if(!validPass) return res.status(400).send(' Invalid Password');

	const token = jwt.sign({ _id:user._id }, process.env.SECRET_KEY );
	// localStorage.setItem('myFirstKey', 'myFirstValue');
	localStorage.setItem('auth-token',token);
	console.log(localStorage.getItem('auth-token'));
	res.redirect('/');
	 
}

module.exports.logout =  function(req,res){
	localStorage.removeItem('auth-token');
  	res.render('auth/login');
};
