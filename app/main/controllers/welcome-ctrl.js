'use strict';
angular.module('main')
  .controller('WelcomeCtrl', function($scope, EventFetching, localStorageService, $state) {

    EventFetching.getRacetracks().then(function(data) {
      $scope.racetracks = data;
    });

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
      $state.go('main.events');
    };

  });
