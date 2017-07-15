'use strict';

import UserService from "./../../services/user/user.service";

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

    constructor($state, UserService) {
        this.$state = $state;
        this.UserService = UserService;

        //on page access, check if logged in user is admin or not (only admin can access)
        this.UserService.get(this.UserService.getCurrentUser()._id).then((user) => {
            if (!user.isAdmin) {
                this.$state.go('home', {});
            }
        });

    }

    static get $inject() {
        return ['$state', UserService.name];
    }

}


export default ViewCreateOfferComponent;