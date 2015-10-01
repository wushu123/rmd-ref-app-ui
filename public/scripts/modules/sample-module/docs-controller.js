define(['angular', './sample-module'], function(angular, sampleModule) {
	'use strict';
	return sampleModule.controller('DocsCtrl', ['$scope', '$location', '$http',
		function($scope, $location, $http) {
		// $scope.context = $location.url();
		var mdFile = '/docs/'; // = 'https://github.build.ge.com/public/docs/';
		switch($location.url()) {
		case '/frontend':
			mdFile += 'frontEndDev.md';
			break;
		case '/services':
			mdFile += 'services.md';
			break;
		default:
			mdFile += 'overview.md';
		}
		$http.get(mdFile).then(function(response) {
			$scope.context.md = response.data;
		}, function(response) {
			console.log('error: ' + response);
		});
		$scope.context = { mdFile: mdFile };
	}]);
});