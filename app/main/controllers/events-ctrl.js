/**
 * Event controller
 * Instanciated once we go to the main view
 * Fill the scope.event object with the results got from the EventFetching service,
 * allowing us to iterate on the object using ng-repeat and call as many
 * event-item directive as needed
 * Display the event-list template
 */
'use strict';
angular.module('main')
.controller('EventsCtrl', function ($log, $scope, EventFetching) {

  $log.log('Hello from your Controller: EventsCtrl in module main:. This is your controller:', this);

  $scope.events = EventFetching.mockEvents();
});
