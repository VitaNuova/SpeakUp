'use strict';


export default class UserService {

    static get $inject() {
        return ['$http', '$rootScope', '$window', 'API_URL'];
    }

    constructor($http, $rootScope, $window, API_URL) {
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.$window = $window;
        this.API_URL = API_URL;
        this.user = {};
    }

    static get name() {
        return 'UserService';
    }

    register(postedModel) {
        return this.$http.post(`${ this.API_URL }/user/signup`, {
            username: postedModel.username,
            password: postedModel.password,
            email: postedModel.email,
            age: postedModel.age,
            imagePath: postedModel.image,
            location: postedModel.location,
            languages: postedModel.languages
        });
    }

    login(user, pass) {
        return this.$http.post(`${ this.API_URL }/user/login`, {
            username: user,
            password: pass
        });
    }

    logout() {
        this.$window.localStorage.removeItem('jwtToken');
    }

    getCurrentUser() {
        let token = this.$window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(this.$window.atob(base64)).user;
    }

    storeLoggedInUSer() {

        let ctrl = this;

        if (this.isAuthenticated()) {
            this.get(this.getCurrentUser()._id).then(success => {
                ctrl.user = success.data;
                this.$rootScope.$broadcast('user-change', ctrl.user);
            })
        } else {
            return {};
        }
    }

    isAuthenticated() {
        return !!this.$window.localStorage['jwtToken'];
    }

    get(id) {
        let url = `${ this.API_URL }/user/${ id }`;
        return this.$http.get(url);
    }

    uploadImage(image) {
        let userId = this.getCurrentUser()._id;
        let url = `${ this.API_URL }/user/${ userId }/image`;
        return this.$http.post(url, image).then(response => {

            return new Promise((resolve, reject) => {
                resolve(response.data);
            });

        })
    }


}
