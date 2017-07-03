'use strict';

import angular from 'angular';
import ViewRegisterLocationComponent from './view-register-location.component';


export default angular.module('ViewRegisterLocation', [])
    .component(ViewRegisterLocationComponent.name, new ViewRegisterLocationComponent);