/**
 * This is the event fetching service
 * The calls to the api in order to fetch the events on app start will be made here
 */

'use strict';
angular.module('main')
.service('EventFetching', function ($log) {

  $log.log('Hello from your Service: Event Fetching in module main');

  /**
   * Event object
   * @type {Array}
   */
  this.events = [];

  /**
   * Fetch event method
   * This will be the place to make the get request on the server in order to recieve the array of events
   * @return JSON Array The array of events
   */
  this.fetchEvents= function () {
    //make the request here (using $http or another kind of service)

    /**
     * For now we just mock the events by hard-coding them in the service method
     * @type {Array}
     */
    this.events = [{
      name : 'event1',
      racetrack : 'Växjö',
      text : 'bla'
    },
    {
      name : 'event2',
      racetrack : 'Malmö',
      text : 'bla bla'
    },
    {
      name : 'event3',
      racetrack : 'Stockholm',
      text : 'bla bla bla'
    }];


  };

  /**
   * Getter for events object
   * @return JSON Array array of events
   */
  this.getEvents= function () {
   return this.events;
  };

  //When the mainController is intenciated (when you go to the main view, the fetchEvents service is injected)
  //Therefore, the methode above will be called the first time we enter the main view, getting all the events
  this.fetchEvents();
});
