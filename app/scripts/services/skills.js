'use strict';

/**
 * @ngdoc service
 * @name valorumApp.Skills
 * @description
 * # Skills
 * Factory in the valorumApp.
 */
angular.module('valorumApp')
  .factory('Skills', function ($resource) {
    // Public API here
    return {

		getAllUnacquired: function(max) {
			var skills = [];
			angular.forEach(this.allList, function(group) {
				if(group.threshold >= max) {
					skills = skills.concat(group.skills);
				}
			});
			return skills;
		},

		getAllAcquired: function(max) {
			var skills = [];
			angular.forEach(this.allList, function(group) {
				if(group.threshold <= max) {
					skills = skills.concat(group.skills);
				}
			});
			return skills;
		},

		getAllList: function() {
			var _this = this;
			this.http.list().$promise.then(function(response){
				_this.allList = response.groups;
			});
		},

		getAll: function() {
			var _this = this;
			this.http.get().$promise.then(function(response){
				_this.all = {
					name: response.name,
					children: response.children
				};
			});
		},

		/**
		 * @ngdoc function
		 * @name Skills.http
		 * @methodOf valorumApp.service:Skills
		 *
		 * @description
		 * Public access to the GET, PUT, and POST methods
		 *
		 * @param {String} ID of program version
		 */
		http: $resource('json/skills.json/:id', {
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
			list: {
				url: 'json/skills-list.json',
				method: 'GET'
			},
			post: {
				method: 'POST'
			}
		})
    };
  });
