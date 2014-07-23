'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/meanShit', function() {
	mongoose.connection.db.dropDatabase();

	var Attendee = mongoose.model('Attendee', {
	  firstName     : String,
	  lastName      : String,
	  checkedIn     : Boolean,
	  preRegistered : Boolean,
	  checkinTime   : Date,
	  updated       : Date,
	  created       : { type: Date, default: Date.now }
	});

	Attendee.create([{
	    firstName : "Grant",
	    lastName : "George",
	    checkedIn : false,
	    preRegistered : false,
	    checkinTime : null,
	    updated : new Date()
	},
	{
	    firstName : "Cory",
	    lastName : "Finger",
	    checkedIn : false,
	    preRegistered : false,
	    checkinTime : null,
	    updated : new Date()
	}], function() {
		process.exit()
	});
});