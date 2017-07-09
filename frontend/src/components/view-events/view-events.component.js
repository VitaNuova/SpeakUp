'use strict';

import template from "./view-events.template.html";
import EventsService from "./../../services/events/events.service";
import UserService from "./../../services/user/user.service";
import RestaurantService from "./../../services/restaurants/restaurants.service";

import "./view-events.style.css";

class ViewEventsComponent {
    constructor() {
        this.controller = ViewEventsComponentController;
        this.template = template;
        this.bindings = {
            events: '<',
        }
    }

    static get name() {
        return 'viewEvents';
    }
}

class ViewEventsComponentController {
    constructor($state, $scope, EventsService, UserService, RestaurantService) {
        this.$state = $state;
        this.$scope = $scope;
        this.EventsService = EventsService;
        this.UserService = UserService;
        this.RestaurantService = RestaurantService;
        this.showMap = false;
    }

    details(event) {
        let _id = event['_id'];
        this.$state.go('event', {eventId: _id});
    };

    edit(event) {

        if (this.UserService.isAuthenticated()) {
            let _id = event['_id'];
            this.$state.go('eventEdit', {eventId: _id});
        } else {
            this.$state.go('login', {});
        }
    };

    newEvent() {

        if (this.UserService.isAuthenticated()) {
            this.$state.go('eventAdd', {});
        } else {
            this.$state.go('login', {});
        }

    };


    delete(event) {
        if (this.UserService.isAuthenticated()) {
            let _id = event['_id'];

            this.EventsService.delete(_id).then(response => {
                let index = this.events.map(x => x['_id']).indexOf(_id);
                this.events.splice(index, 1);
                this.$scope.$apply();
            })

        } else {
            this.$state.go('login', {});
        }
    };

    myMap() {

        this.showMap = !this.showMap;

        if (this.showMap) {

            let map = new google.maps.Map(document.getElementById("googleMap"), {
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            let infoWindow = new google.maps.InfoWindow();
            let bounds = new google.maps.LatLngBounds();

            for (let i = 0; i < this.events.length; i++) {
                this.RestaurantService.get(this.events[i].offer.restaurant).then(function (restaurant) {
                    let marker = new google.maps.Marker({
                        position: new google.maps.LatLng(restaurant.location.x, restaurant.location.y),
                        map: map
                    });

                    bounds.extend(marker.position);

                    let infoWindowContent = '<h4>' + restaurant.name + '</h4>';

                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            infoWindow.setContent(infoWindowContent);
                            infoWindow.open(map, marker);
                        }
                    })(marker, i));

                    map.fitBounds(bounds);
                    google.maps.event.trigger(map, 'resize');
                });
            }
        }

    }

    static getLoadedEvents() {
        return this.events;
    }


    static get $inject() {
        return ['$state', '$scope', EventsService.name, UserService.name, RestaurantService.name];
    }

}

export default ViewEventsComponent;