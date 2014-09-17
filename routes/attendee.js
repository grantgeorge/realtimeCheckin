var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/meanApp');

var Attendee = mongoose.model('Attendee', {
  firstName     : String,
  lastName      : String,
  fullName      : String,
  checkedIn     : Boolean,
  preRegistered : Boolean,
  checkinTime   : Date,
  updated       : Date,
  created       : { type: Date, default: Date.now }
});
