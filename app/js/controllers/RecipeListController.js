'use strict';

recipesApp.controller('RecipeListController', function($scope, $location, util, RecipeData) {
	function populate(skip, num, searchTerm) {
		RecipeData.getXRecipes(skip, num, searchTerm)
		.$promise
		.then(function(results) {
			$scope.recipes = results.recipes;
			$scope.recipeCount = results.count;
			$scope.noRecipes = $scope.recipes.length == 0;
			$scope.numPages = $scope.recipeCount / $scope.perPage;
			$scope.pages = [];
			for(var i = 0;i < $scope.numPages;i++) {
				$scope.pages.push(i+1);
			}
		})
		.catch(function(response) {
			$scope.recipes = [];
			$scope.recipeCount = 0;
			$scope.noRecipes = true;
			$scope.numPages = 1;
			$scope.pages = [1];
			console.log(response);
		});
	}
	
	function initVars() {
		$scope.pageSizes = [5,10,50,100];
		$scope.perPage = $scope.pageSizes[0];
		$scope.currentPage = 1;
		$scope.searchTermTemp = '';
		$scope.searchTerm ='';
	}
	
	$scope.launchAddRecipe = function() {
		$location.url('/add');
	}
	
	$scope.reQuery = function() {
		$scope.currentPage = 1;
		populate(0, $scope.perPage, $scope.searchTerm);
	}
	
	$scope.goToPage = function(page) {
		if(page >= 1 && page <= $scope.pages.length + 1 && page != $scope.currentPage) {
			populate($scope.perPage*(page - 1), $scope.perPage, $scope.searchTerm);
			$scope.currentPage = page;
		}
	}
	
	$scope.search = function() {
		$scope.searchTerm = $scope.searchTermTemp;
		$scope.reQuery();
	}
	
	initVars();
	populate(0, $scope.perPage, $scope.searchTerm);
});