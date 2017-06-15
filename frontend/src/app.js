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
import ViewEvent from './components/view-event/view-event';
import ViewEventEdit from './components/view-event-edit/view-event-edit';
import ViewEventCreate from './components/view-event-create/view-event-create';
import ViewLogin from './components/view-login/view-login';
import ViewSingleEvent from './components/view-single-event/view-single-event';

let app = angular.module('app', [
    uiRouter,
    angularMaterial,
    ngMdIcons,
    UserService.name,
    EventsService.name,
    AppContent.name,
    ViewEvents.name,
    ViewEvent.name,
    ViewEventEdit.name,
    ViewEventCreate.name,
    ViewLogin.name,
    ViewSingleEvent.name
]);

app.constant('API_URL', 'http://localhost:3000');
app.config(Routes);
app.config(Middlewares);


angular.element(document).ready(function() {
    return angular.bootstrap(document.body, [app.name], {
        strictDi: true
    });
});

export default app;
