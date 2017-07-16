var Config = require('../config/config.js');
var User = require('./userSchema');
var jwt = require('jwt-simple');
var fs = require('fs');

module.exports.login = function (req, res) {

    if (!req.body.username) {
        res.status(400).send('username required');
        return;
    }
    if (!req.body.password) {
        res.status(400).send('password required');
        return;
    }

    User.findOne({username: req.body.username}, function (err, user) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        if (!user) {
            res.status(401).send('Invalid Credentials');
            return;
        }
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (!isMatch || err) {
                res.status(401).send('Invalid Credentials');
            } else {
                res.status(200).json({token: createToken(user)});
            }
        });
    });

};

module.exports.signup = function (req, res) {
    if (!req.body.username) {
        res.status(400).send('username required');
        return;
    }
    if (!req.body.password) {
        res.status(400).send('password required');
        return;
    }

    var user = new User(req.body);
    user.imagePath = Config.app.apiUrl + 'assets/pictures/users/placeholder.jpg';
    user.save(function (err) {
        if (err) {
            res.status(500).send(err);
            return;
        }

        res.status(201).json({token: createToken(user)});
    });
};

module.exports.unregister = function (req, res) {
    req.user.remove().then(function (user) {
        res.sendStatus(200);
    }, function (err) {
        res.status(500).send(err);
    });
};

module.exports.uploadImage = function (req, res) {
    if (req.user._id == req.params.user_id) {
        addToAssets(req.user._id, req.body.image);
        User.findById(req.user._id, function(err, user) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            var apiImagePath = Config.app.apiUrl + 'assets/pictures/users/' + user._id + '.jpg';
            user.imagePath = apiImagePath;
            User.findByIdAndUpdate(
                user._id,
                user,
                {
                    new: true,
                    runValidators: true
                }, function (err, user) {
                    if (err) {
                        res.status(500).send(err);
                        return;
                    }
                    res.status(201).json(user);
                });
        })
    } else {
        res.status(401).send('unauthorized to post image for another user');
    }
};

function addToAssets(userId, base64Image) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64Image, 'base64');
    // write buffer to file
    fs.writeFileSync('public/assets/pictures/users/' + userId + '.jpg', bitmap);
}

exports.getUser = function (req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err) {
            res.status(500).send(err);
            return;
        }
    }).populate('languages').populate('location').exec(function (err, user) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(user);
    });
};

function createToken(user) {
    var tokenPayload = {
        user: {
            _id: user._id,
            username: user.username
        }

    };
    return jwt.encode(tokenPayload, Config.auth.jwtSecret);
};