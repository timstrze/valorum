'use strict';

describe('Directive: programTerms', function () {

  // load the directive's module
  beforeEach(module('valorefyApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<program-terms></program-terms>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the programTerms directive');
  }));
});
