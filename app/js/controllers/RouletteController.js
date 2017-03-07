'use strict';

recipesApp.controller('RouletteController', function($scope, $routeParams, RecipeData, Roulette) {
	RecipeData.getRecipe($routeParams.recipeID)
			.$promise
			.then(function(recipe) {
				$scope.recipe = recipe;
			})
			.catch(function(response){
				//TODO Handle this
				console.log(response);
			});
	$scope.reRoulette = function() {
		Roulette.recipeRoulette($scope.recipe._id);
	}
});