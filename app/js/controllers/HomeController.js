'use strict';

recipesApp.controller('HomeController', function($scope, $location, Roulette, util) {
	$scope.launchFilterEditor = function(){
		$location.url('/filter');
	};
	$scope.launchRecipeBrowser = function(){
		$location.url('/recipes');
	};
	$scope.launchRecipeRoulette = function(){
		Roulette.recipeRoulette('');
	};
});