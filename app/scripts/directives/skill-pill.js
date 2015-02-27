'use strict';

/**
 * @ngdoc directive
 * @name valorefyApp.directive:skillPill
 * @description
 * # skillPill
 */
angular.module('valorefyApp')
    .directive('skillPill', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<span class="label label-{{skillClass}}">{{skill}}</span>',
            scope: {
                skill: '=',
                type: '=',
                skillClass: '='
            },
            controller: function ($scope) {

                if ($scope.skill == undefined) {
                    //$scope.skill = 'dd';
                }
            }
        };
    });
