angular.module('meanCheckin')
  .controller('HomeCtrl', function ($scope, $http, socket, $location) {

    $scope.formData = {};

    $http.get('/api/attendees')
      .success(function(data) {
        $scope.attendees = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

    $scope.createAttendee = function() {
      $http.post('/api/attendees', $scope.formData)
        .success(function(data) {
          $scope.formData = {};
          $scope.attendees = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    $scope.deleteAttendee = function(id) {
      $http.delete('/api/attendees/' + id)
        .success(function(data) {
          $scope.attendees = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    $scope.messages = [];
    $scope.checkinMessages = [];

    $scope.alertCheckin = function(attendee) {
      $scope.checkinMessages.unshift({firstName: attendee.firstName, lastName: attendee.lastName, checkedIn: attendee.checkedIn});
    }

    socket.on('send:checkin', function (attendee) {
      console.log(attendee);
      $scope.alertCheckin(attendee);

      angular.forEach($scope.attendees, function(currAttendee) {
        if(currAttendee._id == attendee._id) currAttendee.checkedIn = attendee.checkedIn;
      });
    });

    $scope.checkin = function (attendee) {
      console.log(attendee);
      $scope.alertCheckin(attendee);
      socket.emit('send:checkin', attendee);
    };

    socket.on('send:message', function (message) {
      console.log(message);
      $scope.messages.push(message);
    });

    $scope.sendMessage = function () {
      console.log('emit message');
      socket.emit('send:message', {
        message: $scope.message
      });

      $scope.messages.push({
        text: $scope.message
      });
    };

    $scope.addNew = function() {
      $location.path('/addNew');
    }

    // angular-bootstrap

    $scope.selected = undefined;
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    // Any function returning a promise object can be used to load values asynchronously

  });
