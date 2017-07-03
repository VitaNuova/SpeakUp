'use strict';

import LanguagesService from './../../services/languages/languages.service';
import LanguageLevelsService from './../../services/language-levels/language-levels.service';

import template from './view-register-language.template.html';
import './view-register-language.style.css';

class ViewRegisterLanguageComponent {
    constructor() {
        this.controller = ViewRegisterLanguageComponentController;
        this.template = template;
    }

    static get name() {
        return 'viewRegisterLanguage';
    }

}

class ViewRegisterLanguageComponentController {
    constructor($state, $stateParams, LanguagesService, LanguageLevelsService) {
        this.$state = $state;
        //this.$stateParams = $stateParams;
        this.LanguagesService = LanguagesService;
        this.LanguageLevelsService = LanguageLevelsService;
       // this.user = this.$stateParams.user;
        this.user = $stateParams.user;
        this.chosen_languages = [];
        this.choices = [0];
    }

    $onInit() {
        var ctrl = this;
        this.LanguagesService.list().then(
           function(data) {
               ctrl.languages = data;
               console.log('languages ' + JSON.stringify(ctrl.languages));
           }
        );

        this.LanguageLevelsService.list().then(
            function(data) {
                ctrl.levels = data;
                console.log('levels ' + JSON.stringify(ctrl.levels));
            }
        );

    }

    more() {
        console.log(JSON.stringify(this.chosen_languages[this.choices.length - 1]));
        this.choices.push(this.choices.length);
    }

    less() {
        if(this.choices.length > 1) {
            this.choices.splice(this.choices.length - 1);
            this.chosen_languages.splice(this.chosen_languages.length - 1);
        }
    }

    submit() {
        this.user.languages = this.chosen_languages;
        console.log(this.user);
        this.$state.go('registerTopics', {user: this.user});
    }

    static get $inject() {
        return ['$state', '$stateParams', LanguagesService.name, LanguageLevelsService.name];
    }

}

export default ViewRegisterLanguageComponent;