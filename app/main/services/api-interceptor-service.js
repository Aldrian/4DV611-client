'use strict';
angular.module('main')
  .service('APIInterceptor', function($rootScope, localStorageService, $base64, $log, Config) {
    var service = this;
    var apiHost = Config.ENV.SERVER_URL;

    service.request = function(config) {
      if (config.url.indexOf('/templates/') === -1) {

        if (config.url === apiHost + 'subscriptions/') {
          $log.log('Adding auth token (subscriptions)');
          return addAuth();
        } else if (config.method !== 'POST') {
          $log.log('Adding auth token (regular request, not post)');
          return addAuth();
        } else {
          return config;
        }
      } else {
        return config;
      }

      function addAuth() {
        var uuid = localStorageService.get('uuid');
        var accessToken = 'Basic ' + $base64.encode(uuid + ':' + uuid);

        config.headers.Authorization = accessToken;

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
