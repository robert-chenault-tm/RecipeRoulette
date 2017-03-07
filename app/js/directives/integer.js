'use strict';

recipesApp.directive('integer', function() {
	return {
		require: 'ngModel',
		link: function(scope, element, attr, ctrl) {
			ctrl.$parsers.unshift(function(val){
				return parseInt(val, 10);
			})
		}
	}
});