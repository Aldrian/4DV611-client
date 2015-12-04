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
    template:
    '<div class="card" ui-sref="main.eventDetail({event:event})">' +
      '<div class="item item-divider">' +
        '{{event.date | date:\'medium\'}}' +
        'in' +
        '{{event.name}}' +
    '  </div>' +
      '<div class="item item-text-wrap">' +
        '{{event.highlight}}' +
    '  </div>' +
    '</div>',
    restrict: 'E',
    link: function postLink () {
    }
  };
});
