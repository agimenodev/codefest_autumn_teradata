var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CountrySchema   = new Schema({
	name: {
		type: String,
		default: 'Wonderland'
	},
	continent: String
});

module.exports = mongoose.model('country', CountrySchema, 'country');