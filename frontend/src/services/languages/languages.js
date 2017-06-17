'use strict';

import angular from 'angular';

import LanguagesService from './languages.service';


export default angular.module('LanguagesServiceDefinition', [])
    .service(LanguagesService.name, LanguagesService)