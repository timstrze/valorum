'use strict';

/**
 * @ngdoc directive
 * @name valorefyApp.directive:termDetails
 * @description
 * # termDetails
 */
angular.module('valorefyApp')
    .directive('termDetails', function () {
        return {
            scope: {
                selectedTerm: '=',
				accumulatedSkills: '='
            },
            templateUrl: 'views/directives/term-details.html',
            restrict: 'E'
        };
    });
