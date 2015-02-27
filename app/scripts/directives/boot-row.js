'use strict';

/**
 * @ngdoc directive
 * @name valorefyApp.directive:bootRow
 * @description
 * # bootRow
 */
angular.module('valorefyApp')
    .directive('bootRow', function () {
        return {
            restrict: 'E',
            template: '<div class="row">' +
                '<div class="col-md-1">&nbsp;</div>' +
                '<div class="col-md-1">&nbsp;</div>' +
                '<div class="col-md-1">&nbsp;</div>' +
                '<div class="col-md-1">&nbsp;</div>' +
                '<div class="col-md-1">&nbsp;</div>' +
                '<div class="col-md-1">&nbsp;</div>' +
                '<div class="col-md-1">&nbsp;</div>' +
                '<div class="col-md-1">&nbsp;</div>' +
                '<div class="col-md-1">&nbsp;</div>' +
                '<div class="col-md-1">&nbsp;</div>' +
                '<div class="col-md-1">&nbsp;</div>' +
                '<div class="col-md-1">&nbsp;</div>' +
                '</div>'
        };
    });
