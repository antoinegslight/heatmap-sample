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

    var self = this;
  }

  $onInit() {
    this.$http.get('/api/events').then(response => {
      this.events = response.data;
      this.socket.syncUpdates('event', this.awesomeThings);
    });
  }

  addThing() {
    if (this.newEvent) {
      this.$http.post('/api/events', { name: this.newEvent });
      this.newEvent = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/events/' + event._id);
  }
}

angular.module('heatmapSampleApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
