'use strict';

import angular from 'angular';

import ViewEventsComponent from './view-events.component';


export default angular.module('ViewEvents', [])
    .component(ViewEventsComponent.name, new ViewEventsComponent);