/**
 * Controller managing the Event details
 * The associated template is event-expended.html
 * Once initialialised (the user have clicked an event generated through the
 * ng-repeat loop in event-list.html, fetch the associaded object passed with the link
 * (ui.sref)
 * @see ng-repeat paramaters and associated route in main.js
 */
'use strict';
angular.module('main')
.controller('EventExpendedCtrl', function ($scope, $stateParams, $log) {
  $scope.event = $stateParams.event;

});
