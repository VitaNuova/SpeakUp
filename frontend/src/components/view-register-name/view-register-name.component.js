'use strict';

import template from './view-register-name.template.html';
import './view-register-name.style.css';

class ViewRegisterNameComponent {
    constructor() {
        this.controller = ViewRegisterNameComponentController;
        this.template = template;

    }

    static get name() {
        return 'viewRegisterName';
    }

}

class ViewRegisterNameComponentController {
    constructor($state) {
        this.$state = $state;
    }

    $onInit() {
        this.user = {};
    }

    submit() {
        console.log(this.user);
        this.$state.go('registerLanguage', {user: this.user});
    }

    static get $inject() {
        return ['$state'];
    }

}

export default ViewRegisterNameComponent;

