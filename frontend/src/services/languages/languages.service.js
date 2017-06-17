/**
 * Created by Naum on 6/14/2017.
 */
'use strict';


export default class LanguagesService {

    static get $inject() {
        return ['$http', 'API_URL'];
    }

    constructor($http, API_URL) {
        this.$http = $http;
        this.resourceUrl = `${ API_URL }/languages/`;

    }

    static get name() {
        return 'languagesService';
    }

    list() {

        let url = this.resourceUrl;
        return this.$http.get(url).then(response => {

            return new Promise((resolve, reject) => {
                resolve(response.data);

            });

        });

    }

    get(id) {
        let url = `${ this.resourceUrl }${ id }`;
        return this.$http.get(url).then(response => {

            return new Promise((resolve, reject) => {
                resolve(response.data);
            });

        })
    }


    create(language) {
        let url = this.resourceUrl;
        return this.$http.post(url, language).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });

        })
    }

    delete(id) {
        let url = `${ this.resourceUrl }${ id }`;
        return this.$http.delete(url).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.status);
            });

        })
    }

    update(language) {

        let url = `${ this.resourceUrl }${ language['_id'] }`;
        return this.$http.put(url, language).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });

        })
    }


}