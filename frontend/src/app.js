'use strict';

import angular from "angular";
import uiRouter from "@uirouter/angularjs";

import EventsService from "./services/events/events";
import UserService from "./services/user/user";
import TopicsService from "./services/topics/topics";
import LanguagesService from "./services/languages/languages";
import LanguageLevelsService from "./services/language-levels/language-levels";
import LocationService from "./services/location/location";
import UserLanguageService from "./services/user-languages/user-languages";
import OffersService from "./services/offers/offers";
import Routes from "./config/routes";

import ngmap from 'ngmap';

import AppContent from "./components/app-content/app-content";
import ViewEvents from "./components/view-events/view-events";
import ViewCreateEvent from "./components/view-create-event/view-create-event";
import ViewLogin from "./components/view-login/view-login";
import ViewSingleEvent from "./components/view-single-event/view-single-event";
import ViewProfile from "./components/view-profile/view-profile";
import ViewAboutUs from "./components/view-about-us/view-about-us";
import ViewRegisterLanguage from "./components/view-register-language/view-register-language";
import ViewRegisterTopics from "./components/view-register-topics/view-register-topics";
import ViewRegisterName from "./components/view-register-name/view-register-name";
import ViewRegisterLocation from "./components/view-register-location/view-register-location";

let app = angular.module('app', [
    uiRouter,
    ngmap,
    UserService.name,
    EventsService.name,
    TopicsService.name,
    LanguagesService.name,
    LanguageLevelsService.name,
    LocationService.name,
    UserLanguageService.name,
    OffersService.name,
    AppContent.name,
    ViewEvents.name,
    ViewCreateEvent.name,
    ViewLogin.name,
    ViewSingleEvent.name,
    ViewProfile.name,
    ViewAboutUs.name,
    ViewRegisterName.name,
    ViewRegisterLanguage.name,
    ViewRegisterTopics.name,
    ViewRegisterLocation.name
]);

app.constant('API_URL', 'http://localhost:3000/api');
app.config(Routes);
app.config(['$httpProvider', ($httpProvider) => {
    $httpProvider.interceptors.push(['$q', function ($q) {
        return {
            'request': function (config) {
                //Making a request to the API Server
                // if (config.url.indexOf(API_URL) === 0) {
                //     let token = $window.localStorage['jwtToken'];
                //
                //     if (token) {
                //         config.headers.Authorization = 'JWT ' + token;
                //     }
                // }

                return config;
            },
            // optional method
            'requestError': function (rejection) {
                return $q.reject(rejection);
            },
            // optional method
            'response': function (response) {
                //Receiving response from  the API Server
                // if (response && response.config.url.indexOf(API_URL) === 0) {
                //
                //     // If a token was sent back, save it
                //     if (response.data.hasOwnProperty('token')) {
                //         $window.localStorage['jwtToken'] = response.data.token;
                //     }
                // }

                return response;
            },
            // optional method
            'responseError': function (rejection) {
                // do something on error
                // if (rejection.status == 400 || rejection.status == 401) {
                //     $state.go('login', {});
                // }

                return $q.reject(rejection);
            }
        }
    }])
}]);

angular.element(document).ready(function () {
    return angular.bootstrap(document.body, [app.name], {
        strictDi: true
    });
});

export default app;