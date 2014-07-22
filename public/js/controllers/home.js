angular.module('meanCheckin')
  .controller('HomeCtrl', function ($scope, $http, socket) {

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

    socket.on('send:message', function (message) {
      console.log('message received');
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

  });