/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Coordinates from '../api/coordinates/coordinates.model';

  Coordinates.find({}).remove()
    .then(() => {
      Coordinates.create(
      {
        latitude: '40.712070',
        longitude: '-74.005350'
      },
      {
        latitude: '42.712070',
        longitude: '-75.005350'
      });
    });
