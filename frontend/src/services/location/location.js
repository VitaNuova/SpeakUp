'use strict';

import angular from 'angular';

import LocationService from './location.service';


export default angular.module('LocationServiceDefinition', [])
    .service(LocationService.name, LocationService)