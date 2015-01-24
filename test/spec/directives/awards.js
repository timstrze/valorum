'use strict';

describe('Directive: awards', function () {

  // load the directive's module
  beforeEach(module('visualizationApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<awards></awards>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the awards directive');
  }));
});
