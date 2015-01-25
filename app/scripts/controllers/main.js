'use strict';

/**
 * @ngdoc function
 * @name valorumApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the valorumApp
 */
angular.module('valorumApp')
    .controller('MainCtrl', function ($scope, Student, Skills, Salary) {

		$scope.Student = Student;
		$scope.Salary = Salary;
		$scope.Skills = Skills;

		Salary.getAll();
		Skills.getAll();
    });
