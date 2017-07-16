'use strict';

import template from './view-profile.template.html';
import EventsService from './../../services/events/events.service';
import UserService from './../../services/user/user.service';

class ViewProfileComponent {
    constructor() {
        this.controller = ViewProfileComponentController;
        this.template = template;
        this.bindings = {
            event: '<',
        }

    }

    static get name() {
        return 'viewProfile';
    }


}

class ViewProfileComponentController {
    constructor($state, EventsService, UserService, Upload) {
        this.$state = $state;
        this.EventsService = EventsService;
        this.UserService = UserService;
        this.Upload = Upload;
        this.file = {};
    }

    static get $inject() {
        return ['$state', EventsService.name, UserService.name, 'Upload'];
    }

    uploadImage() {
        if (this.image) {
            console.log("FORM AND IMAGE VALID");
            let ctrl = this;
            let reader = new FileReader();
            reader.readAsDataURL(this.image);
            reader.onloadend = function() {
                let base64Image = reader.result;
                // console.log(base64Image);
                ctrl.UserService.uploadImage({"image": base64Image.substr(base64Image.indexOf(',')+1)});
            }
        }
    }

}


export default ViewProfileComponent;
