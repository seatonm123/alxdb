var mongoose = require('mongoose');
require('mongoose-long')(mongoose);
require('mongoose-double')(mongoose);
var id = mongoose.Types.Objectid;
var Schema = mongoose.Schema;
var Long = mongoose.Types.Long;
var Double = mongoose.Types.Double;

var ccidSchema = new Schema({
  property: {
    type: Schema.Types.ObjectId,
    ref: 'Properties'
  },
  fid: {
    type: Schema.Types.ObjectId,
    ref: 'Properties.floor.filters'
  },
  timestamp: {
    type: Long
  },
  duration: {
    1: {
      type: Boolean,
      default: false
    },
    7: {
      type: Boolean,
      default: false
    },
    30: {
      type: Boolean,
      default: false
    }
  },
  duty_cycle: {
    type: Double,
  },
  filter_status: {
    type: Double
  },
  efficiency: {
    type: Double
  },
  mold: {
    type: Double
  }
});

var cCID = module.exports = mongoose.model('CCID', ccidSchema);

module.exports.getCcid = (callback, limit) => {
  cCID.find(callback).limit(limit);
};

module.exports.getCcidById = (id, callback) => {
  cCID.findById(id, callback);
};

module.exports.addCcid = (ccid, callback) => {
  cCID.create(ccid, callback);
};

module.exports.updateCcid = (id, ccid, options, callback) => {
  var query = {};
  var update = {
    property: ccid.property,
    fid: ccid.fid,
    timestamp: ccid.timestamp,
    duration: ccid.duration,
    duty_cycle: ccid.duty_cycle,
    filter_status: ccid.filter_status,
    efficiency: ccid.efficiency,
    mold: ccid.mold
  };
  cCID.findOneAndUpdate(query, update, {upsert: true}, callback);
};

module.exports.removeCcid = (id, callback) => {
  var query = {_id: id};
  cCID.remove(query, callback);
};
