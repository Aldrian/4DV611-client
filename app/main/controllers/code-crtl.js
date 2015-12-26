'use strict';
angular.module('main')
.controller('CodeCtrl', function ($scope, localStorageService, $window) {

  //Create QR-Code showing the following address :
  //admin.agile.julienbarret.ovh/#/offers/:userId
  //
  //
  $scope.size = Math.min($window.innerWidth, $window.innerHeight) - 50;
  $scope.qrcodeString = 'http://admin.agile.julienbarret.ovh/#/offers/'+localStorageService.get('uuid');
});
