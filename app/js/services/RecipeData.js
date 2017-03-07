'use strict';

recipesApp.factory('RecipeData', function($resource){
	var resource = $resource('/data/recipe/:_id', {_id: '@_id'});
	
	return {
		getRecipe: function(id) {
			return resource.get({_id: id});
		},
		getAllRecipes: function() {
			return resource.query();
		},
		saveRecipe: function(recipe) {
			return resource.save(recipe);
		},
		removeRecipe: function(id) {
			return resource.remove({_id: id});
		}
	}
});