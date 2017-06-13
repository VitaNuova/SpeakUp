'use strict';

import angular from 'angular';

import ViewEventCreateComponent from './view-event-create.component';


export default angular.module('ViewEventCreate', [])
    .component(ViewEventCreateComponent.name, new ViewEventCreateComponent);