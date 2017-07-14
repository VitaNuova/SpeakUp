'use strict';

import UserService from "./../../services/user/user.service";
import template from "./view-home.template.html";
import "./view-home.style.css";

class ViewHomeComponent {
    constructor() {
        this.controller = ViewHomeComponentController;
        this.template = template;

    }

    static get name() {
        return 'viewHome';
    }

}

class ViewHomeComponentController {

    constructor(UserService) {
        this.UserService = UserService;
    }

    isAuthenticated() {
        return this.UserService.isAuthenticated();
    }

    static get $inject() {
        return [UserService.name];
    }

}

export default ViewHomeComponent;