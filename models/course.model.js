var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
	_id: String,
	name: String,
	field: String,
	url: String,
});

var Course = mongoose.model('Course', courseSchema, 'course');

module.exports = Course;