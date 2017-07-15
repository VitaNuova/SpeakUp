'use strict';

import angular from 'angular';

import ViewCreateOfferComponent from './view-create-offer.component';


export default angular.module('ViewCreateOffer', [])
    .component(ViewCreateOfferComponent.name, new ViewCreateOfferComponent);
