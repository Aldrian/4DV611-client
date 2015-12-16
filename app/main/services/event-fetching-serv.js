/**
 * This is the event fetching service
 * The calls to the api in order to fetch the events on app start will be made here
 */
'use strict';
angular.module('main')
  .service('EventFetching', function($log, Config, $http, localStorageService) {

    var apiHost = Config.ENV.SERVER_URL;

    /**
     * Returns the interface of the service
     * @type {Object}
     */
    var service = {
      apiHost: apiHost,
      getEvents: getEvents,
      getRacetracks: getRacetracks,
      postSubscriptions: postSubscriptions
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

    function postSubscriptions(tracklist) {

      var object = {
        deviceId: localStorageService.get('uuid'),
        trackIdList: tracklist
      };

      var req = {
        method: 'POST',
        url: apiHost + 'subscriptions/',
        headers: {
          'Content-Type': 'application/json'
        },
        data: object
      };


      return $http(req).then(postSubscriptionsComplete)
        .catch(postSubscriptionsFailed);

      function postSubscriptionsComplete() {
        return true; // Promise for the recieved data, not the real data
      }

      function postSubscriptionsFailed(error) {
        $log.error('XHR Failed for createUser.\n' + angular.toJson(error.data, true));
        return false;
      }
    }

    function getRacetracks() {
      var unregistered;
      if(!localStorageService.get('uuid')) {
        localStorageService.set('uuid', 'chromedebug');
        unregistered = true;
      }

      return $http.get(apiHost + 'tracks')
        .then(getRacetracksComplete)
        .catch(getRacetracksFailed);

      function getRacetracksComplete(response) {
        if (unregistered) {
          localStorageService.remove('uuid');
        }
        return response.data; // Promise for the recieved data, not the real data
      }

      function getRacetracksFailed(error) {
        if (unregistered) {
          localStorageService.remove('uuid');
        }
        $log.error('XHR Failed for getEvents.\n' + angular.toJson(error.data, true));
      }
    }

  });
