var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
	recipeName: String,
	ingredients: [{ order: Number, amount: Number, measurement: String, ingredient: String }],
	steps: [{ step: String, order: Number }],
	instancesInShoppingList: Number,
	prepTime: {
		hours: Number,
		minutes: Number
	},
	cookTime: {
		hours: Number,
		minutes: Number
	}
});

module.exports = mongoose.model('Recipe', recipeSchema, 'Recipe')