'use strict';

import EventsComponent from './../components/view-events/view-events.component';
import LoginComponent from './../components/view-login/view-login.component';
import ViewCreateEventComponent from './../components/view-create-event/view-create-event.component';
import ProfileComponent from './../components/view-profile/view-profile.component';
import AboutUsComponent from './../components/view-about-us/view-about-us.component';
import ViewSingleEventComponent from './../components/view-single-event/view-single-event.component';

import EventsService from './../services/events/events.service';
import events from './events-mock'

resolveEvent.$inject = ['$stateParams', EventsService.name];

function resolveEvent($stateParams, eventsService) {
    return eventsService.get($stateParams.eventId);
    // for (var i = 0; i < events.length; i++) {
    //     if (events[i]._id == $stateParams.eventId) {
    //         console.log("inside resolveevent");
    //         return events[i];
    //     }
    // }
}

resolveEvents.$inject = [EventsService.name];

function resolveLanguages() {
    return [
            { id: 1, name: 'Scooby Doo' },
            { id: 2, name: 'Shaggy Rodgers' },
            { id: 3, name: 'Fred Jones' },
            { id: 4, name: 'Daphne Blake' },
            { id: 5, name: 'Velma Dinkley' }
        ];
}

function resolveOffers() {
    return [
        {
            restaurant: {
                name: "That Mexican Place",
                location:
                    {
                        x: 48.1894672,
                        y: 11.6215395
                    }
            },
            from: 2017-6-15,
            to: 2017-6-23,
            numOfPeople: 5,
            discount: 25
        },
        {
            restaurant: {
                name: "That Thai Place",
                location: {
                    x: 48.25606990000001,
                    y: 11.551696600000014
                }
            },
            from: "2017-06-17T07:00:00.123Z",
            to: "2017-06-21T07:00:00.123Z",
            numOfPeople: 5,
            discount: 20
        },
        {
            restaurant: {
                name: "That Thai Place",
                location: {
                    x: 48.25606990000001,
                    y: 11.551696600000014
                }
            },
            from: "2017-06-17T07:00:00.123Z",
            to: "2017-06-21T07:00:00.123Z",
            numOfPeople: 5,
            discount: 20
        },
        {
            restaurant: {
                name: "That Mexican Place",
                location:
                    {
                        x: 48.1894672,
                        y: 11.6215395
                    }
            },
            from: 2017-6-15,
            to: 2017-6-23,
            numOfPeople: 5,
            discount: 25
        },
        {
            restaurant: {
                name: "That Mexican Place",
                location:
                    {
                        x: 48.1894672,
                        y: 11.6215395
                    }
            },
            from: 2017-6-15,
            to: 2017-6-23,
            numOfPeople: 5,
            discount: 25
        },
        {
            restaurant: {
                name: "That Mexican Place",
                location:
                    {
                        x: 48.1894672,
                        y: 11.6215395
                    }
            },
            from: 2017-6-15,
            to: 2017-6-23,
            numOfPeople: 5,
            discount: 25
        },
        {
            restaurant: {
                name: "That Mexican Place",
                location:
                    {
                        x: 48.1894672,
                        y: 11.6215395
                    }
            },
            from: 2017-6-15,
            to: 2017-6-23,
            numOfPeople: 5,
            discount: 25
        },
        {
            restaurant: {
                name: "That Mexican Place",
                location:
                    {
                        x: 48.1894672,
                        y: 11.6215395
                    }
            },
            from: 2017-6-15,
            to: 2017-6-23,
            numOfPeople: 5,
            discount: 25
        },
        {
            restaurant: {
                name: "That Mexican Place",
                location:
                    {
                        x: 48.1894672,
                        y: 11.6215395
                    }
            },
            from: 2017-6-15,
            to: 2017-6-23,
            numOfPeople: 5,
            discount: 25
        }
    ];
}

function resolveEvents(eventsService) {
    console.log("inside resolveevents" + events[0]);
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
                languages: resolveLanguages,
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