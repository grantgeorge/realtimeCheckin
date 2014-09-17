angular.module('meanCheckin')
  .controller('AddNewCtrl', function ($scope, $http, $location) {

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
      $scope.formData.fullName = $scope.formData.firstName + ' ' + $scope.formData.lastName;
      $scope.formData.checkedIn = false;
      $scope.formData.preRegistered = false;
      $scope.formData.checkinTime = undefined;
      console.log($scope.formData.fullName);
      $http.post('/api/attendees', $scope.formData)
        .success(function(data) {
          $scope.formData = {};
          $scope.attendees = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
        $location.path('/');
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

    $scope.goBack = function() {
      $location.path('/');
    };

    $scope.messages = [];
    $scope.checkinMessages = [];

  });
