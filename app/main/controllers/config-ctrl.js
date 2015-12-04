/**
 * Empty controller for the Config page
 * associated template : config.html
 */

'use strict';
angular.module('main')
  .controller('ConfigCtrl', function($log, $ionicModal, $ionicPlatform, Config, $window, $scope, LocalStorage) {

    $log.log('Hello from your Controller: ConfigCtrl in module main:. This is your controller:', this);

    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openRacetracksModal = function() {
      $scope.modal.show();

      //List of racing tracks
      $scope.themen = Config.ENV.RACETRACKS;

      $scope.updateThemaLocalStorage = function($index) {
        // Debug: call by index dynamically
        console.log('clicked index: ' + $index);
        console.log($scope.themen[$index].name);
        console.log('current state: ' + $scope.themen[$index].checked);
        // Actually doing the localStorage: set item to true/false
        console.log('recent saved state: ' + LocalStorage.getObject('Racetracks'));
        LocalStorage.setObject('Racetracks', $index, $scope.themen[$index].checked);
      };
      $scope.getCheck = function() {
        // get the stored toggle (true or false) and
        // pass it over to the ng-checked in the html
        return LocalStorage.getObject('Racetracks');
      };
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
