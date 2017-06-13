var mongoose = require('mongoose');
var id = mongoose.Types.Objectid;
var Schema = mongoose.Schema;

//Device Schema
var deviceSchema = new Schema({
  d_key: {
    type: String
  },
  d_type: {
    airpulse: {
      type: Boolean,
      default: false
    },
    heatpulse: {
      type: Boolean,
      default: false
    },
    waterpulse: {
      type: Boolean,
      default: false
    }
  },
  fid: {
    type: Schema.Types.ObjectId, ref: 'Properties.floor.filters'
  },
  hw_version: {
    type: String
  },
  fw_version: {
    type: String
  }
});

var devices = module.exports = mongoose.model('devices', deviceSchema);

module.exports.getDevices = (callback, limit) => {
  devices.find(callback).limit(limit);
};

module.exports.getDeviceById = (id, callback) => {
  devices.findById(id, callback);
};

module.exports.addDevice = (device, callback) => {
  devices.create(device, callback);
};

module.exports.updateDevice = (id, device, options, callback) => {
  var query = {};
  var update = {
    d_key: device.d_key,
    d_type: device.d_type,
    fid: device.fid,
    hw_version: device.hw_version,
    fw_version: device.fw_version
  };
  devices.findOneAndUpdate(query, update, {upsert: true}, callback);
};

module.exports.removeDevice = (id, callback) => {
  var query = {_id: id};
  devices.remove(query, callback);
};
