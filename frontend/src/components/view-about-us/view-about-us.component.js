'use strict';

import template from './view-about-us.template.html';
import EventsService from './../../services/events/events.service';
import UserService from './../../services/user/user.service';

class ViewAboutUsComponent {
    constructor() {
        this.controller = ViewAboutUsComponentController;
        this.template = template;
        this.bindings = {
            event: '<',
        }

    }

    static get name() {
        return 'viewAboutUs';
    }


}

class ViewAboutUsComponentController {
    constructor($state, EventsService, UserService) {
        this.$state = $state;
        this.EventsService = EventsService;
        this.UserService = UserService;

    }

    static get $inject() {
        return ['$state', EventsService.name, UserService.name];
    }

}


export default ViewAboutUsComponent;
