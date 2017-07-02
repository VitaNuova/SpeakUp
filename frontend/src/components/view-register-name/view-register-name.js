'use strict';

import angular from 'angular';

import ViewRegisterNameComponent from './view-register-name.component';


export default angular.module('ViewRegisterName', [])
    .component(ViewRegisterNameComponent.name, new ViewRegisterNameComponent);