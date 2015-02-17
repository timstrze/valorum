'use strict';

/**
 * @ngdoc overview
 * @name valorumApp
 * @description
 * # valorumApp
 *
 * Main module of the application.
 */
angular
    .module('valorumApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
		'ui-rangeSlider',
		'ui.bootstrap',
		'ui.router'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
//        $routeProvider
//            .when('/', {
//                templateUrl: 'views/main.html',
//                controller: 'MainCtrl'
//            })
//            .when('/details', {
//                templateUrl: 'views/program-details.html',
//                controller: 'DetailsCtrl'
//            })
//            .when('/about', {
//                templateUrl: 'views/about.html',
//                controller: 'AboutCtrl'
//            })
//            .otherwise({
//                redirectTo: '/'
//            });

		// For any unmatched url, redirect to /state1
		$urlRouterProvider.otherwise("/");

		$stateProvider
			.state('home', {
				url: "/",
				templateUrl: "views/main.html",
				controller: 'MainCtrl'
			})
			.state('details', {
				url: "/details",
				templateUrl: "views/program-details.html",
				controller: 'DetailsCtrl'

//				controller: function($scope) {
//					$scope.items = ["A", "List", "Of", "Items"];
//				}
			});
//			.state('state2', {
//				url: "/state2",
//				templateUrl: "partials/state2.html"
//			})
//			.state('state2.list', {
//				url: "/list",
//				templateUrl: "partials/state2.list.html",
//				controller: function($scope) {
//					$scope.things = ["A", "Set", "Of", "Things"];
//				}
//			});
    });
