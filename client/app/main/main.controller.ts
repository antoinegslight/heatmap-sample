'use strict';

(function() {

  class MainController {

    constructor($http) {
      this.$http = $http;
      var eventLocations = [];

      var styleArray = [{ "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }, { "weight": "0.20" }, { "lightness": "28" }, { "saturation": "23" }, { "visibility": "off" }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "color": "#494949" }, { "lightness": 13 }, { "visibility": "off" }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#144b53" }, { "lightness": 14 }, { "weight": 1.4 }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#08304b" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#0c4152" }, { "lightness": 5 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#0b434f" }, { "lightness": 25 }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }] }, { "featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [{ "color": "#0b3d51" }, { "lightness": 16 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#000000" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "color": "#146474" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#021019" }] }]
      this.map =  { center: { latitude: 30, longitude: 0 },
                    zoom: 3,
                    options: {
                      styles: styleArray,
                      disableDefaultUI: true
                    },
                    showHeat: true,
                    heatLayerCallback: function (layer) {
                       $http.get('/api/coordinates').then(response => {
                        eventLocations = response.data;
                        var dataPoints = [];
                        eventLocations.forEach(function(event){
                          var newPoint = {
                            location: new google.maps.LatLng(event.latitude, event.longitude),
                            weight: event.weight
                          };
                          dataPoints.push(newPoint);
                        });
                        layer.setData(dataPoints);
                        layer.setOptions({
                          dissipating: true,
                          radius: 8,
                          opacity: 0.8,
                          maxIntensity: 300,
                          gradient: [
                          'rgba(0, 255, 255, 0)',
                          'rgba(0, 255, 255, 1)',
                          'rgba(0, 191, 255, 1)',
                          'rgba(0, 127, 255, 1)',
                          'rgba(0, 63, 255, 1)',
                          'rgba(0, 0, 255, 1)',
                          'rgba(0, 0, 223, 1)',
                          'rgba(0, 0, 191, 1)',
                          'rgba(0, 0, 159, 1)',
                          'rgba(0, 0, 127, 1)',
                          'rgba(63, 0, 91, 1)',
                          'rgba(127, 0, 63, 1)',
                          'rgba(191, 0, 31, 1)',
                          'rgba(255, 0, 0, 1)'
                          ]
                        });
                    })
                  }
    };
  }

    $onInit() {
    }
  }

  angular.module('heatmapApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });

})();
