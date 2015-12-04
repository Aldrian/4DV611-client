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
  .controller('EventsCtrl', function($log, $scope, EventFetching, $ionicLoading) {

    // Setup the loader
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });


    var eventPromise = EventFetching.getEvents();

    eventPromise.then(function(data) {
      $log.log('Events recieved : ');
      $log.log(data);
      $scope.events = data;
      //Hide loader
      $ionicLoading.hide();
    });

    $scope.getOfferImageAddress = function(endpoint) {
      return EventFetching.apiHost + endpoint;
    };
  });
