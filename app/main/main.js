'use strict';
angular.module('main', [
    'ionic',
    'ngCordova',
    'ui.router',
  ])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
    $ionicConfigProvider.scrolling.jsScrolling(false);
    $ionicConfigProvider.views.maxCache(5);
    $httpProvider.interceptors.push('APIInterceptor');
    // ROUTING with ui.router
    $urlRouterProvider.otherwise('/events');
    $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
      .state('main', {
        url: '',
        abstract: true,
        templateUrl: 'main/templates/menu.html',
        controller: 'EventsCtrl as ctrl'
      })
      .state('main.events', {
        url: '/events',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/event-list.html'
          }
        },

      })
      .state('main.eventDetail', {
        url: '/events/detail',
        params: {
          event: null,
        },
        views: {
          'pageContent': {
            templateUrl: 'main/templates/event-expended.html',
            controller: 'EventExpendedCtrl as ctrl'
          }
        }
      })
      .state('main.raceDetail', {
        url: '/events/detail/race',
        params: {
          race: null,
        },
        views: {
          'pageContent': {
            templateUrl: 'main/templates/race.html',
            controller: 'RaceCtrl as ctrl'
          }
        }
      })
      .state('main.config', {
        url: '/config',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/config.html',
            controller: 'ConfigCtrl as ctrl'
          }
        }
      })
      .state('welcome', {
        url: '/welcome',
        templateUrl: 'main/templates/welcome.html',
        controller: 'WelcomeCtrl as ctrl'
      });


  })
  .run(runBlock);

function runBlock($log, $window, Config, localStorageService, AccountManagement, $cordovaDevice, $location, $rootScope) {
  var registered = false; //block the state change to events if not properly registered;

  var init = function() {

    // Device or browser : different process

    if (window.cordova) {
      // Device
      registerToOneSignal();
      if (checkForDeviceRegistered()) {
        registerRacetracks();
      } else {
        getOneSignalIdThenRegister();
      }
    } else {
      // Browser
      if (checkForDeviceRegistered()) {
        registerRacetracks();
      } else {
        registerDeviceThenCheckForRacetracks(null);
      }
    }
  };

  ionic.Platform.ready(function() {
    init();
  });

  var notificationOpenedCallback = function(jsonData) {
    $log.log('notification recieved ! ');
    $log.log(jsonData.ArrayOfObjects);
    $scope.$broadcast('notificationOpened', {
      event: 'jsonData.ArrayOfObjects'
    });
  };

  function registerToOneSignal() {
    $window.plugins.OneSignal.init(Config.ENV.ONESIGNAL_APP_ID, {
        googleProjectNumber: Config.ENV.GOOGLE_PROJECT_NUMBER
      },
      notificationOpenedCallback);
  }

  function getOneSignalIdThenRegister() {
    $window.plugins.OneSignal.getIds(function(ids) {
      registerDeviceThenCheckForRacetracks(ids.userId);
    });
  }

  function checkForDeviceRegistered() {
    if (!localStorageService.get('uuid')) {
      return false;
    } else {
      registered = true;
      return true;
    }
  }

  function registerDeviceThenCheckForRacetracks(oneSignalId) {

    var uuid = null;
    if (window.cordova) {
      uuid = $cordovaDevice.getUUID();
    } else {
      uuid = 'chromedebug';
    }

    AccountManagement.createUser(uuid, oneSignalId).then(function(res) {
      if (res) {
        $log.log(res);
        localStorageService.set('uuid', uuid);
        registered = true;
        registerRacetracks();
      } else {
        // TODO : Maybe block the app if the user is not properly registered
        $log.log('Something happened');
      }
    });

  }

  function registerRacetracks() {
    if (!localStorageService.get('racetracks')) {
      //Block the execution and display the racetrack selection template
      $location.path('/welcome');
    } else {
      $log.log('Racetracks already registered, moving on');
      $location.path('/events');
    }
  }


  $log.debug('runBlock end');

  $rootScope.$on('$stateChangeStart',
    function(event, toState) {
      if (toState.name === 'main.events' && registered !== true) {
        event.preventDefault();
      }
    });
}
