'use strict';

recipesApp.controller('RouletteController', function($scope, $routeParams, RecipeData, Roulette) {
	RecipeData.getRecipe($routeParams.recipeID)
			.$promise
			.then(function(recipe) {
				$scope.recipe = recipe;
			})
			.catch(function(response){
				console.log(response);
			});
	$scope.reRoulette = function() {
		Roulette.recipeRoulette();
	}
});