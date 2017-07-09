'use strict';

import UserService from './../../services/user/user.service';
import LanguagesService from './../../services/languages/languages.service';
import LanguageLevelsService from './../../services/language-levels/language-levels.service';
import TopicsService from './../../services/topics/topics.service';
import LocationService from './../../services/location/location.service';
import UserLanguageService from './../../services/user-languages/user-languages.service';

import template from './view-login.template.html';
import './view-login.style.css';

class ViewLoginComponent {
    constructor() {
        this.controller = ViewLoginComponentController;
        this.template = template;

    }

    static get name() {
        return 'viewLogin';
    }
}

class ViewLoginComponentController {

    constructor($state, UserService, LanguagesService, LanguageLevelsService, TopicsService, LocationService, UserLanguageService) {
        this.$state = $state;
        this.UserService = UserService;
        this.LanguagesService = LanguagesService;
        this.LanguageLevelsService = LanguageLevelsService;
        this.TopicsService = TopicsService;
        this.LocationService = LocationService;
        this.UserLanguageService = UserLanguageService;
    }

    $onInit() {
        this.login = {};
        this.userChosenLanguages = [];
        this.registrationStep = 1;
        this.choices = [0];
    }

    submit() {
        let user = this.login.username;
        let password = this.login.password;
        this.UserService.login(user, password).then(() => {
            this.$state.go('events', {});
        }, () => {
            this.loginFailed = true;
            console.log("unauthorized");
        });
    }

    initializeRegistration() {
        this.user = {};
        this.language = {};
    }

    fetchLanguages() {
         var ctrl = this;
         this.LanguagesService.list().then(
             function(data) {
                 ctrl.languages = data;
                 //console.log('languages ' + JSON.stringify(ctrl.languages));
             }
         );

         this.LanguageLevelsService.list().then(
             function(data) {
                 ctrl.levels = data;
                 //console.log('levels ' + JSON.stringify(ctrl.levels));
             }
         );
    }

    fetchTopics() {
        // console.log('user after langs' + JSON.stringify(this.user));

         var ctrl = this;
         this.TopicsService.list().then(
             function(data) {
                 ctrl.topics = data;
                 //console.log('topics ' + JSON.stringify(ctrl.topics));
             }
         );
        //console.log('user after two steps ' + JSON.stringify(user));
    }

    pushLast() {
        console.log('user chosen langs' + JSON.stringify(this.userChosenLanguages));
        this.userChosenLanguages.push(this.language);
        this.language = {};
    }

    moreLanguages() {
        this.userChosenLanguages.push(this.language);
        this.language = {};
        this.choices.push(this.choices.length);
    }

    lessLanguages() {
        this.userChosenLanguages.push(this.language);
        this.language = {};
        if(this.choices.length > 1) {
            this.choices.splice(this.choices.length - 1);
            this.userChosenLanguages.splice(this.userChosenLanguages.length - 1);
        }
    }


    toggle(topic) {
        topic.selected = !topic.selected;
    }

    addLangsAndTopics() {
        for (var j = 0; j < this.userChosenLanguages.length; j++) {
            this.userChosenLanguages[j].topics = [];
            for (var i = 0; i < this.topics.length; i++) {
                if (this.topics[i].selected) {
                    this.userChosenLanguages[j].topics.push(this.topics[i]._id);
                }
            }

        }

        /*var chosen_topics = [];
        for (var i = 0; i < this.topics.length; i++) {
            if (this.topics[i].selected) {
                chosen_topics.push(this.topics[i]);
            }
        }*/
        /*for (var i = 0; i < this.userChosenLanguages.length; i++) {
            this.userChosenLanguages[i].topics = [];
            for (var j = 0; j < chosen_topics.length; j++) {
                this.userChosenLanguages[j].topics.push(chosen_topics[j]._id);
            }
        }*/
        this.user.languages = [];
        for (var i = 0; i < this.userChosenLanguages.length; i++) {
            console.log('user language posted ' + JSON.stringify(this.userChosenLanguages[i]));
            this.UserLanguageService.create(this.userChosenLanguages[i]).then(
                (data) => {
                    console.log('user language created ' + JSON.stringify(data));
                    this.user.languages.push(data._id);
                }
            );

        }

    }

    dump() {
        console.log('dumping chosen langs');
        console.log(JSON.stringify(this.userChosenLanguages));
    }


    initLocation() {
        this.location = 'Marienplatz';
    }

    addLocationAndReg() {
        this.user.location = {};

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { "address": this.location }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                var location = {};
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

        console.log('user ' + JSON.stringify(this.user));
    }

    register() {
        console.log('user before sending to db ' + JSON.stringify(this.user));

        var postedModel = {
            username: this.user.name,
            password: this.user.password,
            email: this.user.email,
            imagePath: this.user.image,
            location: this.user.location,
            languages: this.user.languages
        };
        console.log('posted model' + JSON.stringify(postedModel));

        this.UserService.register(postedModel).then(data => {
           // this.$mdToast.show(
           //     this.$mdToast.simple()
           //         .textContent('Your account has been successfully created!')
           //         .hideDelay(3000)
           // );
            console.log('data from post response ' + JSON.stringify(data));
            this.$state.go('login');
        });
    }

    static get $inject() {
        return ['$state', UserService.name, LanguagesService.name, LanguageLevelsService.name, TopicsService.name, LocationService.name, UserLanguageService.name];
    }

}

export default ViewLoginComponent;