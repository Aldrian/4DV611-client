'use strict';
angular.module('main')
  .controller('WelcomeCtrl', function($log, $scope, EventFetching, localStorageService, $state) {

    EventFetching.getRacetracks().then(function(data) {
      $scope.racetracks = data;
    });

    $scope.saveRacetracks = function() {
      var selectedRacetracks = [];
      var tagList = {};
      //Forge the array of selected racetracks and the taglist object
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
      // Send taglist to OneSignal
      $log.log(tagList);
      if (localStorageService.get('uuid')) {
        // We are on mobile and deviceid is registered, so we can send the tags
        window.plugins.OneSignal.sendTags(tagList);
      }
      //Move on
      $state.go('main.events');
    };

  });
