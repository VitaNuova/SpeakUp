'use strict';

import angular from 'angular';

import ViewEventComponent from './view-event.component';


export default angular.module('ViewEvent', [])
    .component(ViewEventComponent.name, new ViewEventComponent);