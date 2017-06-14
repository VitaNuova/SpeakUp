'use strict';

import angular from 'angular';

//import EventsService from './events.service';
import EventsService from './events.service';


export default angular.module('OffersServiceDefinition', [])
    .service(OffersService.name, OffersService)