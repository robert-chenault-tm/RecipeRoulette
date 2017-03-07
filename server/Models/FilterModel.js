var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var filterSchema = new Schema({
	filterName: String,
	goodTags: [{ val: String }],
	badTags: [{ val: String }]
});

module.exports = mongoose.model('Filter', filterSchema, 'Filter')