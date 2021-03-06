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
    constructor($state, EventsService, UserService, TopicsService, LanguagesService, toastr) {
        this.$state = $state;
        this.EventsService = EventsService;
        this.UserService = UserService;
        this.TopicsService = TopicsService;
        this.LanguagesService = LanguagesService;
        this.toastr = toastr;

        this.getLanguages();
        this.getTopics();
    }

    static get $inject() {
        return ['$state', EventsService.name, UserService.name, TopicsService.name, LanguagesService.name, 'toastr'];
    }

    getLanguages() {
        this.LanguagesService.list().then(response => {
            this.languages = response;
        });
    }

    getTopics() {
        if (!this.topics) {
            this.TopicsService.list().then(response => {
                this.topics = response;
            });
        }
    }

    createEvent() {
        this.model.topics = [this.topic1._id];
        if (this.topic2) {
            this.model.topics.push(this.topic2._id);
        }
        if (this.topic3) {
            this.model.topics.push(this.topic3._id);
        }
        var postedModel = {
            name: this.model.name,
            language: this.model.language._id,
            topics: this.model.topics,
            offer: this.model.offer._id,
            users: [this.UserService.getCurrentUser()._id]
        }
        console.log(postedModel);

        this.EventsService.create(postedModel).then(data => {
            this.toastr.success('You have successfully created a new event.');
            this.$state.go('event', { eventId: data._id});
        });

    };

    uncheckOthers($index) {
        for (var i = 0; i < this.offers.length; i++) {
            if (i != $index) {
                this.offers[i].selected = false;
            }
        }
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


export default ViewCreateEventComponent;