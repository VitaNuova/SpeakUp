'use strict';


export default class EventsService {

    static get $inject() {
        return ['$http', 'API_URL'];
    }

    constructor($http, API_URL) {
        this.$http = $http;
        this.resourceUrl = `${ API_URL }/events/`;

    }

    static get name() {
        return 'eventsService';
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


    create(event) {
        let url = this.resourceUrl;
        return this.$http.post(url, event).then(responce => {

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

    update(event) {

        let url = `${ this.resourceUrl }${ event['_id'] }`;
        return this.$http.put(url, event).then(responce => {

            return new Promise((resolve, reject) => {
                resolve(responce.data);
            });

        })
    }

    join(event, userId) {
        let url = `${ this.resourceUrl }${ event['_id'] }/user?register=${ userId }`;
        return this.$http.get(url).then(response => {

            return new Promise((resolve, reject) => {
                resolve(response.data);
            });

        })
    }

    getEventsByUser(userId) {
      let url = `${ this.resourceUrl }/user/${ userId }`;
      return this.$http.get(url).then(response => {

          return new Promise((resolve, reject) => {
              resolve(response.data);
          });

      })
    }
}
