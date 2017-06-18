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
            users: []
        }
        console.log(postedModel);
        // delete this.model.language.image
        // delete this.topic1.image;

        // console.log(this.model);
        // console.log(JSON.stringify(this.model));

        this.EventsService.create(postedModel).then(data => {
            // this. = JSON.parse(JSON.stringify(data));
            console.log("POSTED");
            console.log(data);
            this.$state.go('events');
        });

        // let _id = this.movie['_id'];
        //
        // this.MoviesService.update(this.model).then(data => {
        //     this.movie = JSON.parse(JSON.stringify(data));
        //
        //     this.$state.go('movie',{ movieId:_id});
        // });

    };

}


export default ViewCreateEventComponent;
