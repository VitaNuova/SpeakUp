'use strict';

import angular from 'angular';

import LanguageLevelsService from './language-levels.service';


export default angular.module('LanguageLevelsServiceDefinition', [])
    .service(LanguageLevelsService.name, LanguageLevelsService)