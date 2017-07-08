'use strict';

import template from './view-events.template.html';
import EventsService from './../../services/events/events.service';
import UserService from './../../services/user/user.service';

import './view-events.style.css';


class ViewEventsComponent {
    constructor() {
        this.controller = ViewEventsComponentController;
        this.template = template;
        this.bindings = {
            events: '<',
        }
    }

    static get name() {
        return 'viewEvents';
    }


}

class ViewEventsComponentController {
    constructor($state, $scope, EventsService, UserService) {
        this.$state = $state;
        this.$scope = $scope;
        this.EventsService = EventsService;
        this.UserService = UserService;
    }

    details(event) {
        let _id = event['_id'];
        this.$state.go('event', { eventId: _id });
    };

    edit(event) {

        if (this.UserService.isAuthenticated()) {
            let _id = event['_id'];
            this.$state.go('eventEdit', { eventId: _id });
        } else {
            this.$state.go('login', {});
        }
    };

    newEvent() {

        if (this.UserService.isAuthenticated()) {
            this.$state.go('eventAdd', {});
        } else {
            this.$state.go('login', {});
        }

    };


    delete(event) {
        if (this.UserService.isAuthenticated()) {
            let _id = event['_id'];

            this.EventsService.delete(_id).then(response => {
                let index = this.events.map(x => x['_id']).indexOf(_id);
                this.events.splice(index, 1);
                this.$scope.$apply();
            })

        } else {
            this.$state.go('login', {});
        }
    };


    static get $inject() {
        return ['$state', '$scope', EventsService.name, UserService.name];
    }

}

export default ViewEventsComponent;