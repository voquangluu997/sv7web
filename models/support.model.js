var mongoose = require('mongoose');

var supportSchema = new mongoose.Schema({
	support : Number,
	unsupport: Number,
});

var Support = mongoose.model('Support', supportSchema, 'count');

module.exports = Support;