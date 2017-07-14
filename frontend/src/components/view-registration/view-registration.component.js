'use strict';


import UserService from "./../../services/user/user.service";
import LanguagesService from "./../../services/languages/languages.service";
import LanguageLevelsService from "./../../services/language-levels/language-levels.service";
import TopicsService from "./../../services/topics/topics.service";
import LocationService from "./../../services/location/location.service";
import UserLanguageService from "./../../services/user-languages/user-languages.service";

import template from "./view-registration.template.html";
import "./view-registration.style.css";

class ViewRegistrationComponent {
    constructor() {
        this.controller = ViewRegistrationComponentController;
        this.template = template;

    }

    static get name() {
        return 'viewRegistration';
    }

}

class ViewRegistrationComponentController {

    constructor(UserService, LanguagesService, LanguageLevelsService, TopicsService, LocationService, UserLanguageService) {
        this.UserService = UserService;
        this.LanguagesService = LanguagesService;
        this.LanguageLevelsService = LanguageLevelsService;
        this.TopicsService = TopicsService;
        this.LocationService = LocationService;
        this.UserLanguageService = UserLanguageService;
    }

    $onInit() {
        this.registrationStep = 1;
        this.choices = [0];
        this.user = {};
        this.user.languages = [];
        this.userChosenLanguages = [];
    }

    isAuthenticated() {
        return this.UserService.isAuthenticated();
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
        return [UserService.name, LanguagesService.name, LanguageLevelsService.name, TopicsService.name, LocationService.name, UserLanguageService.name];
    }

}

export default ViewRegistrationComponent;