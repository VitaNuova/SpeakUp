'use strict';


middlewares.$inject = ['$httpProvider', '$windowProvider', '$qProvider', '$stateProvider', 'API_URL'];
export default function middlewares($httpProvider, $windowProvider, $qProvider, $stateProvider, API_URL) {

    let $window = $windowProvider.$get();
    let $state = $stateProvider.$get();
    // let $q = $qProvider.$get();

    $httpProvider.interceptors.push(['$q', function ($q) {
        return {
            'request': function (config) {
                // Making a request to the API Server
                if (config.url.indexOf(API_URL) === 0) {
                    let token = $window.localStorage['jwtToken'];

                    if (token) {
                        config.headers.Authorization = 'JWT ' + token;
                    }
                }

                return config;
            },
            // optional method
            'requestError': function (rejection) {
                return $q.reject(rejection);
            },
            // optional method
            'response': function (response) {
                //Receiving response from  the API Server
                if (response && response.config.url.indexOf(API_URL) === 0) {

                    // If a token was sent back, save it
                    if (response.data.hasOwnProperty('token')) {
                        $window.localStorage['jwtToken'] = response.data.token;
                    }
                }

                return response;
            },
            // optional method
            'responseError': function (rejection) {
                // do something on error
                if (rejection.status === 400 || rejection.status === 401) {
                    $state.go('home', {});
                }

                return $q.reject(rejection);
            }
        }
    }])


}