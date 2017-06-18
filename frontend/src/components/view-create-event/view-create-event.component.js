'use strict';

import template from './view-create-event.template.html';
import EventsService from './../../services/events/events.service';
import UserService from './../../services/user/user.service';

import './view-create-event.style.css';

class ViewCreateEventComponent {
    constructor() {
        this.controller = ViewCreateEventComponentController;
        this.template = template;
        this.bindings = {
            languages: '<',
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

    getLanguages(){
        console.log(this.language);
        return this.languages;
    }

}


export default ViewCreateEventComponent;
