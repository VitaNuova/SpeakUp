'use strict';

import template from './view-profile.template.html';
import EventsService from './../../services/events/events.service';
import UserService from './../../services/user/user.service';
import TopicsService from './../../services/topics/topics.service';
import LanguagesService from './../../services/languages/languages.service';
import LanguageLevelsService from './../../services/language-levels/language-levels.service';
import RestaurantsService from './../../services/restaurants/restaurants.service';

import './view-profile.style.css';

class ViewProfileComponent {
  constructor() {
    this.controller = ViewProfileComponentController;
    this.template = template;
    this.bindings = {
      user: '<',
    }

  }

  static get name() {
    return 'viewProfile';
  }


}

class ViewProfileComponentController {
  constructor($state, EventsService, UserService, TopicsService, LanguagesService, LanguageLevelsService, RestaurantsService) {
    this.$state = $state;
    this.EventsService = EventsService;
    this.UserService = UserService;
    this.TopicsService = TopicsService;
    this.LanguagesService = LanguagesService;
    this.LanguageLevelsService = LanguageLevelsService;
    this.RestaurantsService = RestaurantsService;

    this.$onChanges = (changesObj) => {
      if (changesObj.user) {

        this.location = [this.user.location.x, this.user.location.y];

        this.getUsersFormattedAddress();

        // Get user's upcoming events
        var ctrl = this;
        EventsService.getEventsByUser(this.user._id).then((data) => {
          ctrl.upcomingEvents = data;

          this.restaurantLocations = {};
          ctrl.upcomingEvents.forEach((event) => {
            RestaurantsService.get(event.offer.restaurant).then((restaurant) => {
              event.offer.restaurant = restaurant;
              var geocoder = new google.maps.Geocoder;
              geocoder.geocode({'location':{'lat':restaurant.location.x, 'lng':restaurant.location.y}}, (results, status) => {
                if (status === 'OK') {
                  this.restaurantLocations[restaurant._id] = results[0].formatted_address;
                  console.log("restaurantLocations "+JSON.stringify(this.restaurantLocations));
                }
              });
            });
          });
        });




        this.getLanguages();
        this.getTopics();
      }
    };
  }

  getUsersFormattedAddress() {
    var geocoder = new google.maps.Geocoder;
    var ctrl = this;
    geocoder.geocode({'location':{'lat':this.location[0], 'lng':this.location[1]}}, function(results, status) {
      if (status === 'OK') {
        ctrl.formatted_address = results[0].formatted_address;
      }
    });
  }

  getLanguages() {
    let ctrl = this;
    this.languages = {};
    this.user.languages.forEach(function(language) {
      ctrl.LanguagesService.get(language.language).then(function(userLanguage) {
        ctrl.languages[language._id] = userLanguage;
      });
    });
  }

  getFullDate(offer) {
    var date = new Date(offer.from);
    var day = date.getDate().toString();
    var month = ((date.getMonth() + 1) < 10 ? "0" : "") + (date.getMonth() + 1).toString();
    var year = date.getFullYear();
    return day + "." + month + "." + year;
  }

  getTime(time) {
    var date = new Date(time);
    var hours = (date.getHours() < 10 ? "0" : "") + date.getHours().toString();
    var minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes().toString();
    return hours + ":" + minutes;
  }

  getTopics() {
    let ctrl = this;
    this.topics = {};
    this.user.languages.forEach(function(language) {
      ctrl.topics[language._id] = [];
      language.topics.forEach(function(topic) {
        ctrl.TopicsService.get(topic).then(function (fullTopic) {
          ctrl.topics[language._id].push(fullTopic);
        });
      });
    });
  }

  static get $inject() {
    return ['$state', EventsService.name, UserService.name, TopicsService.name, LanguagesService.name, LanguageLevelsService.name, RestaurantsService.name];
  }
}


export default ViewProfileComponent;
