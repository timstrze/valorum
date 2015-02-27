'use strict';

/**
 * @ngdoc service
 * @name valorumApp.RichObjectModel
 * @description
 * # Program
 * Factory in the valorumApp.
 */
angular.module('valorumApp')
	.provider('RichObjectModel', function() {
		// Configuration
		var Configurer = {};
		Configurer.init = function(object, config) {

			console.log(object, config)
			debugger
			/**
			 * Those are HTTP safe methods for which there is no need to pass any data with the request.
			 */

			//object.configuration = config;




		};

		var globalConfiguration = {};

		Configurer.init(this, globalConfiguration);




	}
);
