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

    constructor(UserService, $window, $state, toastr) {
        this.UserService = UserService;
        this.$window = $window;
        this.$state = $state;
        this.toastr = toastr;
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
            this.UserService.storeLoggedInUSer();
            this.$state.go('events', {});
        }, (error) => {
            if (error.status == 401) {
                this.loginFailed = true;
                this.toastr.error('Invalid email or password.');
            }
        })
    }


    static get $inject() {
        return [UserService.name, '$window', '$state', 'toastr'];
    }

}

export default ViewLoginComponent;