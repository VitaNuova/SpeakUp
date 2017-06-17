'use strict';

import EventsComponent from './../components/view-events/view-events.component';
import LoginComponent from './../components/view-login/view-login.component';
import CreateEventComponent from './../components/view-create-event/view-create-event.component';
import ProfileComponent from './../components/view-profile/view-profile.component';
import AboutUsComponent from './../components/view-about-us/view-about-us.component';

import EventsService from './../services/events/events.service';


resolveEvent.$inject = ['$stateParams', EventsService.name];

function resolveEvent($stateParams, eventsService) {
    return eventsService.get($stateParams.eventId);
}

resolveEvents.$inject = [EventsService.name];

function resolveEvents(eventsService) {
    console.log(eventsService.list());
    return eventsService.list();
}


config.$inject = ['$stateProvider', '$urlRouterProvider'];
export default function config($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /home
    $urlRouterProvider.otherwise("/events");

    $stateProvider
        .state('events', {
            url: '/events',
            component: EventsComponent.name,
            resolve: {
                events: resolveEvents
            }
        })
        .state('login', {
            url: '/login',
            component: LoginComponent.name,
        })
        .state('createEvent', {
            url: '/createEvent',
            component: CreateEventComponent.name,
        })
        .state('profile', {
            url: '/profile',
            component: ProfileComponent.name,
        })
        .state('aboutUs', {
            url: '/aboutUs',
            component: AboutUsComponent.name,
        })
}
