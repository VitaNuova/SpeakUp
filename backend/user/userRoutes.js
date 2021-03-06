module.exports = userRoutes;

function userRoutes(passport) {

    var userController = require('./userController');
    var router = require('express').Router();

    router.post('/login', userController.login);
    router.post('/signup', userController.signup);
    router.post('/unregister', passport.authenticate('jwt', {session: false}), userController.unregister);
    router.post('/:user_id/image', passport.authenticate('jwt', {session: false}), userController.uploadImage);


    router.route('/:user_id')
        .get(userController.getUser);

    return router;

}