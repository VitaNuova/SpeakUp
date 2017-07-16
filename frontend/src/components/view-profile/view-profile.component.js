'use strict';

import template from './view-profile.template.html';
import EventsService from './../../services/events/events.service';
import UserService from './../../services/user/user.service';
import TopicsService from './../../services/topics/topics.service';
import LanguagesService from './../../services/languages/languages.service';
import LanguageLevelsService from './../../services/language-levels/language-levels.service';

import './view-profile.style.css';

class ViewProfileComponent {
    constructor() {
        this.controller = ViewProfileComponentController;
        this.template = template;
        this.bindings = {
            user: '<',
        }

    }

    static get name() {
        return 'viewProfile';
    }


}

class ViewProfileComponentController {
    constructor($state, EventsService, UserService, TopicsService, LanguagesService, LanguageLevelsService) {
        this.$state = $state;
        this.EventsService = EventsService;
        this.UserService = UserService;
        this.TopicsService = TopicsService;
        this.LanguagesService = LanguagesService;
        this.LanguageLevelsService = LanguageLevelsService;

        this.$onChanges = function (changesObj) {
            if (changesObj.user) {
                console.log(changesObj.user);
                this.getLanguages();
                this.getTopics();
                // this.getLevels();
                // var setUser = (function(restaurant) {
                //     this.restaurant = restaurant.name
                // }).bind(this);
                // this.RestaurantsService.get(this.singleEvent.offer.restaurant).then(setUser);
            }
        };
    }

    // getLanguage(userLanguageID, index) {
    //     console.log(userLanguageID);
    //     console.log(index);
        // let ctrl = this;
        // this.LanguagesService.get(_id).then(function (success) {
        //   console.log(success);
        //   return success;
        // });
    // }

    getLanguages() {
        let ctrl = this;
        this.languages = {};
        this.user.languages.forEach(function(language) {
            ctrl.LanguagesService.get(language.language).then(function(userLanguage) {
                // console.log(userLanguage);
                ctrl.languages[language._id] = userLanguage;
            });
        });
    }

    getLevels() {
      this.LanguageLevelsService.list().then(response => {
        this.levels = response;
      });
    }

    getTopics() {
        let ctrl = this;
        this.topics = {};
        this.user.languages.forEach(function(language) {
            ctrl.topics[language._id] = [];
            language.topics.forEach(function(topic) {
                console.log(topic);
                ctrl.TopicsService.get(topic).then(function (fullTopic) {
                    ctrl.topics[language._id].push(fullTopic);
                });
            });
        });
    }

    addNewLanguage() {

    }

    addNewTopic() {

    }

    static get $inject() {
        return ['$state', EventsService.name, UserService.name, TopicsService.name, LanguagesService.name, LanguageLevelsService.name];
    }

}


export default ViewProfileComponent;
