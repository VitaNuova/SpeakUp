'use strict';

import angular from 'angular';

import ViewAboutUsComponent from './view-about-us.component';


export default angular.module('ViewAboutUs', [])
    .component(ViewAboutUsComponent.name, new ViewAboutUsComponent);
