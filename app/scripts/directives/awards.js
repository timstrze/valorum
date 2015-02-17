'use strict';

/**
 * @ngdoc directive
 * @name valorumApp.directive:awards
 * @description
 * # awards
 */
angular.module('valorumApp')
	.directive('awards', function () {
		return {
			templateUrl: '../views/directives/awards.html',
			restrict: 'E',
			scope: {
				groups: '=',
				max: '='
			},
			link: function postLink(scope, element, attrs) {

			},
			controller: function($scope) {
				$scope.goToPoint = function(group) {
					$scope.max = group.threshold;
				}
			}
		};
	});
