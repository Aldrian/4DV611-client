'use strict';
angular.module('main')
  .service('LoginManagement', function($log, $window, Config, localStorageService, AccountManagement, $cordovaDevice, $location, $rootScope, $q) {

    var deferred = $q.defer();

    var init = function() {
      // Device or browser : different process
      if (window.cordova) {
        // Device
        registerToOneSignal();
        if (checkForDeviceRegistered()) {
          registerRacetracks();
        } else {
          getOneSignalIdThenRegister();
        }
      } else {
        // Browser
        if (checkForDeviceRegistered()) {
          registerRacetracks();
        } else {
          registerDeviceThenCheckForRacetracks(null);
        }
      }
    };

    ionic.Platform.ready(function() {
      init();
    });

    var notificationOpenedCallback = function(jsonData) {
      $log.log('notification opened!');
      $log.log(jsonData.additionalData);
      if (jsonData.additionalData !== undefined) {
        $rootScope.$broadcast('notificationOpened', {
          eventId: jsonData.additionalData.eventId
        });
      }
    };

    function registerToOneSignal() {
      $window.plugins.OneSignal.init(Config.ENV.ONESIGNAL_APP_ID, {
          googleProjectNumber: Config.ENV.GOOGLE_PROJECT_NUMBER
        },
        notificationOpenedCallback);
    }

    function getOneSignalIdThenRegister() {
      $window.plugins.OneSignal.getIds(function(ids) {
        registerDeviceThenCheckForRacetracks(ids.userId);
      });
    }

    function checkForDeviceRegistered() {
      if (!localStorageService.get('uuid')) {
        return false;
      } else {
        return true;
      }
    }

    function registerDeviceThenCheckForRacetracks(oneSignalId) {

      var uuid = null;
      if (window.cordova) {
        uuid = $cordovaDevice.getUUID();
      } else {
        uuid = 'chromedebug22';
      }

      AccountManagement.createUser(uuid, oneSignalId).then(function(res) {
        if (res) {
          $log.log(res);
          localStorageService.set('uuid', uuid);
          registerRacetracks();
        } else {
          // TODO : Maybe block the app if the user is not properly registered
          $log.log('Something happened');
        }
      });
    }

    function registerRacetracks() {
      if (!localStorageService.get('racetracks')) {
        //Block the execution and display the racetrack selection template
        $log.log('No racetracks registered, moving to the racetrack selection screen');
        $location.path('/welcome');
        deferred.resolve();
      } else {
        $log.log('Racetracks already registered, moving on');
        $location.path('/events');
        deferred.resolve();
      }
    }

    function getPromise(){
      return deferred.promise;
    }

    var service = {
      getPromise: getPromise
    };


    return service;

  });
