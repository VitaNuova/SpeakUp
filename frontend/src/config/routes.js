'use strict';

import EventsComponent from './../components/view-events/view-events.component';
import LoginComponent from './../components/view-login/view-login.component';
import CreateEventComponent from './../components/view-create-event/view-create-event.component';
import ProfileComponent from './../components/view-profile/view-profile.component';
import AboutUsComponent from './../components/view-about-us/view-about-us.component';
import ViewSingleEventComponent from './../components/view-single-event/view-single-event.component';

import EventsService from './../services/events/events.service';
import events from './events-mock'

resolveEvent.$inject = ['$stateParams', EventsService.name];

function resolveEvent($stateParams, eventsService) {
    // return eventsService.get($stateParams.eventId);
    for(var i = 0; i < events.length; i++) {
        if(events[i]._id == $stateParams.eventId) {
            console.log("inside resolveevent ");
            return events[i];
        }
    }
}

resolveEvents.$inject = [EventsService.name];

function resolveEvents(eventsService) {
    //return eventsService.list();
    console.log("inside resolveevents" + events[0]);
    return events;
}


config.$inject = ['$stateProvider', '$urlRouterProvider'];
export default function config($stateProvider, $urlRouterProvider) {

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
       /* .state('event', {
            url: '/events/:eventId',
            component: EventComponent.name,
            resolve: {
                event: resolveEvent
            }

        })*/
        .state('event', {
            url: '/events/:eventId',
            component: ViewSingleEventComponent.name,
            resolve: {
                singleEvent: resolveEvent
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
