/**
 * Empty controller for the Config page
 * associated template : config.html
 */

'use strict';
angular.module('main')
  .controller('ConfigCtrl', function($log, $ionicModal, $ionicPlatform, Config, $window, $scope, localStorageService, EventFetching) {

    EventFetching.getRacetracks().then(function(data) {
      $scope.racetracks = data;
    });
    var storedRacetracks = localStorageService.get('racetracks');

    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $ionicModal.fromTemplateUrl('my-email-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.emailmodal = modal;
    });

    $scope.openEmailModal = function() {
      $scope.emailmodal.show();
    };
    $scope.closeeEmailModal = function() {
      $scope.emailmodal.hide();
    };
    $scope.openRacetracksModal = function() {
      $scope.modal.show();
    };
    $scope.isChecked = function(id) {
      if (storedRacetracks.indexOf(id) === -1) {
        return false;
      } else {
        return true;
      }
    };

    $scope.saveRacetracks = function() {
      var selectedRacetracks = [];
      //Forge the array of selected racetracks
      $scope.racetracks.forEach(function(racetrack) {
        if ($('#' + racetrack.id).find("input[type='checkbox']").is(":checked")) {
          selectedRacetracks.push(racetrack.id);
        }
      });
      if (selectedRacetracks == []) {
        //TODO :: Display an error message if nothing is selected
        return false;
      }
      //Record the choices in the Local storage and set selectedRacetracks to true
      localStorageService.set('racetracks', selectedRacetracks);
      localStorageService.set('registered', true);
      //Move on
      $scope.closeModal();
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
