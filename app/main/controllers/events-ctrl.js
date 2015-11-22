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
  .controller('EventsCtrl', function($log, $scope, $ionicModal, EventFetching) {

    $log.log('Hello from your Controller: EventsCtrl in module main:. This is your controller:', this);

    $scope.events = EventFetching.mockEvents();



    $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  });
