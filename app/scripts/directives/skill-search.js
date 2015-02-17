'use strict';

/**
 * @ngdoc directive
 * @name valorumApp.directive:skillSearch
 * @description
 * # awards
 */
angular.module('valorumApp')
	.directive('skillSearch', function (TypeAhead) {
		return {
			templateUrl: '../views/directives/skill-search.html',
			restrict: 'E',
			scope: {
				max: '=',
				previousSkills: '='
			},
			controller: function($scope) {
				$scope.TypeAhead = TypeAhead;

				$scope.addSkill = function(skill) {
					$scope.previousSkills.push(skill.name);
				};
			}
		};
	});
