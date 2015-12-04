/**
 * This is the event fetching service
 * The calls to the api in order to fetch the events on app start will be made here
 */
'use strict';
angular.module('main')
  .service('EventFetching', function($log, Config, $http) {

    var apiHost = Config.ENV.SERVER_URL;

    /**
     * Returns the interface of the service
     * @type {Object}
     */
    var service = {
      apiHost: apiHost,
      getEvents: getEvents
    };

    return service;

    function getEvents() {

      return $http.get(apiHost + 'events')
        .then(getEventsComplete)
        .catch(getEventsFailed);

      function getEventsComplete(response) {
        return response.data; // Promise for the recieved data, not the real data
      }

      function getEventsFailed(error) {
        $log.error('XHR Failed for getEvents.\n' + angular.toJson(error.data, true));
      }
    }

  });
