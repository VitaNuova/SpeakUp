'use strict';

import TopicsService from './../../services/topics/topics.service';

import template from './view-register-topics.template.html';
import './view-register-topics.style.css';

class ViewRegisterTopicsComponent {
    constructor() {
        this.controller = ViewRegisterTopicsComponentController;
        this.template = template;
    }

    static get name() {
        return 'viewRegisterTopics';
    }

}

class ViewRegisterTopicsComponentController {
    constructor($state, $stateParams, TopicsService) {
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.TopicsService = TopicsService;
        this.user = this.$stateParams.user;
        console.log(this.user);
    }

    $onInit() {
        var ctrl = this;
        this.TopicsService.list().then(
            function(data) {
                ctrl.topics = data;
                console.log('topics ' + JSON.stringify(ctrl.topics));
            }
        );


    }

    toggle(topic) {
        topic.selected = !topic.selected;
    }

    submit() {
        var chosen_topics = [];
        for(var i = 0; i < this.topics.length; i++) {
            if(this.topics[i].selected) {
                chosen_topics.push(this.topics[i]);
            }
        }
        for(var i = 0; i < this.user.languages.length; i++) {
            this.user.languages[i].topics = chosen_topics;
        }

        console.log('user' + JSON.stringify(this.user));
        this.$state.go('registerLocation', {user: this.user});
    }

    static get $inject() {
        return ['$state', '$stateParams', TopicsService.name];
    }

}

export default ViewRegisterTopicsComponent;