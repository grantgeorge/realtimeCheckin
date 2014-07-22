var express = require('express'),
  http = require('http');

var app = module.exports = express();
var mongoose = require('mongoose');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// configuration =================

mongoose.connect('mongodb://localhost/meanShit');

// all environments
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

// routes ======================================================================

// sockets

// Socket.io Communication
io.sockets.on('connection', require('./routes/socket'));

io.on('connection', function(socket){
  console.log('a user connected');
});

// api ---------------------------------------------------------------------
// get all attendees
app.get('/api/attendees', function(req, res) {

  // use mongoose to get all attendees in the database
  Attendee.find(function(err, attendees) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err)

    res.json(attendees); // return all attendees in JSON format
  });
});

// create todo and send back all attendees after creation
app.post('/api/attendees', function(req, res) {

  // create a todo, information comes from AJAX request from Angular
  Attendee.create({
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    checkedIn : req.body.checkedIn,
    preRegistered : req.body.preRegistered,
    checkinTime : req.body.checkinTime,
    updated : new Date()
  }, function(err, todo) {
    if (err)
      res.send(err);

    // get and return all the attendees after you create another
    Attendee.find(function(err, attendees) {
      if (err)
        res.send(err)
      res.json(attendees);
    });
  });

});

// delete a todo
app.delete('/api/attendees/:attendee_id', function(req, res) {
  Attendee.remove({
    _id : req.params.attendee_id
  }, function(err, todo) {
    if (err)
      res.send(err);

    // get and return all the attendees after you create another
    Attendee.find(function(err, attendees) {
      if (err)
        res.send(err)
      res.json(attendees);
    });
  });
});

// application -------------------------------------------------------------
app.get('socket.io.js', function(req, res) {
  res.sendfile('./socket.io/socket.io.js');
});

// application -------------------------------------------------------------
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