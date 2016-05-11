'use strict';

(function() {

class MainController {

  constructor($http, $scope, socket, MapFactory) {
    this.$http = $http;
    this.socket = socket;
    this.events = [];
    this.map = MapFactory;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('event');
    });

  }

  $onInit() {
    /*this.$http.get('/api/events').then(response => {
      this.events = response.data;
      this.socket.syncUpdates('event', this.events);
    });*/
  }
}

angular.module('heatmapSampleApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
