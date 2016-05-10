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

import Event from '../api/event/event.model';

Event.find({}).remove()
  .then(() => {
    list.forEach(function(elem){
      var arg = elem.split(';');
      Event.create(
          {
            weight: arg[0],
            latitude: arg[1],
            longitude: arg[2]
          }
      );
    });
  });
