'use strict';

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import angularMaterial from 'angular-material';
import 'angular-material/angular-material.css';

import ngMdIcons from 'angular-material-icons';

import EventsService from './services/events/events';
import UserService from './services/user/user';

import Routes from './config/routes';
import Middlewares from './config/middlewares';

import AppContent from './components/app-content/app-content';
import ViewEvents from './components/view-events/view-events';
import ViewCreateEvent from './components/view-create-event/view-create-event';
import ViewLogin from './components/view-login/view-login';
import ViewSingleEvent from './components/view-single-event/view-single-event';
import ViewProfile from './components/view-profile/view-profile';
import ViewAboutUs from './components/view-about-us/view-about-us';

let app = angular.module('app', [
    uiRouter,
    angularMaterial,
    ngMdIcons,
    UserService.name,
    EventsService.name,
    AppContent.name,
    ViewEvents.name,
    ViewCreateEvent.name,
    ViewLogin.name,
    ViewSingleEvent.name,
    ViewProfile.name,
    ViewAboutUs.name
]);

app.constant('API_URL', 'http://localhost:3000/api');
app.config(Routes);
app.config(Middlewares);
app.config(['$mdThemingProvider', function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('amber', {
            'default': '400'
        });
}]);


angular.element(document).ready(function() {
    return angular.bootstrap(document.body, [app.name], {
        strictDi: true
    });
});

export default app;