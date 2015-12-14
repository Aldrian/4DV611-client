'use strict';
angular.module('main')
  .service('APIInterceptor', function($rootScope, localStorageService, $base64) {
    var service = this;

    service.request = function(config) {
      if (config.method!=='POST') {
        var uuid = localStorageService.get('uuid');
        var accessToken =  'Basic '+ $base64.encode(uuid+ ':' +uuid);
        if (accessToken) {
          config.headers.Authorization = accessToken;
        }
      }
      return config;
    };

    service.responseError = function(response) {
      if (response.status === 401) {
        $rootScope.$broadcast('unauthorized');
      }
      return response;
    };
  });
