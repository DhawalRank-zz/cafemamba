var mongoose = require('mongoose');
var dbUrl = 'mongodb://avengers:stark@ds227199.mlab.com:27199/cafemamba';
mongoose.Promise = require('bluebird');


var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 3000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 3000 } } };       

mongoose.connect(dbUrl, options);

//connection.on() --> listens to connection events
//@param: event, callback
mongoose.connection.on('connected', function(){
  console.log('Mongoose connected to: ', dbUrl);
});

mongoose.connection.on('disconnected', function(){
  console.log('Mongoose disconnected from: ', dbUrl);
});

mongoose.connection.on('error', function(error){
  console.log('Mongoose connection failed: ', error);
});

process.on('SIGINT', function(){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through app termination.');
    //exits process
    process.exit(0);
  });
});

process.on('SIGTERM', function(){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through app termination.');
    process.exit(0);
  });
});


//will be triggered only once
process.once('SIGUSR2', function(){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through app terminstion.');
    process.kill(process.pid, 'SIGUSR2');
  });
});

//require all the model schemas
require('./api/models/drinks.model.js');