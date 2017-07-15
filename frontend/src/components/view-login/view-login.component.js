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

    constructor(UserService, $window, $state) {
        this.UserService = UserService;
        this.$window = $window;
        this.$state = $state;
    }

    $onInit() {
        this.login = {};
    }

    isAuthenticated() {
        return this.UserService.isAuthenticated();
    }

    submit() {
        let username = this.login.username;
        let password = this.login.password;

        this.UserService.login(username, password).then((success) => {
            this.$window.localStorage.setItem('jwtToken', success.data.token);

            this.UserService.get(this.UserService.getCurrentUser()._id).then((user) => {
                    if (user.isAdmin) {
                        this.$state.go('offerAdd', {});
                    } else {
                        this.$state.go('events', {});
                    }
                }, (error) => {
                    this.$state.go('home', {});
                }
            );

        }, (error) => {
            this.loginFailed = true;
            console.log("unauthorized");
        })
    }


    static get $inject() {
        return [UserService.name, '$window', '$state'];
    }

}

export default ViewLoginComponent;