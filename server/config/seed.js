/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var fs = require('fs');
var list = [];
fs.readFile(__dirname + '/data.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log("--->" + err);
  }
  var i = 0;
  var j = 0;
  list = data.split('\n');
});

import Coordinates from '../api/coordinates/coordinates.model';

  Coordinates.find({}).remove()
    .then(() => {
      list.forEach(function(elem){
        var arg = elem.split(';');
        Coordinates.create(
            {
              latitude: arg[1],
              longitude: arg[2]
            }
        );
      });
    });
