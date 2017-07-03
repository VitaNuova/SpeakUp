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
        this.UserService = UserService;
    }

    $onInit() {
        this.map = { center: {latitude: 45, longitude: -73}, zoom: 8};
    }

    submit() {
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