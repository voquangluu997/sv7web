
const Joi = require('joi');

module.exports.registerValidation = function(data){
const schema = {
	name : Joi.string().required(),
	email : Joi.string().min(6).required().email(),
	password : Joi.string().min(6).required(),
	gender : Joi.string()
	  };
	return Joi.validate(data, schema);

}

module.exports.loginValidation = function(data){
	const schema = {
	
	email : Joi.string().min(6).required().email(),
	password : Joi.string().min(6).required()
	  };
	return Joi.validate(data, schema);

}



