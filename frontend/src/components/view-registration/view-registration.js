'use strict';

import angular from 'angular';

import ViewRegistrationComponent from './view-registration.component';


export default angular.module('ViewRegistration', [])
    .component(ViewRegistrationComponent.name, new ViewRegistrationComponent);