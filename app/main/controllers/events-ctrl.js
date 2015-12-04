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
  .controller('EventsCtrl', function($log, $scope, EventFetching, $cordovaDevice) {

    $log.log('Hello from your Controller: EventsCtrl in module main:. This is your controller:', this);

    
    var eventPromise = EventFetching.getEvents();

    eventPromise.then(function(data) {
      $scope.events = data;
    });

    $scope.getOfferImageAddress = function(endpoint) {
      return EventFetching.apiHost + endpoint;
    };




  });
