'use strict';

describe('Directive: styleButton', function () {

  // load the directive's module and view
  beforeEach(module('heatmapSampleApp'));
  beforeEach(module('app/styleButton/styleButton.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<style-button></style-button>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the styleButton directive');
  }));
});
