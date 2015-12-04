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
  .controller('EventsCtrl', function($log, $scope, EventFetching, $cordovaDevice, LocalStorage, AccountManagement) {

    $log.log('Hello from your Controller: EventsCtrl in module main:. This is your controller:', this);

    var init = function() {
      $log.log('initializing device');

      if (!LocalStorage.get('registered')) {
        var uuid = null;
        try {
          // Get the UUID here, but don't work on desktop
          uuid = $cordovaDevice.getUUID();
        } catch (err) {
          $log.log('Error: ' + err.message);
        }

        AccountManagement.createUser(uuid).then(function(res) {
          if (res) {
            //Set the registered key in the localstorage to true
            LocalStorage.set('registred', true);
          } else {
            $log.log('Something happened');
          }
        });

      }
    };

    ionic.Platform.ready(function() {
      init();
    });

    var eventPromise = EventFetching.getEvents();

    eventPromise.then(function(data) {
      $scope.events = data;
    });

    $scope.getOfferImageAddress = function(endpoint) {
      return EventFetching.apiHost + endpoint;
    };




  });
