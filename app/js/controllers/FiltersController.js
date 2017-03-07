'use strict';

recipesApp.controller('FiltersController', function($scope, $location, FilterData) {
	FilterData.getFilter()
			.$promise
			.then(function(filter) {
				$scope.filter = filter;
				if($scope.filter.goodTags.length == 0){
					$scope.filter.goodTags.push({'val':''});
				}
				if($scope.filter.badTags.length == 0){
					$scope.filter.badTags.push({'val':''});
				}
			})
			.catch(function(response){
				console.log(response);
			});
	$scope.removeTag = function(element, type) {
		var tags;
		if(type == 'good') {
			tags = $scope.filter.goodTags;
		} else {
			tags = $scope.filter.badTags;
		}
		var ind = tags.indexOf(element.tag);
		if(ind == -1) {
			console.log('Selected tag does not seem to be in the array of tags');
		} else if(tags.length != 1) {
			if(ind == 0) {
				tags.shift();
			} else if(ind == tags.length - 1) {
				tags.pop();
			} else {
				tags.splice(ind, 1);
			}
		} else {
			tags[0].val = '';
		}
	}
	$scope.addTag = function(type){
		if(type == 'good')  {
			$scope.filter.goodTags.push({'val':''});
		} else if(type == 'bad') {
			$scope.filter.badTags.push({'val':''});
		} else {
			console.log('Invalid tag type');
		}
	}
	$scope.saveFilter = function(filter) {
		filter.goodTags = filter.goodTags.filter(function(obj){ return obj.val != ''; });
		filter.goodTags = filter.goodTags.map(function(obj) {
				obj.val = obj.val.toLowerCase();
				return obj;
			});
		filter.badTags = filter.badTags.filter(function(obj){ return obj.val != ''; });
		filter.badTags = filter.badTags.map(function(obj) {
				obj.val = obj.val.toLowerCase();
				return obj;
			});
		
		FilterData.saveFilter(filter);
		$location.url('/');
	}
});