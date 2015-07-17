'use strict';

describe('Service: Poll', function () {

  // load the service's module
  beforeEach(module('workspaceApp'));

  // instantiate service
  var poll;
  beforeEach(inject(function (_Poll_) {
    Poll = _Poll_;
  }));

  it('should do something', function () {
    expect(!!Poll).toBe(true);
  });

});
