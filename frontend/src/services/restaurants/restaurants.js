'use strict';

import angular from 'angular';

//import EventsService from './events.service';
import EventsService from './events.service';


export default angular.module('RestaurantsServiceDefinition', [])
    .service(RestaurantsService.name, RestaurantsService)