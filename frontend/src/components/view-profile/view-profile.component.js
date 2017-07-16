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

    constructor($state, EventsService, UserService, TopicsService, LanguagesService, LanguageLevelsService, RestaurantsService, Upload) {
        this.$state = $state;
        this.EventsService = EventsService;
        this.UserService = UserService;
        this.TopicsService = TopicsService;
        this.LanguagesService = LanguagesService;
        this.LanguageLevelsService = LanguageLevelsService;
        this.RestaurantsService = RestaurantsService;
        this.Upload = Upload;

        let ctrl = this;
        this.$onChanges = (changesObj) => {
            if (changesObj.user) {
                console.log(changesObj.user);
                let currentUser = changesObj.user.currentValue.data;
                ctrl.user = currentUser;
                ctrl.location = [currentUser.location.x, currentUser.location.y];

                // Get user's location
                var geocoder = new google.maps.Geocoder;
                geocoder.geocode({'location':{'lat':this.location[0], 'lng':this.location[1]}}, function(results, status) {
                    if (status === 'OK') {
                        ctrl.formatted_address = results[0].formatted_address;
                    }
                });

                // Get user's upcoming events
                EventsService.getEventsByUser(this.user._id).then((data) => {
                    ctrl.upcomingEvents = data;

                    ctrl.upcomingEvents.forEach((event) => {
                        RestaurantsService.get(event.offer.restaurant).then((restaurant) => {
                            event.offer.restaurant = restaurant;
                        });
                    });
                });

                this.getLanguages(currentUser);
                this.getTopics(currentUser);
            }
        };
    }

    getLanguages(user) {
        let ctrl = this;
        this.languages = {};
        user.languages.forEach(function(language) {
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

    getTopics(user) {
        let ctrl = this;
        this.topics = {};
        user.languages.forEach(function(language) {
            ctrl.topics[language._id] = [];
            language.topics.forEach(function(topic) {
                ctrl.TopicsService.get(topic).then(function (fullTopic) {
                    ctrl.topics[language._id].push(fullTopic);
                });
            });
        });
    }

    uploadImage() {
        if (this.image) {
            console.log("FORM AND IMAGE VALID");
            let ctrl = this;
            let reader = new FileReader();
            reader.readAsDataURL(this.image);
            reader.onloadend = function() {
                let base64Image = reader.result;
                // console.log(base64Image);
                ctrl.UserService.uploadImage({"image": base64Image.substr(base64Image.indexOf(',')+1)});
            }
        }
    }

    static get $inject() {
        return ['$state', EventsService.name, UserService.name, TopicsService.name, LanguagesService.name, LanguageLevelsService.name, RestaurantsService.name, 'Upload'];
    }
}


export default ViewProfileComponent;
