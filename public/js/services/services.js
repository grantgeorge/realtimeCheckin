'use strict';

angular.module('meanCheckin').
  factory('socket', function (socketFactory) {
    return socketFactory();
  }).
  value('version', '0.1');