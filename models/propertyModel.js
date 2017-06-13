var mongoose = require('mongoose');
var id = mongoose.Types.Objectid;
var Schema = mongoose.Schema;

//Filter Schema
var filterSchema = new Schema({
  type: {
    type: String
  },
  size: {
    type: String
  },
  brand: {
    type: String
  },
  changed: {
    type: String
  },
  loacation: {
    type: String
  }
});

//Floor Schema
var floorSchema = new Schema({
  floor: {
    basement: {
      type: Boolean,
      default: false
    },
    first: {
      type: Boolean,
      default: false
    },
    second: {
      type: Boolean,
      default: false
    },
    third: {
      type: Boolean,
      default: false
    }
  },
  filters: [filterSchema]
});

//Property Schema
var propertySchema = new Schema({
  address: {
    type: String
  },
  name: {
    type: String
  },
  type: {
    single_family: {
      type: Boolean,
      default: false
    },
    apartment: {
      type: Boolean,
      default: false
    },
    business: {
      type: Boolean,
      default: false
    }
  },
  floors: {
    type: Number
  },
  size: {
    type: Number
  },
  built: {
    type: Number
  },
  renovation: {
    type: Number
  },
  floor: [floorSchema]
});

var properties = module.exports = mongoose.model('properties', propertySchema);

module.exports.getProperties = (callback, limit) => {
  properties.find(callback).limit(limit);
};

module.exports.getPropertyById = (id, callback) => {
  properties.findById(id, callback);
};

module.exports.addProperty = (property, callback) => {
  properties.create(property, callback);
};

module.exports.updateProperty = (id, property, options, callback) => {
  var query = {};
  var update = {
    address: property.address,
    name: property.name,
    type: property.type,
    floors: property.floors,
    size: property.size,
    built: property.built,
    renovation: property.renovation,
    floor: property.floor
  };
  console.log(property);
  properties.findOneAndUpdate(query, update, {upsert: true}, callback);
};

module.exports.removeProperty = (id, callback) => {
  var query = {_id: id};
  properties.remove(query, callback);
};
