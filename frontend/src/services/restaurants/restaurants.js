'use strict';

import angular from 'angular';

import RestaurantsService from './restaurants.service';


export default angular.module('RestaurantsServiceDefinition', [])
    .service(RestaurantsService.name, RestaurantsService)