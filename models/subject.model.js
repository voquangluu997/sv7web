var mongoose = require('mongoose');

var subjectSchema = new mongoose.Schema({
	name: String,
	url: String
});

var Subject = mongoose.model('Subject', subjectSchema, 'subjects');

module.exports = Subject;