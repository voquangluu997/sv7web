
const  Sequelize = require('sequelize');
const db = require('../database/db.js');

module.exports = db.sequelize.define(
	'subjects',
	{
		_id:{
			type: Sequelize.STRING,
			primaryKey: true
		},
		name:{
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