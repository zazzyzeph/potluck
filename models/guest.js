// http://stackoverflow.com/questions/23627976/mongoose-how-to-insert-a-single-subdocument-not-an-array

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: { type: String, required: true},
	email: { type: String, required: true, index: {unique : true}},
	items: [{
		itemName: { type: String, required: true},
		itemType: { type: String, required: true},
		itemServings: { type: Number, required: true},
		itemAllergies: { type: Array, required: false},
		itemNotes: { type: String, required: false},
	}]
});


module.exports = mongoose.model('User', UserSchema);
