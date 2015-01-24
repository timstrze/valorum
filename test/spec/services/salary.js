'use strict';

describe('Service: salary', function () {

  // load the service's module
  beforeEach(module('visualizationApp'));

  // instantiate service
  var salary;
  beforeEach(inject(function (_salary_) {
    salary = _salary_;
  }));

  it('should do something', function () {
    expect(!!salary).toBe(true);
  });

});
