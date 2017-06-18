var mongoose = require('mongoose');
var User = require('./user/userSchema');
var Topic = require('./topic/topicSchema');
var UserLanguage = require('./userLanguage/userLanguageSchema');
var Event = require('./event/eventSchema');
var Language = require('./language/languageSchema');
var LanguageLevel = require('./languageLevel/languageLevelSchema');
var Location = require('./location/locationSchema');
var Offer = require('./offer/offerSchema');
var Restaurant = require('./restaurant/restaurantSchema');


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

var location1 = new Location({
    x: 48.1894672,
    y: 11.6215395
});
location1.save(function(err) { if (err) return console.error(err); });

var location2 = new Location({
    x: 48.25606990000001,
    y: 11.551696600000014
});
location2.save(function(err) { if (err) return console.error(err); });

var location3 = new Location({
    x: 48.1673385,
    y: 11.573782499999993
});
location3.save(function(err) { if (err) return console.error(err); });

var language1 = new Language({
    name: "english",
    imagePath: config.app.apiUrl + "assets/pictures/languages/english.png"
});
language1.save(function(err) { if (err) return console.error(err); });

var language2 = new Language({
    name: "french",
    imagePath: config.app.apiUrl + "assets/pictures/languages/french.jpeg"
});
language2.save(function(err) { if (err) return console.error(err); });

var t1 = new Topic({
    name: "Swimming",
    imagePath: config.app.apiUrl + "assets/pictures/topics/swimming.jpg"
});
t1.save(function(err) { if (err) return console.error(err); });

var t2 = new Topic({
    name: "Environment",
    imagePath: config.app.apiUrl + "assets/pictures/topics/food.jpeg"
});
t2.save(function(err) { if (err) return console.error(err); });

var t3 = new Topic({
    name: "Food",
    imagePath: config.app.apiUrl + "assets/pictures/topics/environment.jpeg"
});
t3.save(function(err) { if (err) return console.error(err); });

var l1 = new LanguageLevel({
    name: "A1",
    description: "Basic intro course"
});

var l2 = new LanguageLevel({
    name: "A2",
    description: "Advanced intro course"
});

var l3 = new LanguageLevel({
    name: "B1",
    description: "Pre-intermediate course"
});

var l4 = new LanguageLevel({
    name: "B2",
    description: "Intermediate course"
});

var l5 = new LanguageLevel({
    name: "C1",
    description: "Upper-intermediate course"
});

var l6 = new LanguageLevel({
    name: "C2",
    description: "Advanced course"
});

l1.save(function(err) { if (err) return console.error(err); });
l2.save(function(err) { if (err) return console.error(err); });
l3.save(function(err) { if (err) return console.error(err); });
l4.save(function(err) { if (err) return console.error(err); });
l5.save(function(err) { if (err) return console.error(err); });
l6.save(function(err) { if (err) return console.error(err); });

var restaurant1 = new Restaurant({
    name: "That Mexican Place",
    location: location1
});
restaurant1.save(function(err) { if (err) return console.error(err); });

var restaurant2 = new Restaurant({
    name: "That Thai Place",
    location: location2
});
restaurant2.save(function(err) { if (err) return console.error(err); });

var restaurant3 = new Restaurant({
    name: "That Japanese Place",
    location: location3
});
restaurant3.save(function(err) { if (err) return console.error(err); });

var userLanguage1 = new UserLanguage({
    language: language1,
    languageLevel: l1,
    topics: [t1, t2]
});

userLanguage1.save(function(err) { if (err) return console.error(err); });

var userLanguage2 = new UserLanguage({
    language: language2,
    languageLevel: l4,
    topics: [t2, t3]
});

userLanguage2.save(function(err) { if (err) return console.error(err); });

var userLanguage3 = new UserLanguage({
    language: language1,
    languageLevel: l6,
    topics: [t1, t3]
});

userLanguage3.save(function(err) { if (err) return console.error(err); });

var offer1 = new Offer({
    restaurant: restaurant1,
    from: new Date("2017-06-15T07:00:00.123Z"),
    to: new Date("2017-06-23T07:00:00.123Z"),
    numOfPeople: 5,
    discount: 25
});

offer1.save(function(err) { if (err) return console.error(err); });

var offer2 = new Offer({
    restaurant: restaurant2,
    from: new Date("2017-06-17T07:00:00.123Z"),
    to: new Date("2017-06-21T07:00:00.123Z"),
    numOfPeople: 5,
    discount: 20
});

offer2.save(function(err) { if (err) return console.error(err); });

var offer3 = new Offer({
    restaurant: restaurant3,
    from: new Date("2017-06-17T07:00:00.123Z"),
    to: new Date("2017-06-25T07:00:00.123Z"),
    numOfPeople: 3,
    discount: 10
});

offer3.save(function(err) { if (err) return console.error(err); });

var user1 = new User({
    username: "johndoe",
    password: "password",
    email: "john@doe.com",
    age: 23,
    gender: "male",
    location: location1,
    languages: [userLanguage1, userLanguage2],
    imagePath: config.app.apiUrl + "assets/pictures/users/user-1.jpg"
});

user1.save(function(err) { if (err) return console.error(err); });

var user2 = new User({
    username: "miki",
    password: "pass",
    email: "miki@bla.com",
    location: location2,
    languages: [userLanguage2, userLanguage3]
});

user2.save(function(err) { if (err) return console.error(err); });

var user3 = new User({
    username: "janedoe",
    password: "pass",
    email: "janedoe@bla.com",
    location: location3,
    languages: [userLanguage2, userLanguage3]
});

user3.save(function(err) { if (err) return console.error(err); });

var event1 = new Event({
    name: "Let's speak English",
    language: language1,
    offer: offer1,
    topics: [t1, t2],
    users: [user1, user2],
    imagePath: config.app.apiUrl + "assets/pictures/events/event1.jpg"
});

event1.save(function(err) { if (err) return console.error(err); });

var event2 = new Event({
    name: "Let's speak French",
    language: language2,
    offer: offer2,
    topics: [t2, t3],
    users: [user2, user3],
    imagePath: config.app.apiUrl + "assets/pictures/events/event2.jpg"
});

event2.save(function(err) { if (err) return console.error(err); });

var event3 = new Event({
    name: "Let's speak advanced English",
    language: language1,
    offer: offer3,
    topics: [t1, t3],
    users: [user2, user3],
    imagePath: config.app.apiUrl + "assets/pictures/events/event3.jpg"
});

event3.save(function(err) { if (err) return console.error(err); });

mongoose.connection.close();