const  Sequelize = require('sequelize');
const db = require('../database/db.js');

module.exports = db.sequelize.define(
	'courses',
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
		field:{
			type: Sequelize.STRING
		}
	},
	{
		timestamps: false
	}
	);