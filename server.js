'use strict';

var express = require('express'),
  http = require('http');

var app = module.exports = express();
var mongoose = require('mongoose');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// test git

// test a second git commit

mongoose.connect('mongodb://localhost/meanShit');

app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname + '/public'));
app.use(express.logger('dev'));
app.use(express.bodyParser());

var Attendee = mongoose.model('Attendee', {
  firstName     : String,
  lastName      : String,
  checkedIn     : Boolean,
  preRegistered : Boolean,
  checkinTime   : Date,
  updated       : Date,
  created       : { type: Date, default: Date.now }
});

io.sockets.on('connection', require('./routes/socket'));

io.on('connection', function(socket){
  console.log('a user connected');
});

app.get('/api/attendees', function(req, res) {

  Attendee.find(function(err, attendees) {

    if (err)
      res.send(err)

    res.json(attendees);
  });
});


app.post('/api/attendees', function(req, res) {

  Attendee.create({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    checkedIn : req.body.checkedIn,
    preRegistered : req.body.preRegistered,
    checkinTime : req.body.checkinTime,
    updated : new Date()
  }, function(err, attendee) {
    if (err)
      res.send(err);

    Attendee.find(function(err, attendees) {
      if (err)
        res.send(err)
      res.json(attendees);
    });
  });

});

app.put('/api/attendees/:attendee_id', function(req, res) {

  Attendee.update({ _id : req.params.attendee_id }, { $set: {
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      checkedIn : req.body.checkedIn,
      preRegistered : req.body.preRegistered,
      checkinTime : req.body.checkinTime,
      updated : new Date()
    }}, { multi: false }, function(err, numberAffected, raw) {
      console.log(numberAffected);
      if (err)
        res.send(err);

      Attendee.find(function(err, attendees) {
        if (err)
          res.send(err)
        res.json(attendees);
      })
  })

})

app.delete('/api/attendees/:attendee_id', function(req, res) {
  Attendee.remove({
    _id : req.params.attendee_id
  }, function(err, attendee) {
    if (err)
      res.send(err);

    Attendee.find(function(err, attendees) {
      if (err)
        res.send(err)
      res.json(attendees);
    });
  });
});

app.get('socket.io.js', function(req, res) {
  res.sendfile('./socket.io/socket.io.js');
});

app.get('*.js', function(req, res) {
  res.sendfile(req);
});

app.get('*.css', function(req, res) {
  res.sendfile(req);
});

app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
});

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});