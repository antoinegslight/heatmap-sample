'use strict';

class NavbarController {
  //start-non-standard
  selectedId = 0;

  menu = [
    {'title': 'Style 1', 'state': 'main'},
    {'title': 'Style 2', 'state': 'main'},
    {'title': 'Style 3', 'state': 'main'}];

  setStyle = function(id){
    this.selectedId = id;
  };

  isCollapsed = true;
  //end-non-standard

  changeStyle = function(){
    if(this.selectedId == 0){
      this.map.showHeat = true;
    } else if(this.selectedId == 1){
      this.map.showHeat = false;
    }
  };

  constructor(MapFactory) {
    this.map = MapFactory.map;
    }
}

angular.module('heatmapSampleApp')
  .controller('NavbarController', ['MapFactory', NavbarController]);
