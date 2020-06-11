const  Sequelize = require('sequelize');
const db = require('../database/db.js');

module.exports = db.sequelize.define(
	'items',
	{

		_id:{
			type: Sequelize.STRING,
			primaryKey: true
		},
		name:{
			type: Sequelize.STRING
		},
		url:{
			type: Sequelize.STRING
		},
		type:{
			type:Sequelize.STRING
		},
		field:{
			type: Sequelize.STRING
		}
	},
	{
		timestamps: false
	}
	);




