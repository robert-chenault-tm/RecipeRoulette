'use strict';

recipesApp.controller('ShoppingListController', function($scope, $location, RecipeData) {
	function initScopeVars() {
		$scope.displayRecipeList = true;
		$scope.displayIngredientList = true;
		$scope.ingredients = [];
	}
	
	$scope.generateCountString = function(count) {
		if(count > 1) {
			return ' (x' + count + ')';
		} else {
			return '';
		}
	}
	
	$scope.toggleRecipeDisplay = function() {
		$scope.displayRecipeList = !$scope.displayRecipeList;
	}
	
	$scope.toggleIngredientDisplay = function() {
		$scope.displayIngredientList = !$scope.displayIngredientList;
	}
	
	
	
	initScopeVars();
	RecipeData.getShoppingListRecipes()
		.$promise
		.then(function(results) {
			$scope.recipes = results.recipes;
			$scope.ingredients = results.ingredients;
		}).catch(function(response) {
			console.log('err');
			console.log(response);
		});
});