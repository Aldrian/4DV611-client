'use strict';
angular.module('main')
  .controller('WelcomeCtrl', function($log, $scope, EventFetching, localStorageService, $state, $cordovaDevice, $timeout) {
    $log.log('WelcomeCtrl loaded');
    EventFetching.getRacetracks().then(function(data) {
      $scope.racetracks = data;
    });

    $scope.saveRacetracks = function() {
      var selectedRacetracks = [];
      var tagList = {};
      //Forge the array of selected racetracks and the taglist object
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
      
      //Check of still registered
      if (!localStorageService.get('uuid')) {
        var uuid;
        if (window.cordova) {
          uuid = $cordovaDevice.getUUID();
        } else {
          uuid = 'chromedebug';
        }
        localStorageService.set('uuid', uuid);
      }
      //Move on
      $state.go('main.events');
    };

  });
