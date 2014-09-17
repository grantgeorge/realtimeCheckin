'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/meanApp', function() {
	mongoose.connection.db.dropDatabase();

	var Attendee = mongoose.model('Attendee', {
	  firstName     : String,
	  lastName      : String,
	  fullName			: String,
	  checkedIn     : Boolean,
	  preRegistered : Boolean,
	  checkinTime   : Date,
	  updated       : Date,
	  created       : { type: Date, default: Date.now }
	});

	Attendee.create([{
	    firstName : "Grant",
	    lastName : "George",
	    fullName : 'Grant George',
	    checkedIn : false,
	    preRegistered : false,
	    checkinTime : null,
	    updated : new Date()
	},
	{
	    firstName : "Cory",
	    lastName : "Finger",
	    fullName : 'Cory Finger',
	    checkedIn : false,
	    preRegistered : false,
	    checkinTime : null,
	    updated : new Date()
	},
	{
	    firstName : "Conor",
	    lastName : "ODell",
	    fullName : 'Conor ODell',
	    checkedIn : false,
	    preRegistered : false,
	    checkinTime : null,
	    updated : new Date()
	},
	{
	    firstName : "Chris",
	    lastName : "Harris",
	    fullName : 'Chris Harris',
	    checkedIn : false,
	    preRegistered : false,
	    checkinTime : null,
	    updated : new Date()
	},
	{
	    firstName : "Chris",
	    lastName : "Freeley",
	    fullName : 'Chris Freeley',
	    checkedIn : false,
	    preRegistered : false,
	    checkinTime : null,
	    updated : new Date()
	},
	{
	    firstName : "Adam",
	    lastName : "Laughlin",
	    fullName : 'Adam Laughlin',
	    checkedIn : false,
	    preRegistered : false,
	    checkinTime : null,
	    updated : new Date()
	},
	{
	    firstName : "Chris",
	    lastName : "Getman",
	    fullName : 'Chris Getman',
	    checkedIn : false,
	    preRegistered : false,
	    checkinTime : null,
	    updated : new Date()
	},
	{
	    firstName : "Qiang",
	    lastName : "Fu",
	    fullName : 'Qiang Fu',
	    checkedIn : false,
	    preRegistered : false,
	    checkinTime : null,
	    updated : new Date()
	},
	{
	    firstName : "Vivian",
	    lastName : "Zhang",
	    fullName : 'Vivian Zhang',
	    checkedIn : false,
	    preRegistered : false,
	    checkinTime : null,
	    updated : new Date()
	},
	{
	    firstName : "Eugene",
	    lastName : "Antonevici",
	    fullName : 'Eugene Antonevici',
	    checkedIn : false,
	    preRegistered : false,
	    checkinTime : null,
	    updated : new Date()
	},
	{
	    firstName : "Frank",
	    lastName : "Sinatra",
	    fullName : 'Frank Sinatra',
	    checkedIn : false,
	    preRegistered : false,
	    checkinTime : null,
	    updated : new Date()
	},
	{
	    firstName : "Louis",
	    lastName : "Armstrong",
	    checkedIn : false,
	    preRegistered : false,
	    checkinTime : null,
	    updated : new Date()
	},
	{
	    firstName : "Leeroy",
	    lastName : "Jenkins",
	    checkedIn : false,
	    preRegistered : false,
	    checkinTime : null,
	    updated : new Date()
	}], function() {
		process.exit()
	});
});
