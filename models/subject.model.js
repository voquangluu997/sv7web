var mongoose = require('mongoose');

var subjectSchema = new mongoose.Schema({
	_id: String,
	name: String,
	field: String
});

var Subject = mongoose.model('Subject', subjectSchema, 'subjects');

module.exports = Subject;