#How to make this work:

-Step One:

-Open command line and run 'npm install' to install Dependencies
-In command line, type 'mongo'
-Run the following commands within the MongoDB CLI:

  -db.createCollection('users')
  -db.createCollection('properties')
  -db.createCollection('userAccounts')
  -db.createCollection('devices')
  -db.createCollection('events')
  -db.createCollection('rawMeasurementData')
  -db.createCollection('CCID')


#You should now be able to make calls to the db per the routes established in the app.js file
# alxdb
