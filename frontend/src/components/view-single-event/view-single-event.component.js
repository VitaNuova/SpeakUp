'use strict';

import template from './view-single-event.template.html';
import './view-single-event.style.css';

import EventsService from './../../services/events/events.service';
import UserService from './../../services/user/user.service';
import RestaurantsService from './../../services/restaurants/restaurants.service'

class ViewSingleEventComponent {
    constructor() {
        this.controller = ViewSingleEventComponentController;
        this.template = template;
        this.bindings = {
            singleEvent: '<',
        }
    }

    static get name() {
        return 'viewSingleEvent';
    }

}

class ViewSingleEventComponentController {
    constructor($state, EventsService, UserService, RestaurantsService) {
        this.$state = $state;
        this.EventsService = EventsService;
        this.UserService = UserService;
        this.RestaurantsService = RestaurantsService;

        this.$onChanges = function (changesObj) {
            if (changesObj.singleEvent) {
                var setRestaurant = (function(restaurant) {
                    this.restaurant = restaurant.name
                }).bind(this);
                this.RestaurantsService.get(this.singleEvent.offer.restaurant).then(setRestaurant);
            }
        };
    }

    join() {
        if (this.UserService.isAuthenticated()) {

            var appendUser = (function(user) {
                this.singleEvent.users.push(user);
            }).bind(this);
            this.EventsService.join(this.singleEvent, this.UserService.getCurrentUser()._id).then(appendUser);
        } else {
            this.$state.go('home', {});
        }
    };

    getProgress(singleEvent) {
        var progress = 100 * singleEvent.users.length / singleEvent.offer.numOfPeople;
        if(progress > 100) {
            return 100;
        }
        return Math.round(progress);
    };

    static get $inject() {
        return ['$state', EventsService.name, UserService.name, RestaurantsService.name];
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

    hasUserAlreadyJoined(event) {
        let ctrl = this;
        ctrl.hasJoined = false;
        var user = this.UserService.getCurrentUser();
        event.users.forEach(function (eventUser) {
            if (eventUser != undefined) {
                if (eventUser._id == user._id) {
                    ctrl.hasJoined = true;
                }
            }
        });
        return ctrl.hasJoined;
    }

}


export default ViewSingleEventComponent;