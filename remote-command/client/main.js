var app = angular.module('app', ['ngTouch', 'ui.grid']);

app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
	$http({
		method: 'JSONP',
		url : "http://192.168.227.147:8080"+"?callback=angular.callbacks._0"
	})
	.success(function(data, status, headers, config) {
		$scope.myData = data.records;
	})
	.error(function(data, status, headers, config) {
		$scope.error = true;
	});
}]);

function callback (data) {
	return data;
}