var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

app.use(bodyParser.json());

// Users = require('./models/userModel');
UserAccounts = require('./models/userAccountsModel')
Properties = require('./models/propertyModel');
Devices = require('./models/deviceModel');
Events = require('./models/eventModel');
rMD = require('./models/rawMeasurementDataModel');
ccid = require('./models/CCIDmodel.js');

Users = require('./routes/users.js')

app.use(Users);
app.use(cors);

mongoose.connect('https://breezi-dev-server.herokuapp.com');
var db = mongoose.connection;

//USERS
//Get all Users
// app.get('/users', (req, res, next) =>{
//   Users.getUsers((err, users) => {
//     if(err){
//       throw err;
//     }
//     res.json(users);
//   });
// });
//
// //Get User by Id
// app.get('/users/:_id', (req, res, next) => {
//   Users.getUserById(req.params._id, (err, user) =>{
//     if(err){
//       throw err;
//     }
//     res.json(user);
//   });
// });
//
// //Post a new User
// app.post('/users', (req, res, next) => {
//   var user = req.body;
//   Users.addUser(user, function(err, user){
//     if(err){
//       throw err;
//     }
//     res.json(user);
//   });
// });
//
// //Update a user
// app.put('/users/:_id', (req, res, next) => {
//   var id = req.params._id;
//   var user = req.body;
//   Users.updateUser(id, user, {}, (err, user) => {
//     if(err){
//       throw err;
//     }
//     res.json(user);
//     console.log(user._id);
//   });
// });
//
// //Delete a user
// app.delete('/users/:_id', (req, res, next) => {
//   var id = req.params._id;
//   Users.removeUser(id, (err, user) => {
//     if(err){
//       throw err;
//     }
//     res.send('Successfully Deleted');
//   });
// });
//
// //Get all Accounts by User
// app.get('/users/:_id/accounts', (req, res, next) => {
//   Users.getUserById(req.params._id, (err, user) =>{
//     if(err){
//       throw err;
//     }
//     res.json(user.accounts);
//   });
// });
//
// //Get Account by id
// app.get('/users/:_id/accounts/:account_id', (req, res, next) => {
//     Users.getUserById(req.params._id,  (err, user) => {
//       if(err){
//         throw err;
//       }
//       var account = user.accounts.id(req.params.account_id);
//       res.json(account);
//   });
// });
//
// // Add a new account
// app.put('/users/:_id/accounts', (req, res, next) => {
//     Users.getUserById(req.params._id,  (err, user) => {
//       if(err){
//         throw err;
//       }
//       var newAccount = req.body;
//       user.accounts.push(newAccount);
//       console.log(newAccount);
//       res.send('Account added');
//       user.save();
//     });
// });
//
// //Update an Account
// app.put('/users/:_id/accounts/:account_id', (req, res, next) => {
//   Users.getUserById(req.params._id, (err, user) => {
//     if(err){
//       throw err;
//     }
//     var account = user.accounts.id(req.params.account_id);
//     account.access = req.body.access;
//     res.json('Updated');
//     user.save();
//   });
// });
//
// //Delete an Account
// app.put('/users/:_id/accounts/:account_id/delete', (req, res, next) => {
//   Users.getUserById(req.params._id, (err, user) => {
//     if(err){
//       throw err;
//     }
//     var account = user.accounts.id(req.params.account_id);
//     user.accounts.remove(account);
//     user.save();
//     res.send('Account deleted');
//   });
// });

//USER accounts
//Get all User accounts
app.get('/userAccounts', (req, res, next) => {
  UserAccounts.getUserAccounts((err, userAccounts) => {
    if (err){
      throw err;
    }
    res.json(userAccounts);
  });
});

//Get User Account By id
app.get('/userAccounts/:_id', (req, res, next) => {
  UserAccounts.getUserAccountById(req.params._id, (err, userAccount) => {
    if(err){
      throw err;
    }
    res.json(userAccount);
  });
});

//Add a new User Account
app.post('/userAccounts', (req, res, next) => {
  var userAccount = req.body;
  UserAccounts.addUserAccount(userAccount, (err, userAccount) => {
    if(err){
      throw err;
    }
    res.json(userAccount);
  });
});

//Update a User Account
app.put('/userAccounts/:_id', (req, res, next) => {
  var id = req.params._id;
  var userAccount = req.body;
  UserAccounts.updateUserAccount(id, userAccount, {}, (err, userAccount) => {
    if(err){
      throw err;
    }
    res.json(userAccount);
  });
});

//Remove a User Account
app.delete('/userAccounts/:_id', (req, res, next) => {
  var id = req.params._id;
  UserAccounts.removeUserAccount(id, (err, userAccount) => {
    if(err){
      throw err;
    }
    res.send('Successfully Deleted');
  });
});

//PROPERTIES
//Get all Properties
app.get('/properties', (req, res, next) =>{
  Properties.getProperties((err, properties) => {
    if(err){
      throw err;
    }
    res.json(properties);
  });
});

//Get Property by id
app.get('/properties/:_id', (req, res, next) => {
  Properties.getPropertyById(req.params._id, (err, property) =>{
    if(err){
      throw err;
    }
    res.json(property);
  });
});

//Add a new Property
app.post('/properties', (req, res, next) => {
  var property = req.body;
  Properties.addProperty(property, (err, property) => {
    if(err){
      throw err;
    }
    res.json(property);
  });
});

//Update a Property
app.put('/properties/:_id', (req, res, next) => {
  var id = req.params._id;
  var property = req.body;
  Properties.updateProperty(id, property, {}, (err, property) => {
    if(err){
      throw err;
    }
    res.json(property);
  });
});

//Remove a Property
app.delete('/properties/:_id', (req, res, next) => {
  var id = req.params._id;
  Properties.removeProperty(id, (err, property) => {
    if(err){
      throw err;
    }
    res.send('Successfully Deleted');
  });
});

//Get all Floors by Property
app.get('/properties/:_id/floor', (req, res, next) => {
  Properties.getPropertyById(req.params._id, (err, property) =>{
    if(err){
      throw err;
    }
    res.json(property.floor);
  });
});

//Get Floor by id
app.get('/properties/:_id/floor/:floor_id', (req, res, next) => {
    Properties.getPropertyById(req.params._id,  (err, property) => {
      if(err){
        throw err;
      }
      var floor = property.floor.id(req.params.floor_id);
      res.json(floor);
  });
});

//Add a new Floor
app.put('/properties/:_id/floor', (req, res, next) => {
    Properties.getPropertyById(req.params._id,  (err, property) => {
      if(err){
        throw err;
      }
      var newFloor = req.body;
      property.floor.push(newFloor);
      console.log(newFloor);
      res.send('Floor added');
      property.save();
    });
});

//Update a Floor
app.put('/properties/:_id/floor/:floor_id', (req, res, next) => {
  Properties.getPropertyById(req.params._id, (err, property) => {
    if(err){
      throw err;
    }
    var floor = property.floor.id(req.params.floor_id);
    floor = req.body;
    res.send('Updated');
    property.save();
  });
});

//Delete a Floor
app.put('/properties/:_id/floor/:floor_id/delete', (req, res, next) => {
  Properties.getPropertyById(req.params._id, (err, property) => {
    if(err){
      throw err;
    }
    var floor = property.floor.id(req.params.floor_id);
    property.floor.remove(floor);
    property.save();
    res.send('Floor deleted');
  });
});

//Get all Filters by Floor
app.get('/properties/:_id/floor/:floor_id/filters', (req, res, next) => {
  Properties.getPropertyById(req.params._id, (err, property) => {
    if(err){
      throw err;
    }
    var floor = property.floor.id(req.params.floor_id);
    res.json(floor.filters);
  });
});

//Get Filter by id
app.get('/properties/:_id/floor/:floor_id/filters/:filter_id', (req, res, next) => {
    Properties.getPropertyById(req.params._id,  (err, property) => {
      if(err){
        throw err;
      }
      var floor = property.floor.id(req.params.floor_id);
      var filter = floor.filters.id(req.params.filter_id);
      res.json(filter);
  });
});

//Add a new Filter
app.put('/properties/:_id/floor/:floor_id/filters', (req, res, next) => {
    Properties.getPropertyById(req.params._id,  (err, property) => {
      if(err){
        throw err;
      }
      var floor = property.floor.id(req.params.floor_id);
      var newFilter = req.body;
      floor.filters.push(newFilter);
      res.send('Filter added');
      property.save();
    });
});

//Update a Filter
app.put('/properties/:_id/floor/:floor_id/filters/:filter_id', (req, res, next) => {
  Properties.getPropertyById(req.params._id, (err, property) => {
    if(err){
      throw err;
    }
    var floor = property.floor.id(req.params.floor_id);
    var filter = floor.filters.id(req.params.filter_id);
    floor.filters = req.body;
    res.send('Updated');
    property.save();
  });
});

//Delete a Filter
app.put('/properties/:_id/floor/:floor_id/filters/:filter_id/delete', (req, res, next) => {
  Properties.getPropertyById(req.params._id, (err, property) => {
    if(err){
      throw err;
    }
    var floor = property.floor.id(req.params.floor_id);
    var filter = floor.filters.id(req.params.filter_id);
    floor.filters.remove(filter);
    property.save();
    res.send('Filter deleted');
  });
});

//DEVICES
//Get all Devices
app.get('/devices', (req, res, next) => {
  Devices.getDevices((err, devices) => {
    if(err){
      throw err
    }
    res.json(devices);
  });
});

//Get Device by id
app.get('/devices/:_id', (req, res, next) => {
  Devices.getDeviceById(req.params._id, (err, device) => {
    if(err){
      throw err
    }
    res.json(device);
  });
});

//Add a new Device
app.post('/devices', (req, res, next) => {
  var device = req.body;
  Devices.addDevice(device, (err, device) => {
      if(err){
        throw err;
      }
      res.json(device);
  });
});

//Update a Device
app.put('/devices/:_id', (req, res, next) => {
  var id = req.params._id;
  var device = req.body;
  Devices.updateDevice(id, device, {}, (err, device) => {
    if(err){
      throw err;
    }
    res.json(device);
  });
});

//Remove a Device
app.delete('/devices/:_id', (req, res, next) => {
  var id = req.params._id;
  Devices.removeDevice(id, (err, device) => {
    if(err){
      throw err;
    }
    res.send('Successfully Deleted');
  });
});

//EVENTS
//Get all events
app.get('/events', (req, res, next) => {
  Events.getEvents((err, events) => {
    if(err){
      throw err
    }
    res.json(events);
  });
});

//Get an Event by id
app.get('/events/:_id', (req, res, next) => {
  Events.getEventById(req.params._id, (err, anEvent) => {
    if(err){
      throw err;
    }
    res.json(anEvent);
  });
});

//Add a new Event
app.post('/events', (req, res, next) => {
  var anEvent = req.body;
  Events.addEvent(anEvent, (err, anEvent) => {
      if(err){
        throw err;
      }
      res.json(anEvent);
  });
});

//Update an Event
app.put('/events/:_id', (req, res, next) => {
  var id = req.params._id;
  var thisEvent = req.body;
  Events.updateEvent(id, thisEvent, {}, (err, thisEvent) => {
    if(err){
      throw err;
    }
    thisEvent.save();
    res.json(thisEvent);
  });
});

//Remove an Event
app.delete('/events/:_id', (req, res, next) => {
  var id = req.params._id;
  Events.removeEvent(id, (err, anEvent) => {
    if(err){
      throw err;
    }
    res.send('Successfully Deleted');
  });
});

//Get all Attachments by Event
app.get('/events/:_id/attachments', (req, res, next) => {
  Events.getEventById(req.params._id, (err, anEvent) =>{
    if(err){
      throw err;
    }
    res.json(anEvent.attachments);
  });
});

//Get an Attachment by id
app.get('/events/:_id/attachments/:attachment_id', (req, res, next) => {
    Events.getEventById(req.params._id,  (err, anEvent) => {
      if(err){
        throw err;
      }
      var attachment = anEvent.attachments.id(req.params.attachment_id);
      res.json(attachment);
  });
});

//Add a New Attachment
app.put('/events/:_id/attachments', (req, res, next) => {
    Events.getEventById(req.params._id,  (err, anEvent) => {
      if(err){
        throw err;
      }
      var newAttachment = req.body;
      anEvent.attachments.push(newAttachment);
      res.send('Attachment added');
      anEvent.save();
    });
});

//Update an Attachment
app.put('/events/:_id/attachments/:attachment_id', (req, res, next) => {
  Events.getEventById(req.params._id, (err, anEvent) => {
    if(err){
      throw err;
    }
    var attachment = anEvent.attachments.id(req.params.attachment_id);
    anEvent.attachment = req.body;
    res.send('Updated');
    anEvent.save();
  });
});

//Remove an Attachment
app.put('/events/:_id/attachments/:attachment_id/delete', (req, res, next) => {
  Events.getEventById(req.params._id, (err, anEvent) => {
    if(err){
      throw err;
    }
    var attachment = anEvent.attachments.id(req.params.attachment_id);
    anEvent.attachments.remove(attachment);
    anEvent.save();
    res.send('Attachment deleted');
  });
});

//RAW MEASUREMENT DATA
//Get all rMD
app.get('/rawMeasurementData', (req, res, next) => {
  rMD.getRMD((err, rMDs) => {
    if(err){
      throw err
    }
    res.json(rMDs);
  });
});

//Get RMD by id
app.get('/rawMeasurementData/:_id', (req, res, next) => {
  rMD.getRMDById(req.params._id, (err, thisRMD) => {
    if(err){
      throw err;
    }
    res.json(thisRMD);
  });
});

//Add a new RMD
app.post('/rawMeasurementData', (req, res, next) => {
  var thisRMD = req.body;
  rMD.addRMD(thisRMD, (err, thisRMD) => {
      if(err){
        throw err;
      }
      res.json(thisRMD);
  });
});

//Update RMD
app.put('/rawMeasurementData/:_id', (req, res, next) => {
  var id = req.params._id;
  var thisRMD = req.body;
  rMD.updateRMD(id, thisRMD, {}, (err, thisRMD) => {
    if(err){
      throw err;
    }
    thisRMD.save();
    res.json(thisRMD);
  });
});

//Remove RMD
app.delete('/rawMeasurementData/:_id', (req, res, next) => {
  var id = req.params._id;
  rMD.removeRMD(id, (err, thisRMD) => {
    if(err){
      throw err;
    }
    res.send('Successfully Deleted');
  });
});
module.exports = app;

//CCID DATA PACKETS
//Get all CCID DP
app.get('/ccid', (req, res, next) => {
  ccid.getCcid((err, ccids) => {
    if(err){
      throw err
    }
    res.json(ccids);
  });
});

//Get RMD by id
app.get('/ccid/:_id', (req, res, next) => {
  ccid.getCcidById(req.params._id, (err, thisCcid) => {
    if(err){
      throw err;
    }
    res.json(thisCcid);
  });
});

//Add a new CCID
app.post('/ccid', (req, res, next) => {
  var thisCcid = req.body;
  ccid.addCcid(thisCcid, (err, thisCcid) => {
      if(err){
        throw err;
      }
      res.json(thisCcid);
  });
});

//Update CCID
app.put('/ccid/:_id', (req, res, next) => {
  var id = req.params._id;
  var thisCcid = req.body;
  ccid.updateCcid(id, thisCcid, {}, (err, thisCcid) => {
    if(err){
      throw err;
    }
    thisCcid.save();
    res.json(thisCcid);
  });
});

//Remove RMD
app.delete('/ccid/:_id', (req, res, next) => {
  var id = req.params._id;
  ccid.removeCcid(id, (err, thisCcid) => {
    if(err){
      throw err;
    }
    res.send('Successfully Deleted');
  });
});

module.exports = app;

app.listen(3000);
console.log('Connected');
