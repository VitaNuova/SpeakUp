'use strict';

import EventsComponent from './../components/view-events/view-events.component';
import EventComponent from './../components/view-event/view-event.component';
import EventEditComponent from './../components/view-event-edit/view-event-edit.component';
import EventCreateComponent from './../components/view-event-create/view-event-create.component';
import LoginComponent from './../components/view-login/view-login.component';
import ViewSingleEventComponent from './../components/view-single-event/view-single-event.component'

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
        .state('eventAdd', {
            url: '/events/new',
            component: EventCreateComponent.name
        })
        .state('event', {
            url: '/events/:eventId',
            component: EventComponent.name,
            resolve: {
                event: resolveEvent
            }

        })
        .state('eventEdit', {
            url: '/events/:eventId/edit',
            component: EventEditComponent.name,
            resolve: {
                event: resolveEvent
            }
        })
        .state('login', {
            url: '/login',
            component: LoginComponent.name,
        })


}
