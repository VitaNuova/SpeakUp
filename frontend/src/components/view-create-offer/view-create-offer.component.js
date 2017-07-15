'use strict';

import UserService from "./../../services/user/user.service";
import LocationService from "./../../services/location/location.service";
import RestaurantService from "./../../services/restaurants/restaurants.service";
import OfferService from "./../../services/offers/offers.service";

import template from "./view-create-offer.template.html";
import "./view-create-offer.style.css";

class ViewCreateOfferComponent {
    constructor() {
        this.controller = ViewCreateOfferComponentController;
        this.template = template;
    }

    static get name() {
        return 'viewCreateOffer';
    }

}

class ViewCreateOfferComponentController {

    constructor($state, UserService, LocationService, RestaurantService, OfferService) {
        this.$state = $state;
        this.UserService = UserService;
        this.LocationService = LocationService;
        this.RestaurantService = RestaurantService;
        this.OfferService = OfferService;

        //on page access, check if logged in user is admin or not (only admin can access)
        this.UserService.get(this.UserService.getCurrentUser()._id).then((user) => {
            if (!user.isAdmin) {
                this.$state.go('home', {});
            }
        });

    }

    $onInit() {
        this.venueLocation = "Marienplatz";
        this.offer = {};
        this.restaurant = {};
        this.defaultDate = this.getDefaultDate();
        this.defaultFrom = "18:00:00";
        this.defaultTo = "20:00:00";
        this.offer.discount = 0;
        this.offer.numOfPeople = 1;
        this.chosenDate = new Date();
        this.currentDate = new Date();
        this.chosenFrom = new Date(this.currentDate.getYear(), this.currentDate.getMonth(), this.currentDate.getDate(), 18);
        this.chosenTo = new Date(this.currentDate.getYear(), this.currentDate.getMonth(), this.currentDate.getDate(), 20);
    }

    getDefaultDate() {
        var cur_date = new Date();
        var date = cur_date.getFullYear();
        var month = cur_date.getMonth() + 1;
        if(month < 10) {
            date = date + "-0" + month;
        } else {
            date = date + "-" + month;
        }
        var day = cur_date.getDate();
        if(day < 10) {
            date = date + "-0" + day;
        } else {
            date = date + "-" + day;
        }
        return date;
    }


    static get $inject() {
        return ['$state', UserService.name, LocationService.name, RestaurantService.name, OfferService.name];
    }

    createOffer() {
        this.isDisabledButton = true;

        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({"address": this.venueLocation}, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                let location = {};
                location.x = results[0].geometry.location.lat();
                location.y = results[0].geometry.location.lng();

                this.LocationService.create(location).then(
                    (data) => {
                        this.restaurant.location = data._id;
                        this.RestaurantService.create(this.restaurant).then(
                            (data) => {
                                this.offer.restaurant = data._id;

                                this.offer.from = new Date(this.chosenDate.getFullYear(), this.chosenDate.getMonth(), this.chosenDate.getDate(), this.chosenFrom.getHours());
                                this.offer.to = new Date(this.chosenDate.getFullYear(), this.chosenDate.getMonth(), this.chosenDate.getDate(), this.chosenTo.getHours());
                                this.OfferService.create(this.offer).then(
                                    (data) => {
                                        console.log("offer posted " + JSON.stringify(data));
                                        this.$state.go('offerAdd');
                                    }
                                );
                            }
                        );
                    }
                );
            }
        });
    }

}


export default ViewCreateOfferComponent;