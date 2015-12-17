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
  .controller('EventsCtrl', function($log, $scope, EventFetching, $ionicLoading, localStorageService, $rootScope, $state) {
    $log.log('EventsCtrl loaded');
    $rootScope.viewName = 'events';

    $rootScope.$on('notificationOpened', function(event, data) {
      $log.log('Event notificationOpened recieved : ' + data);
      $state.go('main.eventDetail', {
        event: data
      });
    });
    var storedRacetracks = localStorageService.get('racetracks');


    var selectedRacetrack = function(racetrack) {
      if (storedRacetracks.indexOf(racetrack.track.id) === -1) {
        return false;
      } else {
        return true;
      }
    };

    // Setup the loader
    $ionicLoading.show({
      template: '<section class="ctnr"> <div class="ldr">  <div class="ldr-blk"></div>   <div class="ldr-blk an_delay"></div>  <div class="ldr-blk an_delay"></div>   <div class="ldr-blk"></div>  </div></section>',
      content: 'Loading',
      showBackdrop: false,
      maxWidth: 400,
      showDelay: 0
    });

    $scope.doRefresh = function() {
      storedRacetracks = localStorageService.get('racetracks');

      EventFetching.getEvents().then(function(data) {
        $log.log('Events recieved : ');
        $log.log(data);
        $scope.events = data.filter(selectedRacetrack);
        $scope.eventCount = $scope.events.length;
      }).finally(function() {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

    var eventPromise = EventFetching.getEvents();

    eventPromise.then(function(data) {
      $log.log('Events recieved : ');
      $log.log(data);
      $scope.events = data.filter(selectedRacetrack);
      $scope.eventCount = $scope.events.length;
      //Hide loader
      $ionicLoading.hide();
    });
    $scope.getOfferImageAddress = function(endpoint) {
      return EventFetching.apiHost + endpoint;
    };


  });
