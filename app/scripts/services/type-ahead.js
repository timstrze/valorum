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
			 * @name TypeAhead.getInstitution
			 * @methodOf valorumApp.service:TypeAhead
			 *
			 * @description
			 * Populate the type-ahead for searching Institutions
			 *
			 * @param {String} searchVal The search term to use
			 */
			getInstitution: function (searchVal) {
				// Only search if search has at least three letters
				if (searchVal && searchVal.length > 2) {
					// Return a promise
					return $http.get('institutions', {
						params: {
							name: searchVal
						}
					}).then(function (res) {
						var colleges = [];
						angular.forEach(res.data, function (item) {
							// Cast the data for the type-ahead
							colleges.push({
								InstitutionID: item.AmCollegeID,
								Name: item.Name
							});
						});
						return colleges;
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
			},

			/**
			 * @ngdoc function
			 * @name TypeAhead.getCourseByTitleOrCode
			 * @methodOf valorumApp.service:TypeAhead
			 *
			 * @description
			 * Populate the type-ahead for searching Courses
			 *
			 * @param {String} searchVal The search term to use
			 */
			getCourseByTitleOrCode: function (searchVal) {
				return $http.get('Courses', {
					params: {
						MaxCount: 20,
						CampusVueCode: searchVal,
						title: searchVal
					}
				}).then(function (res) {
					return res;
				});
			}
		};
	});
