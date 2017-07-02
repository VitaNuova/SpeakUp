'use strict';

import angular from 'angular';
import ViewRegisterLanguageComponent from './view-register-language.component';


export default angular.module('ViewRegisterLanguage', [])
    .component(ViewRegisterLanguageComponent.name, new ViewRegisterLanguageComponent);