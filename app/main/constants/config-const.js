'use strict';
angular.module('main')
.constant('Config', {

  // gulp environment: injects environment vars
  // https://github.com/mwaylabs/generator-m-ionic#gulp-environment
  ENV: {
    /*inject-env*/
    'SERVER_URL': 'http://46.101.168.154:8080/api/v1.0/',
    'ONESIGNAL_APP_ID': '',
    'GOOGLE_PROJECT_NUMBER': '240511434663',
    'RACETRACKS': [
      {
        'name': 'Arvika',
        'id': 1
      },
      {
        'name': 'Axevalla',
        'id': 2
      },
      {
        'name': 'Bergsåker',
        'id': 3
      },
      {
        'name': 'Blommeröd',
        'id': 4
      },
      {
        'name': 'Boden',
        'id': 5
      },
      {
        'name': 'Bollnäs',
        'id': 6
      },
      {
        'name': 'Bro Park',
        'id': 7
      },
      {
        'name': 'Dannero',
        'id': 8
      },
      {
        'name': 'Eskilstuna',
        'id': 9
      },
      {
        'name': 'Färjestad',
        'id': 10
      },
      {
        'name': 'Gärdets Galopp',
        'id': 11
      },
      {
        'name': 'Gävle',
        'id': 12
      },
      {
        'name': 'Göteborg Galopp',
        'id': 13
      },
      {
        'name': 'Göteborg Trav',
        'id': 14
      },
      {
        'name': 'Hagfors',
        'id': 15
      },
      {
        'name': 'Hagmyren',
        'id': 16
      },
      {
        'name': 'Halmstad',
        'id': 17
      },
      {
        'name': 'Hoting',
        'id': 18
      },
      {
        'name': 'Jägersro',
        'id': 19
      },
      {
        'name': 'Jägersro Galopp',
        'id': 30
      },
      {
        'name': 'Kalmar',
        'id': 21
      },
      {
        'name': 'Karlshamn',
        'id': 22
      },
      {
        'name': 'Lindesberg',
        'id': 23
      },
      {
        'name': 'Lycksele',
        'id': 24
      },
      {
        'name': 'Mantorp',
        'id': 25
      },
      {
        'name': 'Mariehamn',
        'id': 26
      },
      {
        'name': 'Oviken',
        'id': 27
      },
      {
        'name': 'Romme',
        'id': 28
      },
      {
        'name': 'Rättvik',
        'id': 29
      },
      {
        'name': 'Skellefteå',
        'id': 30
      },
      {
        'name': 'Solvalla',
        'id': 31
      },
      {
        'name': 'Solänget',
        'id': 32
      },
      {
        'name': 'Strömsholm',
        'id': 33
      },
      {
        'name': 'Tingsryd',
        'id': 34
      },
      {
        'name': 'Täby Galopp',
        'id': 35
      },
      {
        'name': 'Umåker (Umeå)',
        'id': 36
      },
      {
        'name': 'Vaggeryd',
        'id': 37
      },
      {
        'name': 'Visby',
        'id': 38
      },
      {
        'name': 'Åby',
        'id': 39
      },
      {
        'name': 'Åmål',
        'id': 40
      },
      {
        'name': 'ATG Jippo',
        'id': 41
      },
      {
        'name': 'Årjäng',
        'id': 42
      },
      {
        'name': 'Örebro',
        'id': 43
      },
      {
        'name': 'Östersund',
        'id': 44
      },
      {
        'name': 'Xpress A',
        'id': 45
      },
      {
        'name': 'Xpress B',
        'id': 46
      },
      {
        'name': 'Xpress C',
        'id': 47
      },
      {
        'name': 'Xpress D',
        'id': 48
      }
    ]
    /*endinject*/
  },

  // gulp build-vars: injects build vars
  // https://github.com/mwaylabs/generator-m-ionic#gulp-build-vars
  BUILD: {
    /*inject-build*/
    /*endinject*/
  }

});
