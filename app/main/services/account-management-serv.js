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
      createUser: createUser,
      addEmail: addEmail,
      deleteEmail: deleteEmail
    };

    return service;

    function createUser(deviceId, oneSignalId) {

      var user = {
        deviceId: deviceId,
        oneSignalId : oneSignalId
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

    function addEmail(deviceId, email) {

      var user = {

        email: email,
        username: null,
        password: null,
        deviceId: deviceId,
        role: 2,
        trackId: null,
        enabled: true
      };

      var req = {
        method: 'PUT',
        url: apiHost + 'users/',
        headers: {
          'Content-Type': 'application/json'
        },
        data: user
      };


      return $http(req).then(addEmailComplete)
        .catch(addEmailFailed);

      function addEmailComplete() {
        return true; // Promise for the recieved data, not the real data
      }

      function addEmailFailed(error) {
        $log.error('XHR Failed for addEmail.\n' + angular.toJson(error.data, true));
        return false;
      }
    }

    function deleteEmail(deviceId) {

      var user = {
        email: '',
        username: null,
        password: null,
        deviceId: deviceId,
        role: 2,
        trackId: null,
        enabled: true
      };

      var req = {
        method: 'PUT',
        url: apiHost + 'users/',
        headers: {
          'Content-Type': 'application/json'
        },
        data: user
      };


      return $http(req).then(deleteEmailComplete)
        .catch(deleteEmailFailed);

      function deleteEmailComplete() {
        return true; // Promise for the recieved data, not the real data
      }

      function deleteEmailFailed(error) {
        $log.error('XHR Failed for deleteEmail.\n' + angular.toJson(error.data, true));
        return false;
      }
    }

  });
