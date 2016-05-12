'use strict';

class NavbarController {
  //start-non-standard
  selectedId = 3;

  setStyle = function(id){
    this.selectedId = id;
  };

  isCollapsed = true;
  //end-non-standard

  changeStyle = function(){
    this.map.options.styles = this.map.styles[this.selectedId];
  };

  constructor(MapFactory) {
    this.map = MapFactory;
    var menu = [];
    this.map.styles.forEach(function(style){
      menu.push(style[0]);
      menu.state = 'main';
    });
    this.menu = menu;
  }
}

angular.module('heatmapSampleApp')
  .controller('NavbarController', ['MapFactory', NavbarController]);
