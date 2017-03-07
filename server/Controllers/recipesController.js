var fs = require('fs');
var Recipe = require('../Models/RecipeModel.js');

module.exports.save = function(req, res) {
	if(req.body._id == '-1') {
		var recipe = new Recipe({
			recipeName: req.body.recipeName,
			ingredients: req.body.ingredients,
			steps: req.body.steps,
			cookTime: req.body.cookTime,
			prepTime: req.body.prepTime,
			tags: req.body.tags
		});
		recipe.save();
	} else {
		var query = Recipe.findByIdAndUpdate(req.body._id, {
			$set: {
				recipeName: req.body.recipeName,
				ingredients: req.body.ingredients,
				steps: req.body.steps,
				cookTime: req.body.cookTime,
				prepTime: req.body.prepTime,
				tags: req.body.tags
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
	}
};

module.exports.get = function(req, res) {
	var query = Recipe.findById(req.params._id);
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

module.exports.getAll = function(req, res) {
	var query = Recipe.find();
	query.exec(function(err, results) {
		if(err){
			console.log(err);
		} else {
			res.setHeader('Content-Type', 'application/json');
			res.send(results);
			res.end();
		}
	});
}

module.exports.remove = function(req, res) {
	var query = Recipe.findByIdAndRemove(req.params._id);
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

