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
    $urlRouterProvider.otherwise('/loading');
    $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
      .state('loading', {
        url: '/loading',
        templateUrl: 'main/templates/loading.html',
        resolve: {
          foo: function(LoginManagement) {
            return LoginManagement.getPromise();
          }
        }
      })
      .state('welcome', {
        url: '/welcome',
        templateUrl: 'main/templates/welcome.html',
        controller: 'WelcomeCtrl as ctrl'
      })
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
      .state('main.code', {
        url: '/code',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/code.html',
            controller: 'CodeCtrl as ctrl'
          }
        }
      });


  })
  .run(runBlock);

function runBlock($log) {

  $log.debug('runBlock end');

}
