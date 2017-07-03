'use strict';

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import angularMaterial from 'angular-material';
import 'angular-material/angular-material.css';

import ngMdIcons from 'angular-material-icons';
import ngmap from 'ngmap';

import EventsService from './services/events/events';
import UserService from './services/user/user';
import TopicsService from './services/topics/topics';
import LanguagesService from './services/languages/languages';
import OffersService from './services/offers/offers';
import LanguageLevelsService from './services/language-levels/language-levels';

import Routes from './config/routes';
import Middlewares from './config/middlewares';

import AppContent from './components/app-content/app-content';
import ViewEvents from './components/view-events/view-events';
import ViewCreateEvent from './components/view-create-event/view-create-event';
import ViewLogin from './components/view-login/view-login';
import ViewSingleEvent from './components/view-single-event/view-single-event';
import ViewProfile from './components/view-profile/view-profile';
import ViewAboutUs from './components/view-about-us/view-about-us';
import ViewRegisterName from './components/view-register-name/view-register-name';
import ViewRegisterLanguage from './components/view-register-language/view-register-language';
import ViewRegisterTopics from './components/view-register-topics/view-register-topics';
import ViewRegisterLocation from './components/view-register-location/view-register-location';

let app = angular.module('app', [
    uiRouter,
    angularMaterial,
    ngMdIcons,
    ngmap,
    UserService.name,
    EventsService.name,
    TopicsService.name,
    LanguagesService.name,
    LanguageLevelsService.name,
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
app.config(Middlewares);
app.config(['$mdThemingProvider', function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('amber', {
            'default': '400'
        })
        .accentPalette('green', {
            'default': '400'
        });
}]);


angular.element(document).ready(function() {
    return angular.bootstrap(document.body, [app.name], {
        strictDi: true
    });
});

export default app;