'use strict';

import angular from "angular";
import uiRouter from "@uirouter/angularjs";

import EventsService from "./services/events/events";
import UserService from "./services/user/user";
import TopicsService from "./services/topics/topics";
import LanguagesService from "./services/languages/languages";
import LanguageLevelsService from "./services/language-levels/language-levels";
import LocationService from "./services/location/location";
import UserLanguagesService from "./services/user-languages/user-languages";
import OffersService from "./services/offers/offers";
import RestaurantsService from "./services/restaurants/restaurants";

import Routes from "./config/routes";
import Middleware from "./config/middlewares";

import ngmap from "ngmap";
import toastr from "angular-toastr";
import toastrConfig from "angular-toastr";
import Upload from "ng-file-upload";
import angluarLoadingBar from "angular-loading-bar";

import AppContent from "./components/app-content/app-content";
import ViewEvents from "./components/view-events/view-events";
import ViewCreateEvent from "./components/view-create-event/view-create-event";
import ViewHome from "./components/view-home/view-home";
import ViewLogin from "./components/view-login/view-login";
import ViewRegistration from "./components/view-registration/view-registration";
import ViewOffer from "./components/view-create-offer/view-create-offer";
import ViewSingleEvent from "./components/view-single-event/view-single-event";
import ViewProfile from "./components/view-profile/view-profile";

let app = angular.module('app', [
    uiRouter,
    ngmap,
    toastr,
    toastrConfig,
    Upload,
    angluarLoadingBar,
    UserService.name,
    EventsService.name,
    TopicsService.name,
    LanguagesService.name,
    LanguageLevelsService.name,
    LocationService.name,
    UserLanguagesService.name,
    OffersService.name,
    RestaurantsService.name,
    AppContent.name,
    ViewEvents.name,
    ViewCreateEvent.name,
    ViewHome.name,
    ViewLogin.name,
    ViewRegistration.name,
    ViewOffer.name,
    ViewSingleEvent.name,
    ViewProfile.name
]);

app.constant('API_URL', 'http://localhost:3000/api');
app.config(Routes);
app.config(Middleware);
app.config(['toastrConfig', function(toastrConfig) {
    angular.extend(toastrConfig, {
        closeButton: true,
        closeHtml: '<button>&times;</button>',
        extendedTimeOut: 2000,
        tapToDismiss: true,
        timeOut: 7000,
        positionClass: 'toast-top-center'
    });
}]);

angular.element(document).ready(function () {
    return angular.bootstrap(document.body, [app.name], {
        strictDi: true
    });
});

export default app;