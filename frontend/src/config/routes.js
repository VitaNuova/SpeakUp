'use strict';

import EventsComponent from './../components/view-events/view-events.component';
import LoginComponent from './../components/view-login/view-login.component';
import ViewCreateEventComponent from './../components/view-create-event/view-create-event.component';
import ProfileComponent from './../components/view-profile/view-profile.component';
import AboutUsComponent from './../components/view-about-us/view-about-us.component';
import ViewSingleEventComponent from './../components/view-single-event/view-single-event.component';

import EventsService from './../services/events/events.service';
import OffersService from './../services/offers/offers.service';

resolveEvent.$inject = ['$stateParams', EventsService.name];

function resolveEvent($stateParams, eventsService) {
    return eventsService.get($stateParams.eventId);
}

resolveOffers.$inject = [OffersService.name];

function resolveOffers(offersService) {
    return offersService.list();
}

resolveEvents.$inject = [EventsService.name];

function resolveEvents(eventsService) {
    return eventsService.list();
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
            component: ViewCreateEventComponent.name,
            resolve: {
                offers: resolveOffers
            }
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
        // .state('eventEdit', {
        //     url: '/events/:eventId/edit',
        //     component: EventEditComponent.name,
        //     resolve: {
        //         event: resolveEvent
        //     }
        // })
        .state('login', {
            url: '/login',
            component: LoginComponent.name
        })
        .state('profile', {
            url: '/profile',
            component: ProfileComponent.name,
        })
        .state('aboutUs', {
            url: '/about-us',
            component: AboutUsComponent.name,
        })
}