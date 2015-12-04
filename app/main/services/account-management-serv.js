/**
 * This is the event fetching service
 * The calls to the api in order to fetch the events on app start will be made here
 */
'use strict';
angular.module('main')
  .service('AccountManagement', function($log, Config, $http) {
    $log.log('Hello from your Service: Account Management in module main');

    var apiHost = Config.ENV.SERVER_URL;

    /**
     * Returns the interface of the service
     * @type {Object}
     */
    var service = {
      apiHost: apiHost,
      createUser: createUser
    };

    return service;

    function createUser(deviceId) {

      var user = {
        deviceId: deviceId
      };

      var req = {
        method: 'POST',
        url: apiHost + 'users',
        headers: {
          'Content-Type': 'application/json'
        },
        data: user
      };


      return $http(req).then(createUserComplete)
        .catch(createUserFailed);

      function createUserComplete() {
        return true; // Promise for the recieved data, not the real data
      }

      function createUserFailed(error) {
        $log.error('XHR Failed for createUser.\n' + angular.toJson(error.data, true));
        return false;
      }
    }

  });
