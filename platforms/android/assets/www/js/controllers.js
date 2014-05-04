'use strict';

/* Controllers */

angular.module('myApp.controllers', [])


.controller('MainController', ['$scope', 'Business', function($scope, Business) {

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(searchPosition);
    }

    function searchPosition(position) {
		Business.async(position).then(function(data) {
			$scope.businesses = data.businesses;
		});
	}

}])