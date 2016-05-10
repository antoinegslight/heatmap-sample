'use strict';

import mongoose from 'mongoose';

var EventSchema = new mongoose.Schema({
  latitude: String,
  longitude: String,
  weight: Number
});

export default mongoose.model('Event', EventSchema);
