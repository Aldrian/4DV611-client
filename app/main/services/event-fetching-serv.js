/**
 * This is the event fetching service
 * The calls to the api in order to fetch the events on app start will be made here
 */

'use strict';
angular.module('main')
  .service('EventFetching', function($log, Config, $http) {

    $log.log('Hello from your Service: Event Fetching in module main');

    var apiHost = Config.ENV.SERVER_URL;

    /**
     * Returns the interface of the service
     * @type {Object}
     */
    var service = {
      apiHost: apiHost,
      getEvents: getEvents,
      mockEvents: mockEvents
    };

    return service;

    function getEvents(limit) {
      //Get only the 10 last events
      if (!limit) {
        limit = 10;
      }

      return $http.get(apiHost + '/events?per_page=' + limit)
        .then(getEventsComplete)
        .catch(getEventsFailed);

      function getEventsComplete(response) {
        return response.data;
      }

      function getEventsFailed(error) {
        $log.error('XHR Failed for getEvents.\n' + angular.toJson(error.data, true));
      }
    }

    function mockEvents() {
      return [{
        name: 'event1',
        racetrack: 'Karlstad',
        date: 'November 05, 1955',
        description: 'Sample event description',
        poster: 'main/assets/images/farjestad.jpg',
        offer: {
          image: 'main/assets/images/cat.jpg',
          description: 'Event  Offer description'
        },
        startList: 'Event  1 strat list',
        todayHighlights: 'Event 1 Today Highlight',
        todayHomeTeam: 'Event 1 Today Home Team',
        racingCalendar: 'Event 1 Racing Calendar',
        aboutTheTrack: 'Track Description'
      }, {
        name: 'event2',
        racetrack: 'Stockholm',
        date: 'November 05, 1955',
        poster: 'main/assets/images/stockholm.jpg',
        description: 'Sample event description',
        offer: {
          image: 'main/assets/images/cat.jpg',
          description: 'Event  Offer description'
        },
        startList: 'Event  2 strat list',
        todayHighlights: 'Event 2 Today Highlight',
        todayHomeTeam: 'Event 2 Today Home Team',
        racingCalendar: 'Event 2 Racing Calendar',
        aboutTheTrack: 'Track Description'
      }, {
        name: 'event3',
        racetrack: 'Malmö',
        date: 'November 05, 1955',
        poster: 'main/assets/images/jagersro.jpg',
        description: 'Sample event description',
        offer: {
          image: 'main/assets/images/cat.jpg',
          description: 'Event  Offer description'
        },
        startList: 'Event  3 strat list',
        todayHighlights: 'Event 3 Today Highlight',
        todayHomeTeam: 'Event 3 Today Home Team',
        racingCalendar: 'Event 3 Racing Calendar',
        aboutTheTrack: 'Track Description'
      }];
    }
  });
