'use strict';

describe('Service: Skills', function () {

  // load the service's module
  beforeEach(module('valorefyApp'));

  // instantiate service
  var Skills;
  beforeEach(inject(function (_Skills_) {
    Skills = _Skills_;
  }));

  it('should do something', function () {
    expect(!!Skills).toBe(true);
  });

});
