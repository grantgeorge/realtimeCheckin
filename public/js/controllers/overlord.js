angular.module('meanCheckin')
  .controller('OverlordCtrl', function ($scope, $http, socket, $location, $timeout) {

    $scope.numberOfRegistrants = 0;
    $scope.numberOfCheckins = 0;

    $http.get('/api/attendees')
      .success(function(data) {
        $scope.attendees = data;
        $scope.numberOfRegistrants = $scope.attendees.length;
        angular.forEach($scope.attendees, function(attendee){
          if(attendee.checkedIn === true){
            $scope.numberOfCheckins = $scope.numberOfCheckins + 1;
          }
        });
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

    $scope.messages = [];
    $scope.checkinMessages = [];

    $scope.alertCheckin = function(attendee) {
      $scope.checkinMessages.unshift({firstName: attendee.firstName, lastName: attendee.lastName, checkedIn: attendee.checkedIn});
      if(attendee.checkedIn = true){
        $scope.numberOfCheckins = $scope.numberOfCheckins + 1;
      }
      else {
        $scope.numberOfCheckins = $scope.numberOfCheckins - 1;
      }
      $timeout(function (){
        $scope.checkinMessages.splice($scope.checkinMessages.length-1, 1);
      }, 5000);
    };

    socket.on('send:checkin', function (attendee) {
      $scope.alertCheckin(attendee);
      angular.forEach($scope.attendees, function(currAttendee) {
        if(currAttendee._id == attendee._id) {
          currAttendee.checkedIn = attendee.checkedIn;
        }
      });
    });

    $scope.closeMessage = function(index) {
      $scope.checkinMessages.splice(index, 1);
    };

    $scope.goBack = function() {
      $location.path('/');
    };

  });
