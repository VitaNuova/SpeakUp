'use strict';

import UserService from './../../services/user/user.service';

import template from './app-header.template.html';

import './app-header.style.css';

class AppHeaderComponent {
    constructor() {
        this.controller = AppHeaderComponentController;
        this.template = template;
    }

    static get name() {
        return 'appHeader';
    }

}

class AppHeaderComponentController {
    constructor($state, UserService) {
        this.$state = $state;
        this.UserService = UserService;
    }

    $onInit() {
        this.user = {};
    }

    isAuthenticated() {
        return this.UserService.isAuthenticated();
    }

    getLoggedInUser() {
        let ctrl = this;
        this.UserService.getLoggedInUser().then(function (success) {
            ctrl.user = success;
        });
    }

    getCurrentUser() {
        return this.UserService.getCurrentUser();
    }

    goHome() {
        this.$state.go('home', {});
    }

    profile() {
        let _id = this.getCurrentUser()._id;
        this.$state.go('profile', {userId: _id});
    };

    login() {
        this.$state.go('home', {});
    }

    logout() {
        this.UserService.logout();
        this.$state.go('home', {});
    }

    static get $inject() {
        return ['$state', UserService.name];
    }

}


export default AppHeaderComponent;