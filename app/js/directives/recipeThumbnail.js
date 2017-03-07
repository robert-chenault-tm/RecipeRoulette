'use strict';

recipesApp.directive('recipeThumbnail', function() {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: "/templates/directives/recipeThumbnail.html",
		scope: {
			recipe: "=recipe"
		},
		controller: 'RecipeThumbnailController'
		
	};
	
	
});