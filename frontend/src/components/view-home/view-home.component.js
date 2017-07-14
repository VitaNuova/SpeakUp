'use strict';


import UserService from "./../../services/user/user.service";
import LanguagesService from "./../../services/languages/languages.service";
import LanguageLevelsService from "./../../services/language-levels/language-levels.service";
import TopicsService from "./../../services/topics/topics.service";
import LocationService from "./../../services/location/location.service";
import UserLanguageService from "./../../services/user-languages/user-languages.service";

import template from "./view-home.template.html";
import "./view-home.style.css";

class ViewHomeComponent {
    constructor() {
        this.controller = ViewHomeComponentController;
        this.template = template;

    }

    static get name() {
        return 'viewHome';
    }

}

class ViewHomeComponentController {

    constructor($state, $window, UserService, LanguagesService, LanguageLevelsService, TopicsService, LocationService, UserLanguageService) {
        this.$state = $state;
        this.$window = $window;
        this.UserService = UserService;
        this.LanguagesService = LanguagesService;
        this.LanguageLevelsService = LanguageLevelsService;
        this.TopicsService = TopicsService;
        this.LocationService = LocationService;
        this.UserLanguageService = UserLanguageService;
    }

    $onInit() {
        this.login = {};
        this.registrationStep = 1;
        this.choices = [0];
        this.user = {};
        this.user.languages = [];
        this.userChosenLanguages = [];
    }

    isAuthenticated() {
        return this.UserService.isAuthenticated();
    }

    submit() {
        let username = this.login.username;
        let password = this.login.password;

        this.UserService.login(username, password).then((success) => {
            this.$window.localStorage.setItem('jwtToken', success.data.token);
            this.$state.go('events', {});
        }, (error) => {
            this.loginFailed = true;
            console.log("unauthorized");
        })
    }

    fetchLanguages() {
        let ctrl = this;
        this.LanguagesService.list().then(
            function (data) {
                ctrl.languages = data;
            }
        );

        this.LanguageLevelsService.list().then(
            function (data) {
                ctrl.levels = data;
            }
        );
    }

    fetchTopics() {
        let ctrl = this;

        this.TopicsService.list().then(
            function (data) {
                ctrl.topics = data;
            }
        );
    }


    moreLanguages() {
        let curLang = this.userChosenLanguages[this.choices.length - 1];

        if (curLang !== null && curLang !== undefined && curLang.languageLevel !== null
            && Object.keys(curLang).length !== 0 && curLang.constructor === Object) {
            this.choices.push(this.choices.length);
        }
    }

    lessLanguages() {
        if (this.choices.length > 1) {
            let curLang = this.userChosenLanguages[this.choices.length - 1];
            if (curLang != null) {
                this.userChosenLanguages.splice(this.userChosenLanguages.length - 1);
            }
            this.choices.splice(this.choices.length - 1);
            console.log('choices after splice ' + this.choices);
        }
    }


    toggle(topic) {
        topic.selected = !topic.selected;
    }

    addLangsAndTopics() {
        for (let j = 0; j < this.userChosenLanguages.length; j++) {
            this.userChosenLanguages[j].topics = [];
            for (let i = 0; i < this.topics.length; i++) {
                if (this.topics[i].selected) {
                    this.userChosenLanguages[j].topics.push(this.topics[i]._id);
                }
            }
        }

        for (let i = 0; i < this.userChosenLanguages.length; i++) {
            this.UserLanguageService.create(this.userChosenLanguages[i]).then(
                (data) => {
                    this.user.languages.push(data._id);
                }
            );
        }
    }

    initLocation() {
        this.location = 'Marienplatz';
    }

    addLocationAndReg() {
        this.isDisabledRegButton = true;
        this.user.location = {};

        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({"address": this.location}, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                let location = {};
                location.x = results[0].geometry.location.lat();
                location.y = results[0].geometry.location.lng();

                this.LocationService.create(location).then(
                    (data) => {
                        console.log('location created ' + JSON.stringify(data));
                        this.user.location = data._id;
                        this.register();
                    }
                );
            }
        });
    }

    register() {
        let postedModel = {
            username: this.user.name,
            password: this.user.password,
            email: this.user.email,
            imagePath: this.user.image,
            location: this.user.location,
            languages: this.user.languages
        };

        this.UserService.register(postedModel).then(data => {
                this.error = false;
                this.success = true;
                this.message = ' Registration successful! You can login now.';
            }, err => {
                this.success = false;
                this.error = true;
                this.message = ' Registration failed!';
                if (err.data.code === 11000) {
                    this.message += ' Username exists already!';
                }

                this.registrationStep = 1;
                this.isDisabledRegButton = false;
            }
        );
    }

    static get $inject() {
        return ['$state', '$window', UserService.name, LanguagesService.name, LanguageLevelsService.name, TopicsService.name, LocationService.name, UserLanguageService.name];
    }

}

export default ViewHomeComponent;