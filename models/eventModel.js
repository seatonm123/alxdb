var mongoose = require('mongoose');
var id = mongoose.Types.Objectid;
var Schema = mongoose.Schema;

var attachmentSchema = new Schema({
  type: {
    comment: {type: String, default: 'No comment'},
    file: {type: String, default: 'No file added'}
  },
  description: {
    type: String,
    default: 'No attachment description added.'
  },
  file: {
    type: String,
    default: 'No file added'
  }
});

var eventSchema = new Schema({
  property: {
    type: Schema.Types.ObjectId,
    ref: 'Properties'
  },
  floor: {
    type: Schema.Types.ObjectId,
    ref: 'Properties.floor'
  },
  filter: {
    type: Schema.Types.ObjectId,
    ref: 'Properties.floor.filter'
  },
  timestamp: {
    type: Date,
    default: new Date()
  },
  description: {
    type: String
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  attachments: [attachmentSchema]
});

var events = module.exports = mongoose.model('events', eventSchema);

module.exports.getEvents = (callback, limit) => {
  events.find(callback).limit(limit);
};

module.exports.getEventById = (id, callback) => {
  events.findById(id, callback);
};

module.exports.addEvent = (anEvent, callback) => {
  events.create(anEvent, callback);
};

module.exports.updateEvent = (id, anEvent, options, callback) => {
  var query = {};
  var update = {
    property: anEvent.property,
    floor: anEvent.floor,
    filter: anEvent.filter,
    timestamp: anEvent.timeStamp,
    description: anEvent.description,
    owner: anEvent.owner,
    attachments: anEvent.attachments
  };
  events.findOneAndUpdate(query, update, {upsert: true}, callback);
};

module.exports.removeEvent = (id, callback) => {
  var query = {_id: id};
  events.remove(query, callback);
};
