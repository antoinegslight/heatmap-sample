'use strict';

class NavbarController {
  //start-non-standard
  selectedId = 0;

  menu = [
    {'title': 'Blue', 'state': 'main'},
    {'title': 'Gray', 'state': 'main'},
    {'title': 'Dark', 'state': 'main'},
    {'title': 'Pale', 'state': 'main'}];

  setStyle = function(id){
    this.selectedId = id;
  };

  isCollapsed = true;
  //end-non-standard

  changeStyle = function(){
    switch(this.selectedId) {
    case 0:
        this.map.options.styles = this.map.styleBlue;
        break;
    case 1:
        this.map.options.styles = this.map.styleShadesOfGray;
        break;
    case 2:
        this.map.options.styles = this.map.styleDarkCatcher;
        break;
    case 3:
      this.map.options.styles = this.map.stylePale;
      break;
}
    if(this.selectedId == 0){

    } else if(this.selectedId == 1){

    }
  };

  constructor(MapFactory) {
    this.map = MapFactory;
    }
}

angular.module('heatmapSampleApp')
  .controller('NavbarController', ['MapFactory', NavbarController]);
