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
    console.log(this.selectedId);
  };

  isCollapsed = true;
  //end-non-standard

  constructor() {
    }
}

angular.module('heatmapSampleApp')
  .controller('NavbarController', [NavbarController]);
