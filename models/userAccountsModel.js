var mongoose = require('mongoose');
var id = mongoose.Types.Objectid;
var Schema = mongoose.Schema;

var userAccountSchema = new Schema({
  type: {
    family: {
      type: Boolean,
      default: false
    },
    service: {
      type: Boolean,
      default: false
    }
  },
  access: {
    view: {
      type: Boolean,
      default: true
    },
    user: {
      type: Boolean,
      default: false
    },
    admin: {
      type: Boolean,
      default: false
    }
  }
});

var userAccounts = module.exports = mongoose.model('userAccounts', userAccountSchema);

module.exports.getUserAccounts = (callback, limit) => {
  userAccounts.find(callback).limit(limit);
};

module.exports.getUserAccountById = (id, callback) => {
  userAccounts.findById(id, callback);
};

module.exports.addUserAccount = (userAccount, callback) => {
  userAccounts.create(userAccount, callback);
};

module.exports.updateUserAccount = (id, userAccount, options, callback) => {
  var query = {};
  var update = {
    type: userAccount.type,
    service: userAccount.service,
    access: userAccount.access
  };
  console.log(update);
  userAccounts.findOneAndUpdate(query, update, {upsert: true}, callback);
};

module.exports.removeUserAccount = (id, callback) => {
  var query = {_id: id};
  userAccounts.remove(query, callback);
}
