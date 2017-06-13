'use strict';

import template from './view-event-edit.template.html';

import EventsService from './../../services/events/events.service';

class ViewEventEditComponent {
    constructor() {
        this.controller = ViewEventEditComponentController;
        this.template = template;
        this.bindings = {
            event: '<',
        }
    }

    static get name() {
        return 'viewEventEdit';
    }
}

class ViewEventEditComponentController {
    constructor($state, EventsService) {
        this.model = {};
        this.$state = $state;
        this.EventsService = EventsService;
    }

    $onInit() {
        //Clone the Event Data
        this.model = JSON.parse(JSON.stringify(this.event))
    }

    cancel() {
        this.model = JSON.parse(JSON.stringify(this.event));
        this.$state.go('events', {});
    };

    save() {
        let _id = this.event['_id'];

        this.EventsService.update(this.model).then(data => {
            this.event = JSON.parse(JSON.stringify(data));

            this.$state.go('event', { eventId: _id });
        });

    };

    delete() {
        let _id = this.event['_id'];

        this.EventsService.delete(_id).then(response => {
            this.$state.go('events', {});
        });
    };

    static get $inject() {
        return ['$state', EventsService.name];
    }

}


export default ViewEventEditComponent;