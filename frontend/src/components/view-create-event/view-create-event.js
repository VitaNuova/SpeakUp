'use strict';

import angular from 'angular';

import ViewCreateEventComponent from './view-create-event.component';


export default angular.module('ViewCreateEvent', [])
    .component(ViewCreateEventComponent.name, new ViewCreateEventComponent);
