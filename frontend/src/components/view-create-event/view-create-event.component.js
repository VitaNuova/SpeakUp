'use strict';

import template from './view-create-event.template.html';
import EventsService from './../../services/events/events.service';
import UserService from './../../services/user/user.service';
import TopicsService from './../../services/topics/topics.service';
import LanguagesService from './../../services/languages/languages.service';

import './view-create-event.style.css';

class ViewCreateEventComponent {
    constructor() {
        this.controller = ViewCreateEventComponentController;
        this.template = template;
        this.bindings = {
            offers: '<'
        }
    }

    static get name() {
        return 'viewCreateEvent';
    }

}

class ViewCreateEventComponentController {
    constructor($state, EventsService, UserService, TopicsService, LanguagesService) {
        this.$state = $state;
        this.EventsService = EventsService;
        this.UserService = UserService;
        this.TopicsService = TopicsService;
        this.LanguagesService = LanguagesService;
    }

    static get $inject() {
        return ['$state', EventsService.name, UserService.name, TopicsService.name, LanguagesService.name];
    }

    getLanguages() {
        console.log(this.language);
        this.LanguagesService.list().then(response => {
            this.languages = response;
        });
    }

    getTopics() {
        console.log(this.topics);
        if (!this.topics) {
            this.TopicsService.list().then(response => {
                this.topics = response;
            });
        }
    }

    createEvent() {
        this.model.topics = [this.topic1._id];
        if(this.topic2) {
            this.model.topics.push(this.topic2._id);
        }
        if(this.topic3) {
            this.model.topics.push(this.topic3._id);
        }
        var postedModel = {
            name: this.model.name,
            language: this.model.language._id,
            topics: this.model.topics,
            offer: this.model.offer._id,
            users: []
        }
        console.log(postedModel);

        this.EventsService.create(postedModel).then(data => {
            this.$state.go('events');
        });

    };

    uncheckOthers($index) {
        for(var i = 0; i < this.offers.length; i++) {
            if(i != $index) {
                this.offers[i].selected = false;
            }
        }
    }

}


export default ViewCreateEventComponent;
