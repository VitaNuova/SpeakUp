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
        console.log(this.singleEvent);
        if (this.UserService.isAuthenticated()) {
            let _id = this.singleEvent['_id'];
            this.$state.go('eventJoin', { eventId: _id });
        } else {
            this.$state.go('home', {});
        }

    };

    getProgress(singleEvent) {
        var progress = 100 * singleEvent.users.length / singleEvent.offer.numOfPeople;
        return Math.round(progress * 100) / 100;
    };

    // getRestaurantLogo(event) {
    //     console.log(this.singleEvent.image.data);
    //     let restaurantLogoURL = 'http://www.almanac.com/sites/default/files/users/Almanac%20Staff/violet-292367_1920_0_full_width.jpg';
    //     return restaurantLogoURL;
    // }

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

}


export default ViewSingleEventComponent;