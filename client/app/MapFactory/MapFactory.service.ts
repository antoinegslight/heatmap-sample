'use strict';

angular.module('heatmapSampleApp')
  .factory('MapFactory', ['$http', 'socket', function ($http, socket) {

    var events = [];
    var newEvents = [];
    var heatArray = [];
    var styleArray = [{ "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }, { "weight": "0.20" }, { "lightness": "28" }, { "saturation": "23" }, { "visibility": "off" }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "color": "#494949" }, { "lightness": 13 }, { "visibility": "off" }] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#144b53" }, { "lightness": 14 }, { "weight": 1.4 }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#08304b" }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#0c4152" }, { "lightness": 5 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#0b434f" }, { "lightness": 25 }] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }] }, { "featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [{ "color": "#0b3d51" }, { "lightness": 16 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#000000" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "color": "#146474" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#021019" }] }]
    this.map =  { center: { latitude: 30, longitude: 0 },
                  zoom: 3,
                  options: {
                    styles: styleArray,
                    disableDefaultUI: true
                  },
                  showHeat: true,
                  marker: {
                    icon: {
                      path: google.maps.SymbolPath.CIRCLE,
                      fillColor: 'white',
                      fillOpacity: 1,
                      strokeColor: 'white',
                      strokeOpacity: 0.7,
                      strokeWeight: 2,
                      scale: 3
                    },
                    options: {
                      animation: google.maps.Animation.DROP
                    }
                  },
                  heatLayerCallback: function (layer) {
                    $http.get('/api/events').then(response => {
                    events = response.data;

                    socket.syncUpdates('event', events, function(event, item, object) {
                        console.log(event);
                        console.log(item);
                        newEvents.push({
                          id: item._id,
                          coords: {
                            latitude: item.latitude,
                            longitude: item.longitude
                          }
                        });
                        var newPoint = {
                          location: new google.maps.LatLng(item.latitude, item.longitude),
                          weight: item.weight
                        };
                        heatArray.push(newPoint);
                        layer.setData(heatArray);
                    });

                    events.forEach(function(event){
                      var newPoint = {
                        location: new google.maps.LatLng(event.latitude, event.longitude),
                        weight: event.weight
                      };
                      heatArray.push(newPoint);
                    });
                    layer.setData(heatArray);
                    layer.setOptions({
                      dissipating: true,
                      radius: 10,
                      opacity: 1,
                      maxIntensity: 100,
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
    // Public API here
    return {map: this.map, newEvents: newEvents};
  }]);
