'use strict';

import angular from 'angular';

import OffersService from './offers.service';


export default angular.module('OffersServiceDefinition', [])
    .service(OffersService.name, OffersService)