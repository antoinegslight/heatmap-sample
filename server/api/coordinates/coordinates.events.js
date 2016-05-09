/**
 * Coordinates model events
 */

'use strict';

import {EventEmitter} from 'events';
import Coordinates from './coordinates.model';
var CoordinatesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CoordinatesEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Coordinates.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CoordinatesEvents.emit(event + ':' + doc._id, doc);
    CoordinatesEvents.emit(event, doc);
  }
}

export default CoordinatesEvents;
