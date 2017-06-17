'use strict';

import template from './view-create-event.template.html';
import EventsService from './../../services/events/events.service';
import UserService from './../../services/user/user.service';

class ViewCreateEventComponent {
    constructor() {
        this.controller = ViewCreateEventComponentController;
        this.template = template;
        this.bindings = {
            event: '<',
        }

    }

    static get name() {
        return 'viewCreateEvent';
    }


}

class ViewCreateEventComponentController {
    constructor($state, EventsService, UserService) {
        this.$state = $state;
        this.EventsService = EventsService;
        this.UserService = UserService;

    }

    static get $inject() {
        return ['$state', EventsService.name, UserService.name];
    }

}


export default ViewCreateEventComponent;
