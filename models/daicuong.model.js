var mongoose = require('mongoose');

var daicuongSchema = new mongoose.Schema({
	name: String,
	url: String
});

var Daicuong = mongoose.model('Daicuong', daicuongSchema, 'daicuong');

module.exports = Daicuong;