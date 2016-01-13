'use strict';
angular.module('main')
.constant('Config', {

  // gulp environment: injects environment vars
  ENV: {
    /*inject-env*/
    'SERVER_URL': 'http://46.101.168.154:8080/api/v1.0/',
    'ONESIGNAL_APP_ID': '4c3907a3-0097-46c1-8059-21da20736620',
    'GOOGLE_PROJECT_NUMBER': '240511434663'
    /*endinject*/
  },

  // gulp build-vars: injects build vars
  BUILD: {
    /*inject-build*/
    /*endinject*/
  }

});
