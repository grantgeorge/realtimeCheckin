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
        $scope.addPoints($scope.numberOfCheckins);
        $scope.addPoints($scope.numberOfRegistrants);
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });

    $scope.messages = [];
    $scope.checkinMessages = [];

    $scope.alertCheckin = function(attendee) {
      console.log(attendee);
      $scope.checkinMessages.unshift({firstName: attendee.firstName, lastName: attendee.lastName, checkedIn: attendee.checkedIn});
      if(attendee.checkedIn === true){
        console.log('true');
        $scope.numberOfCheckins = $scope.numberOfCheckins + 1;
        $scope.chartConfig.series[0].data[0] = $scope.numberOfCheckins;
        console.log($scope.chartConfig.series);
      }
      else {
        console.log('false');
        $scope.numberOfCheckins = $scope.numberOfCheckins - 1;
        $scope.chartConfig.series[0].data[0] = $scope.numberOfCheckins;
        console.log($scope.chartConfig.series);
      }
      $timeout(function (){
        $scope.checkinMessages.splice($scope.checkinMessages.length-1, 1);
      }, 7500);
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

    // chart
    $scope.chartSeries = [
      {"name": "Some data", "data": [
      ]}
    ];

    $scope.addPoints = function (input) {
      var seriesArray = $scope.chartConfig.series;
      var idx = 0;
      seriesArray[idx].data = seriesArray[idx].data.concat([input])
    };

    $scope.chartConfig = {
      options: {
        chart: {
          type: 'pie'
        },
        plotOptions: {
          series: {
            stacking: ''
          }
        }
      },
      series: $scope.chartSeries,
      title: {
        text: 'Check-Ins'
      },
      credits: {
        enabled: true
      },
      loading: false,
      size: {}
    }

    $scope.reflow = function () {
      $scope.$broadcast('highchartsng.reflow');
    };

  });
