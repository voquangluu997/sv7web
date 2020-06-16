const  Sequelize = require('sequelize');
const db = require('../database/db.js');

module.exports = db.sequelize.define(
  'users',
  {

    _id:{
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name:{
      type: Sequelize.STRING

    },
    email:{
      type: Sequelize.STRING,
      unique: true
    },
    password:{
      type: Sequelize.STRING
    },
    avatar:{
      type: Sequelize.STRING
    },
    gender:{
      type: Sequelize.STRING
    },
    donggop:{
      type: Sequelize.INTEGER
    },
    noti: { 
        type: Sequelize.STRING
    },
    admin:{
      type: Sequelize.STRING
    },
    rank:{
      type: Sequelize.INTEGER
    },
  },
  {
    timestamps: false
  }
  );

 





