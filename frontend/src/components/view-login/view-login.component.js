'use strict';

import UserService from "./../../services/user/user.service";

import template from "./view-login.template.html";
import "./view-login.style.css";

class ViewLoginComponent {
    constructor() {
        this.controller = ViewLoginComponentController;
        this.template = template;

    }

    static get name() {
        return 'viewLogin';
    }

}

class ViewLoginComponentController {
    constructor($state, $window, UserService) {
        this.$state = $state;
        this.$window = $window;
        this.UserService = UserService;
    }

    $onInit() {
        this.login = {};
    }

    submit() {
        let username = this.login.username;
        let password = this.login.password;

        let user = this.UserService.login(username, password);
        if(user) {
            this.$state.go('events', {});
        }
    }

    isAuthenticated() {
        return this.UserService.isAuthenticated();
    }

    static get $inject() {
        return ['$state', '$window', UserService.name];
    }

}


export default ViewLoginComponent;