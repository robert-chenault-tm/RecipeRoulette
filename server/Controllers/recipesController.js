var fs = require('fs');
var Recipe = require('../Models/RecipeModel.js');
var maxUniqueShoppingRecipes = 20;

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.save = function(req, res) {
	if(req.body.instancesInShoppingList > 0) {
		var  shoppingCheckQuery = Recipe.find(
					{instancesInShoppingList: {$gt: 0}, _id: {$not: {$eq: req.body._id}}}	
				).count();
		shoppingCheckQuery.exec(function(err, results) {
			if(err) {
				console.log(err);
			} else {
				if(results < maxUniqueShoppingRecipes) {
					saveRecipe(req, res);
				} else {
					res.send({saved: false, results: 'The shopping list already contains its maximum number of recipes.'});
				}
			}
		});
	} else {
		saveRecipe(req, res);
	}

	
};

function saveRecipe(req, res) {
	if(req.body._id == '-1') {
		var recipe = new Recipe({
			recipeName: req.body.recipeName,
			ingredients: req.body.ingredients,
			steps: req.body.steps,
			cookTime: req.body.cookTime,
			prepTime: req.body.prepTime,
			instancesInShoppingList: req.body.instancesInShoppingList
		});
		recipe.save();
		res.setHeader('Content-Type', 'application/json');
		res.send({saved: true, results: 'Saved'});
		res.end();
	} else {
		var query = Recipe.findByIdAndUpdate(req.body._id, {
			$set: {
				recipeName: req.body.recipeName,
				ingredients: req.body.ingredients,
				steps: req.body.steps,
				cookTime: req.body.cookTime,
				prepTime: req.body.prepTime,
				instancesInShoppingList: req.body.instancesInShoppingList
			}
		});
		query.exec(function(err, results) {
			if(err){
				console.log(err);
			} else {
				res.setHeader('Content-Type', 'application/json');
				res.send({saved: true, results: results});
				res.end();
			}
		});
	}
}

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

module.exports.getX = function(req, res) {
	var query = Recipe.aggregate(
	[
		{$sort: {recipeName: 1}},
		{$skip: parseInt(req.params.skip)},
		{$limit: parseInt(req.params.num)}
	]
	);
	query.exec(function(err, results) {
		if(err){
			console.log(err);
		} else {
			var countQuery = Recipe.find().count();
			countQuery.exec(function(err, countResults) {
				if(err){
					console.log(err);
				} else {
					res.setHeader('Content-Type', 'application/json');
					res.send({recipes: results, count: countResults});
					res.end();
				}
			});
		}
	});
}

module.exports.getXThatMatch = function(req, res) {
	var searchTerms = new RegExp(req.params.search, 'i');
	var query = Recipe.aggregate(
	[
		{$match: {recipeName: searchTerms}},
		{$sort: {recipeName: 1}},
		{$skip: parseInt(req.params.skip)},
		{$limit: parseInt(req.params.num)}
	]
	);
	query.exec(function(err, results) {
		if(err) {
			console.log(err);
		} else {
			var countQuery = Recipe.find({recipeName: searchTerms}).count();
			countQuery.exec(function(err, countResults) {
				if(err){
					console.log(err);
				} else {
					res.setHeader('Content-Type', 'application/json');
					res.send({recipes: results, count: countResults});
					res.end();
				}
			});
		}
	});
}

module.exports.getRandom = function(req, res) {
	var countQuery = Recipe.find().count();
	countQuery.exec(function(err, countResults) {
		if(err) {
			console.log(err);
		} else {
			var randomRecipeNum = getRandomInt(1, countResults);
			var query = Recipe.aggregate(
					[
						{$skip: randomRecipeNum - 1},
						{$limit: 1}
					]
					);
			query.exec(function(err, results) {
				if(err) {
					console.log(err);
				} else {
					res.setHeader('Content-Type', 'application/json');
					res.send(results[0]);
					res.end();
				}
			});
		}
	});
};

module.exports.getShoppingList = function(req, res) {
	var query = Recipe.find({instancesInShoppingList: {$gt: 0}}, {recipeName: 1, instancesInShoppingList: 1});
	query.exec(function(err, results) {
		if(err) {
			console.log(err);
		} else {
			var ingredientsQuery = Recipe.aggregate([
				{$project: {instancesInShoppingList: 1, ingredients: 1}},
				{$match: {instancesInShoppingList: {$gt: 0}}},
				{$unwind: '$ingredients'},
				{$group: {
					_id: {ingredient: '$ingredients.ingredient', measurement: '$ingredients.measurement'},
					amount: {$sum: {$multiply: ['$ingredients.amount', '$instancesInShoppingList']}},
					measurement: {$first: '$ingredients.measurement'},
					ingredient: {$first: '$ingredients.ingredient'}
				}}
			]);
			ingredientsQuery.exec(function(err, ingredientsResults) {
				if(err) {
					console.log(err);
				} else {
					res.setHeader('Content-Type', 'application/json');
					res.send({recipes: results, ingredients: ingredientsResults});
					res.end();
				}
			});
			
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









