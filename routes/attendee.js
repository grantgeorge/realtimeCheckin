var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/meanShit');

var Attendee = mongoose.model('Attendee', {
  firstName     : String,
  lastName      : String,
  checkedIn     : Boolean,
  preRegistered : Boolean,
  checkinTime   : Date,
  updated       : Date,
  created       : { type: Date, default: Date.now }
});