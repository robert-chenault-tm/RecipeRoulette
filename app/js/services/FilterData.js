'use strict';

recipesApp.factory('FilterData', function($resource){
	var resource = $resource('/data/filter/');
	
	return {
		getFilter: function() {
			return resource.get();
		},
		saveFilter: function(filter) {
			return resource.save(filter);
		}
	}
});