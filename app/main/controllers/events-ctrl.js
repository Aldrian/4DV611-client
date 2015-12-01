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
      $ionicPlatform.ready(function($index) {
        // Ready functions
    });
    //List of racing tracks
    $scope.themen = [
         { name: 'Arvika', id: 1 },
         { name: 'Axevalla', id: 2},
         { name: 'Bergsåker', id: 3 },
         { name: 'Blommeröd', id: 4},
         { name: 'Boden', id: 5 },
         { name: 'Bollnäs', id: 6},
         { name: 'Bro Park', id: 7 },
         { name: 'Dannero', id: 8 },
         { name: 'Eskilstuna', id: 9 },
         { name: 'Färjestad', id: 10  },
         { name: 'Gärdets Galopp', id: 11  },
         { name: 'Gävle', id: 12  },
         { name: 'Göteborg Galopp', id: 13  },
         { name: 'Göteborg Trav', id: 14  },
         { name: 'Hagfors', id: 15  },
         { name: 'Hagmyren', id: 16  },
         { name: 'Halmstad', id: 17  },
         { name: 'Hoting', id: 18  },
         { name: 'Jägersro', id: 19  },
         { name: 'Jägersro Galopp', id: 30  },
         { name: 'Kalmar', id: 21  },
         { name: 'Karlshamn', id: 22  },
         { name: 'Lindesberg', id: 23  },
         { name: 'Lycksele', id: 24  },
         { name: 'Mantorp', id: 25  },
         { name: 'Mariehamn', id: 26  },
         { name: 'Oviken', id: 27  },
         { name: 'Romme', id: 28  },
         { name: 'Rättvik', id: 29  },
         { name: 'Skellefteå', id: 30  },
         { name: 'Solvalla', id: 31  },
         { name: 'Solänget', id:32},
         { name: 'Strömsholm', id:33},
         { name: 'Tingsryd', id:34},
         { name: 'Täby Galopp', id:35},
         { name: 'Umåker (Umeå)', id:36},
         { name: 'Vaggeryd', id:37},
         { name: 'Visby', id:38},
         { name: 'Åby', id:39},
         { name: 'Åmål', id:40},
         { name: 'ATG Jippo', id:41 },
         { name: 'Årjäng', id:42},
         { name: 'Örebro', id:43},
         { name: 'Östersund', id:44},
         { name: 'Xpress A', id:45},
         { name: 'Xpress B', id:46},
         { name: 'Xpress C', id:47},
         { name: 'Xpress D', id:48}
     ];
     $scope.updateThemaLocalStorage = function ($index) {
       // Debug: call by index dynamically
       console.log("klicked index: " + $index);
       console.log($scope.themen[$index].name);
       console.log("current state: " + $scope.themen[$index].checked);
       // Actually doing the localStorage: set item to true/false
       console.log("recent saved state: " + $window.localStorage[ $index ]);
        $window.localStorage.setItem( $index, $scope.themen[$index].checked );
    };
     $scope.output = $window.localStorage; console.log($scope.output);
     $scope.getCheck = function ($index) {
    // get the stored toggle (true or false) and
    // pass it over to the ng-checked in the html
    return $window.localStorage[ $index ];
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
