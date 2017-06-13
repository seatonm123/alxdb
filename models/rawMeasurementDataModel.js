var mongoose = require('mongoose');
require('mongoose-long')(mongoose);
require('mongoose-double')(mongoose);
var id = mongoose.Types.Objectid;
var Schema = mongoose.Schema;
var Long = mongoose.Types.Long;
var Double = mongoose.Types.Double
var schemaTypes = mongoose.Schema.Types;
var Long = mongoose.Types.Long;
var Double = mongoose.Types.Double;

var rawMeasurementDataSchema = new Schema({
  fid: {
    type: Schema.Types.ObjectId,
    ref: 'Properties.floor.filters'
  },
  timestamp: {
    type: Long
  },
  pressure: {
    type: Double
  },
  delta_pressure: {
    type: Double
  },
  temperature: {
    type: Double
  },
  humidity: {
    type: Double
  },
  acoustic_power: {
    type: Double
  },
  batt: {
    type: Number
  }
});

var rawMeasurementData = module.exports = mongoose.model('rawMeasurementData', rawMeasurementDataSchema);

module.exports.getRMD = (callback, limit) => {
  rawMeasurementData.find(callback).limit(limit);
};

module.exports.getRMDById = (id, callback) => {
  rawMeasurementData.findById(id, callback);
};

module.exports.addRMD = (rMD, callback) => {
  rawMeasurementData.create(rMD, callback);
};

module.exports.updateRMD = (id, rMD, options, callback) => {
  var query = {};
  var update = {
    fid: rMD.fid,
    timestamp: rMD.timestamp,
    pressure: rMD.pressure,
    delta_pressure: rMD.delta_pressure,
    temperature: rMD.temperature,
    humidity: rMD.humidity,
    acoustic_power: rMD.acoustic_power,
    batt: rMD.batt
  };
  rawMeasurementData.findOneAndUpdate(query, update, {upsert: true}, callback);
};

module.exports.removeRMD = (id, callback) => {
  var query = {_id: id};
  rawMeasurementData.remove(query, callback);
};
