'use strict';

import EventsComponent from './../components/view-events/view-events.component';
import LoginComponent from './../components/view-login/view-login.component';
import ViewCreateEventComponent from './../components/view-create-event/view-create-event.component';
import ProfileComponent from './../components/view-profile/view-profile.component';
import AboutUsComponent from './../components/view-about-us/view-about-us.component';
import ViewSingleEventComponent from './../components/view-single-event/view-single-event.component';
import ViewRegisterNameComponent from './../components/view-register-name/view-register-name.component';
import ViewRegisterLanguageComponent from './../components/view-register-language/view-register-language.component';
import ViewRegisterTopicsComponent from './../components/view-register-topics/view-register-topics.component';
import ViewRegisterLocationComponent from './../components/view-register-location/view-register-location.component';

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

    $urlRouterProvider.otherwise("/");

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
            url: '/',
            component: LoginComponent.name
        })
        .state('registerName', {
            url: '/register-name',
            component: ViewRegisterNameComponent.name
        })
        .state('registerLanguage', {
            url: '/register-language',
            component: ViewRegisterLanguageComponent.name,
            params: {
                user: null
            }
        })
        .state('registerTopics', {
            url: '/register-topics',
            component: ViewRegisterTopicsComponent.name,
            params: {
                user: null
            }
        })
        .state('registerLocation', {
            url: '/register-location',
            component: ViewRegisterLocationComponent.name,
            params: {
                user: null
            }
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