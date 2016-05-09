'use strict';

import mongoose from 'mongoose';

var CoordinatesSchema = new mongoose.Schema({
  latitude: String,
  longitude: String
});

export default mongoose.model('Coordinates', CoordinatesSchema);
