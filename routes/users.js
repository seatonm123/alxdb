var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

const Users = require('../models/userModel.js');

// mongoose.connect('mongodb://localhost/breeziDev');
var db = mongoose.connection;

//Get all Users
app.get('/users', (req, res, next) => {
  Users.getUsers((err, users) => {
    if(err){
      throw err;
    }
    res.json(users);
  });
});

//Get User by Id

app.get('/users/:_id', (req, res, next) => {
  Users.getUserById(req.params._id, (err, user) =>{
    if(err){
      throw err;
    }
    res.json(user);
  });
});

//Post a new User
app.post('/users', (req, res, next) => {
  var user = req.body;
  Users.addUser(user, function(err, user){
    if(err){
      throw err;
    }
    res.json(user);
  });
});

//Update a user
app.put('/users/:_id', (req, res, next) => {
  var id = req.params._id;
  var user = req.body;
  Users.updateUser(id, user, {}, (err, user) => {
    if(err){
      throw err;
    }
    res.json(user);
  });
});

//Delete a user
app.delete('/users/:_id', (req, res, next) => {
  var id = req.params.id;
  Users.removeUser(id, (err, user) => {
    if(err){
      throw err;
    }
    res.send('Successfully Deleted');
  });
});

//Get all Accounts by User
app.get('/users/:_id/accounts', (req, res, next) => {
  Users.getUserById(req.params._id, (err, user) =>{
    if(err){
      throw err;
    }
    res.json(user.accounts);
  });
});

//Get Account by id
app.get('/users/:_id/accounts/:account_id', (req, res, next) => {
    Users.getUserById(req.params._id,  (err, user) => {
      if(err){
        throw err;
      }
      var account = user.accounts.id(req.params.account_id);
      res.json(account);
  });
});

// Add a new account
app.put('/users/:_id/accounts', (req, res, next) => {
    Users.getUserById(req.params._id,  (err, user) => {
      if(err){
        throw err;
      }
      var newAccount = req.body;
      user.accounts.push(newAccount);
      console.log(newAccount);
      res.send('Account added');
      user.save();
    });
});

//Update an Account
app.put('/users/:_id/accounts/:account_id', (req, res, next) => {
  Users.getUserById(req.params._id, (err, user) => {
    if(err){
      throw err;
    }
    var account = user.accounts.id(req.params.account_id);
    account.access = req.body.access;
    res.json('Updated');
    user.save();
  });
});

//Delete an Account
app.put('/users/:_id/accounts/:account_id/delete', (req, res, next) => {
  Users.getUserById(req.params._id, (err, user) => {
    if(err){
      throw err;
    }
    var account = user.accounts.id(req.params.account_id);
    user.accounts.remove(account);
    user.save();
    res.send('Account deleted');
  });
});

module.exports = app;
