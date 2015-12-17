/**
 * Empty controller for the Config page
 * associated template : config.html
 */

'use strict';
angular.module('main')
  .controller('ConfigCtrl', function($log, $ionicModal, $ionicPlatform, Config, $window, $scope, localStorageService, EventFetching, AccountManagement, $timeout) {

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
      $(document).ready(function() {
        $('.input-email').each(function() {
          if ($(this).val() !== '') {
            $(this).parent().addClass('animation');
          }
        });
      });

      //Add animation when input is focused
      $('.email-input').focus(function() {
        $(this).parent().addClass('animation animation-color');
      });

      //Remove animation(s) when input is no longer focused
      $('.email-input').focusout(function() {
        if ($(this).val() === '') {
          $(this).parent().removeClass('animation');
          $(this).parent().removeClass('animation-color');
        }
      });
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
        if (angular.element('#' + racetrack.id).is(':checked')) {
          selectedRacetracks.push(racetrack.id);
          tagList[racetrack.name] = true;
        } else {
          tagList[racetrack.name] = false;
        }
      });
      if (selectedRacetracks.length === 0) {
        //TODO :: Display an error message if nothing is selected
        $log.log('Nothing is selected !');
        angular.element('.error').addClass('active');
        $timeout(function() {
          angular.element('.error').removeClass('active');
        }, 3000);
        return false;
      }
      //Record the choices in the Local storage and set selectedRacetracks to true
      localStorageService.set('racetracks', selectedRacetracks);
      EventFetching.postSubscriptions(selectedRacetracks);
      
      //Move on
      $scope.closeModal();
    };
    $scope.saveEmail = function(action) {
      if (action === 'confirm') {
        //Get email field value
        var email = angular.element('#input-email').val();
        var EMAIL_REGEXP = new RegExp(/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/);
        if (EMAIL_REGEXP.test(email)) {
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
        } else {
          $log.log('Wrong email !');
          angular.element('.error').addClass('active');
          $timeout(function() {
            angular.element('.error').removeClass('active');
          }, 3000);
          return false;
        }

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
