
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
	name: { type: String, required: true, index: {unique : true}},
	type: { type: String, required: true},
	servings: { type: String, required: true},
	allergies: { type: Object, required: true},
	notes: { type: String, required: false}
});

var UserSchema = new Schema({
	name: { type: String, required: true},
	email: { type: String, required: true, index: {unique : true}},
	items: [ItemSchema]
});

module.exports = mongoose.model('User', UserSchema);

