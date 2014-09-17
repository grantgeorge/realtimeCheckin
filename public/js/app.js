'use strict';

angular.module('meanCheckin', [
  'ngRoute',
  'ngResource',
  'flatuiDirectives',
  'btford.socket-io',
  'ui.bootstrap'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    }).
    when('/view1', {
      templateUrl: 'views/home2',
      controller: 'HomeCtrl2'
    }).
    when('/addNew', {
      templateUrl: 'views/addNew.html',
      controller: 'AddNewCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
