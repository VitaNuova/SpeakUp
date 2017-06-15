'use strict';

import angular from 'angular';

import ViewSingleEventComponent from './view-single-event.component';


export default angular.module('ViewSingleEvent', [])
    .component(ViewSingleEventComponent.name, new ViewSingleEventComponent);
