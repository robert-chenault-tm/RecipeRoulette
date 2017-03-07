'use strict';

recipesApp.factory('RecipeFilter', function() {
	
	function intersection(recipeTags, filterTags) {
		var intersect = recipeTags
				.filter(function(ele) {
					if(filterTags.indexOf(ele) !== -1) {
						return true;
					}
				}).filter(function(ele, index, arr) {
					return arr.indexOf(ele) === index;
				});
		return intersect;
	}
	
	function allGoodTags(recipeTags, goodTags) {
		if(recipeTags.length < goodTags.length) {
			return false;
		}
		if(goodTags.length == 0) {
			return true;
		}
		var intersect = intersection(recipeTags, goodTags);
		
		return intersect.length == goodTags.length;
	}
	
	function noBadTags(recipeTags, badTags) {
		if(badTags.length == 0) {
			return true;
		}
		var intersect = intersection(recipeTags, badTags);
		
		return intersect.length == 0;
	}
	
	return {
		applyFilters: function(recipes, filter) {
			var goodTags = filter.goodTags.map(function(obj) { return obj.val; });
			var badTags = filter.badTags.map(function(obj) { return obj.val; });
			var recipeTags;
			recipes = recipes.filter(function(recipe) {
				recipeTags = recipe.tags.map(function(obj) { return obj.val; });
				return allGoodTags(recipeTags, goodTags) && noBadTags(recipeTags, badTags);
			});
			return recipes;
		}
	}
	
});