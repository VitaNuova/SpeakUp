'use strict';

import angular from 'angular';

//import EventsService from './events.service';
import TopicsService from './topics.service';


export default angular.module('TopicsServiceDefinition', [])
    .service(TopicsService.name, TopicsService)