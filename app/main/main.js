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
          params:{
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
          params:{
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
  });
