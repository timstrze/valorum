'use strict';

/**
 * @ngdoc function
 * @name valorumApp.controller:DetailsCtrl
 * @description
 * # MainCtrl
 * Controller of the valorumApp
 */
angular.module('valorumApp')
    .controller('DetailsCtrl', function ($scope, $location, Student, Skills, Salary, TypeAhead, Program) {

		$scope.Program = Program;
		$scope.Student = Student;
		$scope.Salary = Salary;
		$scope.Skills = Skills;
		$scope.TypeAhead = TypeAhead;

		if(!Program.isSet) {
			$location.path("/");
		}

		$scope.getDetails = function (item) {
			Program.getDetails(item);
			Salary.getAll();
			Skills.getAll();
		}

    });
