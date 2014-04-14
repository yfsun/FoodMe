'use strict';

/* Controllers */

angular.module('myApp.controllers', [])


.controller('MainController', ['$scope', 'Business', function($scope, Business) {
	Business.async().then(function(data) {
		$scope.businesses = data.businesses;
	});

}])