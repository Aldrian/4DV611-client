/**
 * Empty controller for the Config page
 * associated template : config.html
 */

'use strict';
angular.module('main')
  .controller('ConfigCtrl', function($log, $ionicModal, $ionicPlatform, Config, $window, $scope, localStorageService, EventFetching, AccountManagement) {

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
    $scope.closeEmailModal = function() {
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
        if ($('#' + racetrack.id).find('input[type=\"checkbox\"]').is(":checked")) {
          selectedRacetracks.push(racetrack.id);
        }
      });
      if (selectedRacetracks === []) {
        //TODO :: Display an error message if nothing is selected
        return false;
      }
      //Record the choices in the Local storage and set selectedRacetracks to true
      localStorageService.set('racetracks', selectedRacetracks);
      //Move on
      $scope.closeModal();
    };
    $scope.saveEmail = function() {
      //Get email field value
      var email = $("#emailField").val();
      var uuid = localStorageService.get('uuid');
      if (uuid) {
        // We are on mobile and deviceid is registered, so we can send the email
        AccountManagement.addEmail(uuid, email).then(function(res) {
          if (res) {
            //Set the registered key in the localstorage to true
            localStorageService.set('email', email);
            $log.log('Email registered');
          } else {
            // TODO : Maybe block the app if the user is not properly registered
            $log.log('Something happened');
          }
        });
      }
      //Move on
      $scope.closeEmailModal();
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
