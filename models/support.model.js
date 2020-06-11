
const  Sequelize = require('sequelize');
const db = require('../database/db.js');

module.exports = db.sequelize.define(
	'count',
	{
		_id:{
			type: Sequelize.STRING,
			primaryKey: true
		},
		support:{
			type: Sequelize.INTEGER
		},
		unsupport:{
			type: Sequelize.INTEGER
		},
	},
	{
		timestamps: false
	}
	);