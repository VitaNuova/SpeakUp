'use strict';

import UserService from './../../services/user/user.service';

import template from './view-register-location.template.html';
import './view-register-location.style.css';

class ViewRegisterLocationComponent {
    constructor() {
        this.controller = ViewRegisterLocationComponentController;
        this.template = template;
    }

    static get name() {
        return 'viewRegisterLocation';
    }

}

class ViewRegisterLocationComponentController {
    constructor($state, $stateParams, UserService) {
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.user = this.$stateParams.user;
        console.log(this.user);
        this.UserService = UserService;
    }

    $onInit() {
        this.location = 'Marienplatz';
    }

    submit() {
        var geocoder = new google.maps.Geocoder();
        var user = this.user;
        geocoder.geocode( { "address": this.location }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                var location = results[0].geometry.location;
                console.log('location ' + location);
                user.location = location;
            }
        });

        var postedModel = {
            username: this.user.name,
            password: this.user.password,
            email: this.user.email,
            imagePath: this.user.image,
            location: this.user.location,
            languages: this.user.languages
        };
        console.log(postedModel);

        this.UserService.register(postedModel).then(data => {
            this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent('Your account has been successfully created!')
                    .hideDelay(3000)
            );

            this.$state.go('login');
        });

    };

    static get $inject() {
        return ['$state', '$stateParams', UserService.name];
    }

}

export default ViewRegisterLocationComponent;