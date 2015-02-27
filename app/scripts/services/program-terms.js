'use strict';

/**
 * @ngdoc service
 * @name valorefyApp.programTerms
 * @description
 * # programTerms
 * Factory in the valorefyApp.
 */
angular.module('valorefyApp')
    .factory('ProgramTerms', function ($resource) {

        return {
            http: $resource('json/program-terms.json', {
                id: '@id'
            }, {
                get: {
                    method: 'GET',
                    params: {
                        id: '@id'
                    }
                }
            })
        }

    });
