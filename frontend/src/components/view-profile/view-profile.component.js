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

    // this.getLanguages();
    // this.getTopics();
    // this.getLevels();

    this.initUser();
  }

  $onInit() {
    this.user = {};
  }

  initUser() {
    let ctrl = this;
    this.UserService.getLoggedInUser().then(function (success) {
      ctrl.user = success;
    });
  }

  getLanguage(userLanguageID, index) {
    console.log(userLanguageID);
    console.log(index);
    // let ctrl = this;
    // this.LanguagesService.get(_id).then(function (success) {
    //   console.log(success);
    //   return success;
    // });
  }

  // getCurrentUser() {
  //   return this.UserService.getCurrentUser();
  // }

  // getLanguages() {
  //   this.LanguagesService.list().then(response => {
  //     this.languages = response;
  //   });
  // }
  //
  // getLevels() {
  //   this.LanguageLevelsService.list().then(response => {
  //     this.levels = response;
  //   });
  // }
  //
  // getTopics() {
  //   if (!this.topics) {
  //     this.TopicsService.list().then(response => {
  //       this.topics = response;
  //     });
  //   }
  // }

  addNewLanguage() {

  }

  addNewTopic() {

  }

  static get $inject() {
    return ['$state', EventsService.name, UserService.name, TopicsService.name, LanguagesService.name, LanguageLevelsService.name];
  }

}


export default ViewProfileComponent;
