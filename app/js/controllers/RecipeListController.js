'use strict';

recipesApp.controller('RecipeListController', function($scope, $location, util, RecipeData) {
	RecipeData.getAllRecipes()
		.$promise
		.then(function(recipes) {
			$scope.recipes = recipes;
			$scope.numRecipes = $scope.recipes.length;
			$scope.noRecipes = $scope.numRecipes == 0;
		})
		.catch(function(response) {
			$scope.recipes = [];
			$scope.noRecipes = true;
			$scope.numRecipes = 0;
			console.log(response);
		});
	$scope.launchAddRecipe = function() {
		$location.url('/add');
	}
});