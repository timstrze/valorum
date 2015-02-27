'use strict';

/**
 * @ngdoc service
 * @name valorumApp.Student
 * @description
 * # Student
 * Factory in the valorumApp.
 */
angular.module('valorumApp')
  .factory('Student', function (Skills, RichObjectModel) {
		return {
			max: 30,
			previousSkills: ["mets", "instructors", "communication", "critical reading", "texts"],

			getAll: function() {
				//if(Skills.getAllSkills()) {
//					debugger;
					//return Skills.getAllSkills();//.concat(this.previousSkills);
				//}
			}
		};
  });
