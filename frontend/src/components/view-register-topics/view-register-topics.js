'use strict';

import angular from 'angular';
import ViewRegisterTopicsComponent from './view-register-topics.component';


export default angular.module('ViewRegisterTopics', [])
    .component(ViewRegisterTopicsComponent.name, new ViewRegisterTopicsComponent);