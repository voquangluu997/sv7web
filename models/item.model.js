var mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment'); 
var itemSchema = new mongoose.Schema({
	_id:String,
	name: String,
	url:  String,
	type: String,
	field: String
});

// autoIncrement.initialize(mongoose.connection); // 3. initialize autoIncrement 

// itemSchema.plugin(autoIncrement.plugin, 'items'); // 4. use autoIncrement

var Item = mongoose.model('Item', itemSchema, 'items');


module.exports = Item;