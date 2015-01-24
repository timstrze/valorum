'use strict';

/**
 * @ngdoc service
 * @name valorumApp.Salary
 * @description
 * # Skills
 * Factory in the valorumApp.
 */
angular.module('valorumApp')
	.factory('Salary', function ($resource) {
		// Public API here
		return {


			/**
			 * @ngdoc function
			 * @name Salary.getAll
			 * @methodOf valorumApp.service:Salary
			 *
			 * @description
			 * Get all and set the all object
			 *
			 */
			getAll: function() {
				var _this = this;
				this.http.get().$promise.then(function(response){
					_this.all = response.data;
				});
			},

			/**
			 * @ngdoc function
			 * @name Salary.http
			 * @methodOf valorumApp.service:Salary
			 *
			 * @description
			 * Public access to the GET, PUT, and POST methods
			 *
			 * @param {String} ID of program version
			 */
			http: $resource('json/salary.json/:id', {
				id: '@id'
			}, { //parameters default
				update: {
					method: 'PUT',
					params: {}
				},
				get: {
					method: 'GET',
					params: {
						id: '@id'
					}
				},
				post: {
					method: 'POST'
				}
			})
		};
	});
