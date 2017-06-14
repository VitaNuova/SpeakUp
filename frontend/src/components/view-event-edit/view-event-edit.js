'use strict';

import angular from 'angular';

import ViewEventEditComponent from './view-event-edit.component';


export default angular.module('ViewEventEdit', [])
    .component(ViewEventEditComponent.name, new ViewEventEditComponent);