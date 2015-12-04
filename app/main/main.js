'use strict';
angular.module('main', [
    'ionic',
    'ngCordova',
    'ui.router',
  ])
  .config(function($stateProvider, $urlRouterProvider) {

    // ROUTING with ui.router
    $urlRouterProvider.otherwise('/events');
    $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
      .state('main', {
        url: '',
        abstract: true,
        templateUrl: 'main/templates/menu.html',
        controller: 'EventsCtrl as menu'
      })
      .state('main.events', {
        url: '/events',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/event-list.html'
          }
        }
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
      });
  })
  .run(runBlock);

function runBlock($log, $window, Config) {
  $log.debug('runBlock end');
  document.addEventListener('deviceready', function() {
    // Enable to debug issues.
    // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
    var notificationOpenedCallback = function(jsonData) {
      $log.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
    };

    $window.plugins.OneSignal.init(Config.ONESIGNAL_APP_ID, {
        googleProjectNumber: Config.GOOGLE_PROJECT_NUMBER
      },
      notificationOpenedCallback);

    // Show an alert box if a notification comes in when the user is in your app.
    $window.plugins.OneSignal.enableInAppAlertNotification(true);
  }, false);
}
