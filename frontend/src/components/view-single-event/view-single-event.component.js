'use strict';

import template from './view-single-event.template.html';
import './view-single-event.style.css';

import EventsService from './../../services/events/events.service';
import UserService from './../../services/user/user.service';

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
    constructor($state, EventsService, UserService) {
        this.$state = $state;
        this.EventsService = EventsService;
        this.UserService = UserService;

    }

    join() {

        if (this.UserService.isAuthenticated()) {
            let _id = this.singleEvent['_id'];
            this.$state.go('eventJoin', { eventId: _id });
        } else {
            this.$state.go('login', {});
        }

    };

    getRestaurantLogo() {
        let restaurantLogoURL = 'http://www.almanac.com/sites/default/files/users/Almanac%20Staff/violet-292367_1920_0_full_width.jpg';
        return restaurantLogoURL;
    }

    static get $inject() {
        return ['$state', EventsService.name, UserService.name];
    }

}


export default ViewSingleEventComponent;
