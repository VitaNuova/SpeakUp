'use strict';

import angular from "angular";
import uiRouter from "@uirouter/angularjs";

import EventsService from "./services/events/events";
import UserService from "./services/user/user";
import TopicsService from "./services/topics/topics";
import LanguagesService from "./services/languages/languages";
import LanguageLevelsService from "./services/language-levels/language-levels";
import LocationService from "./services/location/location";
import UserLanguageService from "./services/user-languages/user-languages";
import OffersService from "./services/offers/offers";
import RestaurantsService from "./services/restaurants/restaurants";

import Routes from "./config/routes";
import Middleware from "./config/middlewares";

import ngmap from "ngmap";

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
    UserService.name,
    EventsService.name,
    TopicsService.name,
    LanguagesService.name,
    LanguageLevelsService.name,
    LocationService.name,
    UserLanguageService.name,
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

app.constant('API_URL', 'http://speakup.westeurope.cloudapp.azure.com:3000/api');
app.config(Routes);
app.config(Middleware);

angular.element(document).ready(function () {
    return angular.bootstrap(document.body, [app.name], {
        strictDi: true
    });
});

export default app;
