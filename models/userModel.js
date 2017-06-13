var mongoose = require('mongoose');
var id = mongoose.Types.Objectid;
var Schema = mongoose.Schema;

//Account Schema
var accountSchema = new Schema({
  access: {user: Boolean, admin: Boolean}
});

//User Schema
var userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  passwd: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  accounts: [accountSchema]
});

var users = module.exports = mongoose.model('users', userSchema);

//Get All users
module.exports.getUsers = (callback, limit) => {
  users.find(callback).limit(limit);
};

//Get single user by id
module.exports.getUserById = (id, callback) => {
  users.findById(id, callback);
};

//Post new user
module.exports.addUser = (user, callback) => {
  users.create(user, callback);
};

//Update User
module.exports.updateUser = (id, user, options, callback) => {
  var query = {};
  var update = {
    name: user.name,
    user_name: user.user_name,
    passwd: user.passwd,
    email: user.email,
    accounts: user.accounts
  };
  users.findOneAndUpdate(query, update, options, callback);
};

//Delete User
module.exports.removeUser = (id, callback) => {
  var query = {_id: id};
  users.remove(query, callback);
};


//Get account by id
module.exports.getAccountById = (id, callback) => {
  var account = users.account.id(id);
};
