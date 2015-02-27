'use strict';

describe('Service: programTerms', function () {

  // load the service's module
  beforeEach(module('valorefyApp'));

  // instantiate service
  var programTerms;
  beforeEach(inject(function (_programTerms_) {
    programTerms = _programTerms_;
  }));

  it('should do something', function () {
    expect(!!programTerms).toBe(true);
  });

});
