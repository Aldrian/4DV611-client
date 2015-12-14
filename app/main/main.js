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

function runBlock($log, $window, Config, localStorageService, AccountManagement, $cordovaDevice, $location) {


  /**************************
  Check for device id
  **************************/
  var init = function() {
    $log.log('initializing device');
    if (!localStorageService.get('uuid')) {
      //Register the device
      var uuid = null;
      if (window.cordova) {
        uuid = $cordovaDevice.getUUID();
      } else {
        uuid = 'chromedebug';
      }

      $log.log('DeviceID fetched : ' + uuid);

      AccountManagement.createUser(uuid).then(function(res) {
        if (res) {
          //Set the registered key in the localstorage to true
          localStorageService.set('uuid', uuid);
          $log.log('User registered');
          doTheRest();
        } else {
          // TODO : Maybe block the app if the user is not properly registered
          $log.log('Something happened');
        }
      });
    } else {
      $log.log('DeviceID ' + localStorageService.get('uuid') + ' already registered');
      doTheRest();
    }

    function doTheRest() {

      if (window.cordova) {
        /**************************
        One Signal config
        **************************/
        var notificationOpenedCallback = function(jsonData) {
          $log.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
        };

        $window.plugins.OneSignal.init(Config.ENV.ONESIGNAL_APP_ID, {
            googleProjectNumber: Config.ENV.GOOGLE_PROJECT_NUMBER
          },
          notificationOpenedCallback);

        // Show an alert box if a notification comes in when the user is in your app.
        $window.plugins.OneSignal.enableInAppAlertNotification(true);
      } else {
        // running in dev mode
      }
    }
  };

  ionic.Platform.ready(function() {
    init();
  });

  /**************************
  Check for racetrack selection
  **************************/
  if (!localStorageService.get('racetracks')) {
    //Block the execution and display the racetrack selection template
    $location.path('/welcome');
  } else {
    $log.log('Racetracks already registered, moving on');
  }

  $log.debug('runBlock end');
}
