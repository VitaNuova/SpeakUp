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
    constructor($state, $scope, UserService) {

        let ctrl = this;

        this.$state = $state;
        this.$scope = $scope;
        this.UserService = UserService;
        this.user = {};

        if (this.isAuthenticated()) {
            this.UserService.get(this.UserService.getCurrentUser()._id).then(success => {
                ctrl.user = success.data;
            })
        }

        this.$scope.$on('user-change', function (event, data) {
            ctrl.user = data;
            ctrl.user.imagePath += "?" + new Date().getTime();
        });
    }

    isAuthenticated() {
        return this.UserService.isAuthenticated();
    }

    profile() {
        this.$state.go('profile', {userId: this.user._id});
    };

    logout() {
        this.UserService.logout();
        this.$state.go('home', {});
    }

    static get $inject() {
        return ['$state', '$scope', UserService.name];
    }

}


export default AppHeaderComponent;