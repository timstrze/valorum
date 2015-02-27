'use strict';

/**
 * @ngdoc service
 * @name valorefyApp.Skills
 * @description
 * # Skills
 * Factory in the valorefyApp.
 */
angular.module('valorefyApp')
	.factory('Skills', function ($resource, $http) {

		// Public API
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
					var _this = this;
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

						_this.searchedSkills = skills;

						return [];
					});
				} else {
					this.searchedSkills = null;
					return [];
				}
			},


			/**
			 * @ngdoc function
			 * @name Skills.http
			 * @methodOf valorefyApp.service:Skills
			 *
			 * @description
			 * Public access to the GET, PUT, and POST methods
			 *
			 * @param {String} ID of program version
			 */
			http: $resource('json/skills.json/:id', {
				id: '@id'
			}, { //parameters default
				get: {
					method: 'GET',
					params: {
						id: '@id'
					}
				}
			})
		};
	});
