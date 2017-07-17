'use strict';

recipesApp.factory('RecipeData', function($resource){
	var resource = $resource('/data/recipe/:_id', {_id: '@_id'});
	var resource2 = $resource('/data/recipe/:skip/count/:num', {skip: '@skip', num: '@num'});
	var resource3 = $resource('/data/recipe/:skip/count/:num/search/:search', {skip: '@skip', num: '@num', search: '@search'});
	var resource4 = $resource('/data/randomRecipe/:_id', {_id: '@_id'});
	var shoppingResource = $resource('/data/shoppingList/:_id', {_id: '@_id'});
	
	return {
		getRecipe: function(id) {
			return resource.get({_id: id});
		},
		saveRecipe: function(recipe) {
			return resource.save(recipe);
		},
		removeRecipe: function(id) {
			return resource.remove({_id: id});
		},
		getXRecipes: function(skip, x, searchTerm) {
			if(searchTerm != '') {
				return resource3.get({skip: skip, num: x, search: searchTerm});
			} else {
				return resource2.get({skip: skip, num: x});
			}
		},
		getRandomRecipe: function() {
			return resource4.get();
		},
		getShoppingListRecipes: function() {
			return shoppingResource.get();
		}
	}
});