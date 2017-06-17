var mongoose = require('mongoose');
var User = require('./user/userSchema');
var UserLanguage = require('./userLanguage/userLanguageSchema');
var Event = require('./event/eventSchema');
var Language = require('./language/languageSchema');
var LanguageLevel = require('./languageLevel/languageLevelSchema');
var Location = require('./location/locationSchema');
var Offer = require('./offer/offerSchema');
var Restaurant = require('./restaurant/restaurantSchema');
var Topic = require('./topic/topicSchema');

var config = require('./config/config');
var fs = require('fs');

var dbURI = 'mongodb://' + config.db.host + "/" + config.db.name;

mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection open to ' + dbURI);
    mongoose.connection.db.dropDatabase(function(err, result) {
        console.log('Database at ' + dbURI + ' is dropped.');
    });
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

var location = new Location({
    x: 48.1894672,
    y: 11.6215395
});

var englishImagePath = "./migrations/assets/pictures/languages/english.png";

var language = new Language({
    name: "english"
});

language.image.data = fs.readFileSync(englishImagePath);
language.image.contentType = "image/png";

language.save(function(err) { if (err) return console.error(err); });

var swimmingImagePath = "./migrations/assets/pictures/topics/swimming.jpg";

var t1 = new Topic({
    name: "swimming"
});

t1.image.data = fs.readFileSync(swimmingImagePath);
t1.image.contentType = "image/jpg";

t1.save(function(err) { if (err) return console.error(err); });

var l1 = new LanguageLevel({
    name: "A1",
    description: "Basic intro course"
});

var l2 = new LanguageLevel({
    name: "A2",
    description: "Advavnced intro course"
});

var l3 = new LanguageLevel({
    name: "B1",
    description: "Basic medium course"
});

var l4 = new LanguageLevel({
    name: "B2",
    description: "Advanced medium course"
});

var l5 = new LanguageLevel({
    name: "C1",
    description: "Basic advanced course"
});

var l6 = new LanguageLevel({
    name: "C2",
    description: "Advanced super course"
});

l1.save(function(err) { if (err) return console.error(err); });
l2.save(function(err) { if (err) return console.error(err); });
l3.save(function(err) { if (err) return console.error(err); });
l4.save(function(err) { if (err) return console.error(err); });
l5.save(function(err) { if (err) return console.error(err); });
l6.save(function(err) { if (err) return console.error(err); });

var restaurantLocation = new Location({
    x: 48.19,
    y: 11.5
});

var restaurant = new Restaurant({
    name: "Special Corso",
    location: restaurantLocation
});

var userLanguage = new UserLanguage({
    language: language,
    languageLevel: l1,
    topics: [t1]
});

userLanguage.save(function(err) { if (err) return console.error(err); });

var offer = new Offer({
    restaurant: restaurant,
    from: new Date("2017-06-15T07:00:00.123Z"),
    to: new Date("2017-06-23T07:00:00.123Z"),
    numOfPeople: 5,
    discount: 25
});

offer.save(function(err) { if (err) return console.error(err); });

var userImagePath = "./migrations/assets/pictures/users/user-1.jpg";

var user = new User({
    username: "johndoe",
    password: "password",
    email: "john@doe.com",
    age: 23,
    gender: "male",
    location: location,
    languages: [userLanguage],
});

user.image.data = fs.readFileSync(swimmingImagePath);
user.image.contentType = "image/jpg";

user.save(function(err) { if (err) return console.error(err); });

var event = new Event({
    name: "Our special event",
    language: l1,
    offer: offer,
    topics: [t1],
    users: [user]
});

event.save(function(err) { if (err) return console.error(err); });

mongoose.connection.close();