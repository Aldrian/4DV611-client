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

    if (localStorageService.get('email')) {
      // then the user has registered his email
      $scope.registeredEmail = true;
    } else {
      $scope.registeredEmail = false;
    }

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
      var tagList = {};
      //Forge the array of selected racetracks and taglist object
      $scope.racetracks.forEach(function(racetrack) {
        if (angular.element('#' + racetrack.id).find('input[type=\"checkbox\"]').is(':checked')) {
          selectedRacetracks.push(racetrack.id);
          tagList[racetrack.name] = true;
        } else {
          tagList[racetrack.name] = false;
        }
      });
      if (selectedRacetracks === []) {
        //TODO :: Display an error message if nothing is selected
        return false;
      }
      //Record the choices in the Local storage and set selectedRacetracks to true
      localStorageService.set('racetracks', selectedRacetracks);
      if (window.cordova) {
        // Running on device
        // Send taglist to OneSignal
        window.plugins.OneSignal.sendTags(tagList);
      }
      //Move on
      $scope.closeModal();
    };
    $scope.saveEmail = function(action) {
      if (action === 'confirm') {
        //Get email field value
        var email = angular.element('#emailField').val();
        var uuid = localStorageService.get('uuid');

        // We are on mobile and deviceid is registered, so we can send the email
        AccountManagement.addEmail(uuid, email).then(function(res) {
          if (res) {
            //Set the registered key in the localstorage to true
            localStorageService.set('email', email);
            $scope.registeredEmail = true;
            $log.log('Email registered');
          } else {
            // TODO : Maybe block the app if the user is not properly registered
            $log.log('Something happened');
          }
        });

        //Move on
        $scope.closeEmailModal();
      } else {
        //Move on
        $scope.closeEmailModal();
      }

    };
    $scope.deleteEmail = function(action) {
      if (action === 'confirm') {
        var uuid = localStorageService.get('uuid');

        AccountManagement.deleteEmail(uuid).then(function(res) {
          if (res) {
            //Set the registered key in the localstorage to true
            localStorageService.remove('email');
            $scope.registeredEmail = false;
            $log.log('Email unregistered');
          } else {
            // TODO : Maybe block the app if the user is not properly registered
            $log.log('Something happened');
          }
        });
        //Move on
        $scope.closeEmailModal();
      } else {
        //Move on
        $scope.closeEmailModal();
      }
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
