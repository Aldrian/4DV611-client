/**
 * Reusable directive representing an event item.
 * Display the event-item-template.
 * Event object is passed through the ng-repeat in event-list.html
 * Eg : for each event in the event array got from the EventFetching service,
 * call a directive passing the associated event object
 */
'use strict';
angular.module('main')
.directive('eventItem', function () {
  return {
    templateUrl: 'main/directives/event-item/event-item-template.html',
    restrict: 'E',
    link: function postLink () {
    }
  };
});
