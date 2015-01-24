'use strict';

/**
 * @ngdoc function
 * @name valorumApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the valorumApp
 */
angular.module('valorumApp')
    .controller('AboutCtrl', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });
