/**
 * @ngdoc service
 * @name valorumApp.service:TypeAhead
 * @module services
 * @kind function
 *
 * @description
 * TypeAhead service
 */

'use strict';

angular.module('valorumApp')
	.factory('TypeAhead', function ($http) {
		return {

			/**
			 * @ngdoc function
			 * @name TypeAhead.getSkills
			 * @methodOf valorumApp.service:TypeAhead
			 *
			 * @description
			 * Populate the type-ahead for searching Institutions
			 *
			 * @param {String} searchVal The search term to use
			 */
			getSkills: function (searchVal) {
				// Only search if search has at least three letters
				if (searchVal && searchVal.length > 2) {
					// Return a promise
					return $http.get('json/skill-search.json', {
						params: {
							name: searchVal
						}
					}).then(function (res) {
						var skills = [];
						angular.forEach(res.data.skills, function (item) {
							// Cast the data for the type-ahead
							skills.push({
								name: item.name,
								score: item.score
							});
						});
						return skills;
					});
				} else {
					return [];
				}
			},

			/**
			 * @ngdoc function
			 * @name TypeAhead.getProgramVersion
			 * @methodOf valorumApp.service:TypeAhead
			 *
			 * @description
			 * Populate the type-ahead for searching Program Versions
			 *
			 * @param {String} searchVal The search term to use
			 */
			getProgramVersion: function (searchVal) {
				// Only search if searchVal has at least three letters
				if (searchVal && searchVal.length > 2) {
					return $http.get('json/programs.json', {
						params: {
							ProgramVersionName: searchVal
						}
					}).then(function (res) {
						return res.data.programs;
					});
				} else {
					return [];
				}
			}
		};
	});
