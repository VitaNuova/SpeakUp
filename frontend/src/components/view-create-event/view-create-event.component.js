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
            offers: '<'
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

    uncheckOthers($index) {
        for(var i = 0; i < this.offers.length; i++) {
            if(i != $index) {
                this.offers[i].selected = false;
            }
        }
        console.log(this.model.offer);
    }


}


export default ViewCreateEventComponent;
