'use strict';

recipesApp.factory('Roulette', function($location, RecipeData, util) {
	return {
		recipeRoulette: function() {
			RecipeData.getRandomRecipe()
				.$promise
				.then(function(recipe) {
					console.log(recipe._id)
					$location.url('/roulette/' + recipe._id);
				});
		}
	}
});