'use strict';

angular.module('heatmapSampleApp')
  .directive('styleButton', function () {
    return {
      templateUrl: 'app/styleButton/styleButton.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
