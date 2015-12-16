'use strict';
angular.module('main')
  .service('APIInterceptor', function($rootScope, localStorageService, $base64, $log, Config) {
    var service = this;
    var apiHost = Config.ENV.SERVER_URL;

    service.request = function(config) {
      if (config.url === apiHost + 'subscriptions/') {
        $log.log('Its a subscriptions request');
        return addAuth();
      }
      if (config.method !== 'POST' && config.url !== apiHost + 'subscriptions/') {
        return addAuth();
      }

      function addAuth() {
        var uuid = localStorageService.get('uuid');
        var accessToken = 'Basic ' + $base64.encode(uuid + ':' + uuid);
        if (accessToken) {
          config.headers.Authorization = accessToken;
        }
        return config;
      }
    };

    service.responseError = function(response) {
      if (response.status === 401) {
        $rootScope.$broadcast('unauthorized');
      }
      return response;
    };


  });
