'use strict';

recipesApp.factory('util', function(){
	return {
		notImp: function() {
			alert('Not yet implemented');
		},
		getRandomInt: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	}
	
});