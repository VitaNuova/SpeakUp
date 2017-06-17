'use strict';

import angular from 'angular';

import UserLanguagesService from './user-languages.service';


export default angular.module('UserLanguagesServiceDefinition', [])
    .service(UserLanguagesService.name, UserLanguagesService)