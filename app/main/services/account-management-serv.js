/**
 * This is the account management service
 * The calls to the api in order to create an user on the DB and update his infos
 */
'use strict';
angular.module('main')
  .service('AccountManagement', function($log, Config, $http) {

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
        device_id: deviceId
      };

      var req = {
        method: 'POST',
        url: apiHost + 'users/',
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
