'use strict';

/**
 * @ngdoc directive
 * @name valorefyApp.directive:programTerms
 * @description
 * # programTerms
 */
angular.module('valorefyApp')
    .directive('programTerms', function () {
        return {
            scope: {
                selectedTermIndex: '=',
				previousSkills: '=',
                selectedTerm: '=',
                programTerms: '=',
                changeTerm: '='
            },
            templateUrl: 'views/directives/program-terms.html',
            restrict: 'E'
        };
    });
