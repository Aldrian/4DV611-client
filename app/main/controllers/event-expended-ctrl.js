/**
 * Controller managing the Race details
 * The associated template is race.html
 * Once initialialised (the user have clicked an race generated through the
 * ng-repeat loop in event-expended.html, fetch the associaded object passed with the link
 * (ui.sref)
 * @see ng-repeat paramaters and associated route in main.js
 */
'use strict';
angular.module('main')
.controller('RaceCtrl', function ($scope, $stateParams, $log) {
  $scope.race = $stateParams.race;
  $log.log('Hello from your Controller: RaceCtrl in module main:. This is your controller:', this);

});
