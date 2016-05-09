'use strict';

(function() {

class MainController {

  constructor($http) {
    this.$http = $http;
    this.eventLocations = [];
    var style = [
      {
        featureType: "all",
        stylers: [
         { saturation: -80 }
        ]
      },{
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          { hue: "#00ffee" },
          { saturation: 50 }
        ]
      },{
        featureType: "poi.business",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }
    ];
    this.map = { center: { latitude: 45, longitude: -73 }, zoom: 8, style: style };

  }

  $onInit() {
    this.$http.get('/api/coordinates').then(response => {
      this.eventLocations = response.data;
    });
  }
}

angular.module('heatmapApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
