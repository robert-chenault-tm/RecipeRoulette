'use strict';

recipesApp.controller('HomeController', function($scope, $location, Roulette, util) {
	$scope.launchShoppingList = function(){
		$location.url('/shoppingList');
	};
	$scope.launchRecipeBrowser = function(){
		$location.url('/recipes');
	};
	$scope.launchRecipeRoulette = function(){
		Roulette.recipeRoulette();
	};
});