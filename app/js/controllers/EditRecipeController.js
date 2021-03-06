'use strict';

recipesApp.controller('EditRecipeController', function($scope, $routeParams, $location, RecipeData) {
	if($routeParams.recipeID != null){
		RecipeData.getRecipe($routeParams.recipeID)
			.$promise
			.then(function(recipe) {
				$scope.recipe = recipe;
				$scope.title = 'Edit ' + recipe.recipeName;
				$scope.origName = $scope.recipe.recipeName;
				$scope.removable = true;
			})
			.catch(function(response){
				console.log(response);
			});
	} else {
		$scope.title = 'Add a new recipe';
		$scope.recipe = {'recipeName': '',
							'_id': '-1',
							'ingredients': [
								{
									'amount': '',
									'measurement': '',
									'ingredient': ''
									
								}
							],
							'steps': [
								{
									'step': ''
								}
							],
							'prepTime': {
								'hours': '',
								'minutes': ''
							},		
							'cookTime': {
								'hours': '',
								'minutes': ''
							},
							'instancesInShoppingList': 0
						};
		$scope.origName = '';
		$scope.removable = false;
	}

	$scope.saveRecipe = function(recipe, form) {
		if(form.$valid) {
			RecipeData.saveRecipe(recipe)
			.$promise
			.then(function(results) {
				if(results.saved) {
					$location.url('/recipes');
				} else {
					alert(results.results);
				}
			}).catch(function(response) {
				console.log(response);
			});	
		}	
	}
	
	$scope.addNewIngredientRow = function() {
		$scope.recipe.ingredients.push({
			'amount': '',
			'measurement': '',
			'ingredient': ''
		});
	}
	
	$scope.removeIngredientRow = function(element) {
		var ingredients = $scope.recipe.ingredients;
		var ind = ingredients.indexOf(element.ingredient);
		if(ind == -1) {
			console.log('Selected ingredient does not seem to be in the array of ingredients');
		} else if(ingredients.length != 1) {
			if(ind == 0) {
				ingredients.shift();
			} else if(ind == ingredients.length - 1) {
				ingredients.pop();
			} else {
				ingredients.splice(ind, 1);
			}
		} else {
			ingredients[0] = {
				'amount': '',
				'measurement': '',
				'ingredient': ''
			};
		}
		
	}
	
	$scope.addNewStepRow = function(element) {
		var steps = $scope.recipe.steps;
		var ind = steps.indexOf(element.step);
		var newStep = { 'step': '' };
		$scope.recipe.steps.splice(ind + 1, 0, newStep);
		console.log($scope.recipe.steps);
	}
	
	$scope.removeStepRow = function(element) {
		var steps = $scope.recipe.steps;
		var ind = steps.indexOf(element.step);
		if(ind == -1) {
			console.log('Selected step does not seem to be in the array of steps');
		} else if(steps.length != 1) {
			if(ind == 0) {
				steps.shift();
			} else if(ind == steps.length - 1) {
				steps.pop();
			} else {
				steps.splice(ind, 1);
			}
		} else {
			steps[0].step = '';
		}		
	}	
	
	$scope.upStepNumber = function(element) {
		var steps = $scope.recipe.steps;
		var ind = steps.indexOf(element.step);
		if(ind == -1) {
			console.log('Selected step does not seem to be in the array of steps');
		} else if(steps.length != 1) {
			if(ind != 0) {
				steps.splice(ind, 1);
				steps.splice(ind - 1, 0, element.step);
			}
		}
	}
	
	$scope.downStepNumber = function(element) {
		var steps = $scope.recipe.steps;
		var ind = steps.indexOf(element.step);
		if(ind == -1) {
			console.log('Selected step does not seem to be in the array of steps');
		} else if(steps.length != 1) {
			if(ind != steps.length - 1) {
				steps.splice(ind, 1);
				steps.splice(ind + 1, 0, element.step);
			}
		}
	}
	
	$scope.deleteRecipe = function(recipe) {
		if(confirm('This recipe will be deleted. This cannot be undone.')) {
			RecipeData.removeRecipe(recipe._id);
			$location.url('/recipes');
		}
		
	}
});
























