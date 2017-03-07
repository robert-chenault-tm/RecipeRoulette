var fs = require('fs');
var Filter = require('../Models/FilterModel.js');

module.exports.save = function(req, res) {
	var query = Filter.findOneAndUpdate({
		$set: {
			filterName: req.body.filterName,
			goodTags: req.body.goodTags,
			badTags: req.body.badTags
		}
	});
	query.exec(function(err, results) {
		if(err){
			console.log(err);
		} else {
			res.setHeader('Content-Type', 'application/json');
			res.send(results);
			res.end();
		}
	});	
};

module.exports.get = function(req, res) {
	var query = Filter.findOne();
	query.exec(function(err, results) {
		if(err){
			console.log(err);
		} else {
			res.setHeader('Content-Type', 'application/json');
			res.send(results);
			res.end();
		}
	});
};