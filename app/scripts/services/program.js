'use strict';

/**
 * @ngdoc service
 * @name valorumApp.Program
 * @description
 * # Program
 * Factory in the valorumApp.
 */
angular.module('valorumApp')
	.factory('Program', function () {
		// Public API here
		return {
			isSet: false,
			getDetails: function (item) {
				this.isSet = true;
			}
		};
	});
