'use strict';

import template from './view-profile.template.html';
import EventsService from './../../services/events/events.service';
import UserService from './../../services/user/user.service';

class ViewProfileComponent {
    constructor() {
        this.controller = ViewProfileComponentController;
        this.template = template;
        this.bindings = {
            event: '<',
        }

    }

    static get name() {
        return 'viewProfile';
    }


}

class ViewProfileComponentController {
    constructor($state, EventsService, UserService) {
        this.$state = $state;
        this.EventsService = EventsService;
        this.UserService = UserService;

    }

    static get $inject() {
        return ['$state', EventsService.name, UserService.name];
    }

}


export default ViewProfileComponent;
