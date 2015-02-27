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

		getNeeded: function(max) {
			var skills = [];

			angular.forEach(this.groups, function(group) {
				if(group.threshold >= max) {
					skills = skills.concat(group.skills);
				}
			});

			return skills;
		},

		getAcquiredDetailedSkills: function(max) {
			var flattened = {
				name: "Skills Earned",
				children: []
			};

			angular.forEach(this.groups, function(group){
				if(group.threshold <= max) {
					angular.forEach(group.skills, function(skill){
						flattened.children.push({
							className: skill,
							value: parseInt(group.threshold) + 10,
							packageName: group.name
						});
					});
				}
			});

			return flattened;
		},

		getAcquired: function(max) {
			var skills = [];

			angular.forEach(this.groups, function(group) {
				if(group.threshold <= max) {
					skills = skills.concat(group.skills);
				}
			});

			return skills;
		},

		getAllSkills: function() {
			var skills = [];

			angular.forEach(this.groups, function(group) {
				skills = skills.concat(group.skills);
			});

			return skills;
		},

		getGroups: function() {
			var _this = this;
			if(!this.groups) {
				this.http.get().$promise.then(function(response){
					_this.groups = response.groups;
					//return ["adsfad", "asdfasdf"];
				});
			}else{
				return this.groups;
			}

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
			post: {
				method: 'POST'
			}
		})
    };
  });
