var mongoose = require('mongoose');

var uploadSchema = new mongoose.Schema({
	path: String,
});

var Upload = mongoose.model('Upload', uploadSchema, 'uploadimage');
module.exports = Upload;