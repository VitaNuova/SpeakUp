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

/* China Restaurant Bonsai */
var location1 = new Location({
    x: 48.191269,
    y: 11.620854
});
location1.save(function(err) { if (err) return console.error(err); });

/* Rabiang Restaurant (Thai) */
var location2 = new Location({
    x: 48.180892,
    y: 11.571234
});
location2.save(function(err) { if (err) return console.error(err); });

/* China Restaurant bei Ling */
var location3 = new Location({
    x: 48.167254,
    y: 11.570623
});
location3.save(function(err) { if (err) return console.error(err); });

/* Tokyo (Japanese place at Olympiazentrum) */
var location4 = new Location({
    x: 48.182666,
    y: 11.533838
});
location4.save(function(err) { if (err) return console.error(err); });

/* Pâtisserie Amandine (French bakery) */
var location5 = new Location({
    x: 48.134361,
    y: 11.536917
});
location5.save(function(err) { if (err) return console.error(err); });

/* Nur einmal Leben (Greek) */
var location6 = new Location({
    x: 48.183303,
    y: 11.563216
});
location6.save(function(err) { if (err) return console.error(err); });

/* Marbella restaurant (Spanish) */
var location7 = new Location({
    x: 48.154268,
    y: 11.540783
});
location7.save(function(err) { if (err) return console.error(err); });

/* KFC */
var location8 = new Location({
    x: 48.135757,
    y: 11.580582
});
location8.save(function(err) { if (err) return console.error(err); });

/* beach38 (global food) */
var location9 = new Location({
    x: 48.126522,
    y: 11.610805
});
location9.save(function(err) { if (err) return console.error(err); });

var location10 = new Location({
    x: 48.165425,
    y: 11.577104
});
location10.save(function(err) { if (err) return console.error(err); });

var location11 = new Location({
    x: 48.209130,
    y: 11.562841
});
location11.save(function(err) { if (err) return console.error(err); });

var location12 = new Location({
    x: 48.192576,
    y: 11.462931
});
location12.save(function(err) { if (err) return console.error(err); });

var location13 = new Location({
    x: 48.144237,
    y: 11.464991
});
location13.save(function(err) { if (err) return console.error(err); });

var location14 = new Location({
    x: 48.131854,
    y: 11.436967
});
location14.save(function(err) { if (err) return console.error(err); });

var location15 = new Location({
    x: 48.133261,
    y: 11.368217
});
location15.save(function(err) { if (err) return console.error(err); });

var location16 = new Location({
    x: 48.272677,
    y: 11.890595
});
location16.save(function(err) { if (err) return console.error(err); });

var location17 = new Location({
    x: 48.340446,
    y: 11.834462
});
location17.save(function(err) { if (err) return console.error(err); });

var location18 = new Location({
    x: 48.060032,
    y: 11.667897
});
location18.save(function(err) { if (err) return console.error(err); });

var language1 = new Language({
    name: "English",
    imagePath: config.app.apiUrl + "assets/pictures/languages/english.png"
});
language1.save(function(err) { if (err) return console.error(err); });

var language2 = new Language({
    name: "French",
    imagePath: config.app.apiUrl + "assets/pictures/languages/french.jpeg"
});
language2.save(function(err) { if (err) return console.error(err); });

var language3 = new Language({
    name: "Chinese",
    imagePath: config.app.apiUrl + "assets/pictures/languages/chinese.png"
});
language3.save(function(err) { if (err) return console.error(err); });

var language4 = new Language({
    name: "German",
    imagePath: config.app.apiUrl + "assets/pictures/languages/german.jpeg"
});
language4.save(function(err) { if (err) return console.error(err); });

var language5 = new Language({
    name: "Italian",
    imagePath: config.app.apiUrl + "assets/pictures/languages/italian.jpeg"
});
language5.save(function(err) { if (err) return console.error(err); });

var language6 = new Language({
    name: "Japanese",
    imagePath: config.app.apiUrl + "assets/pictures/languages/japanese.jpeg"
});
language6.save(function(err) { if (err) return console.error(err); });

var language7 = new Language({
    name: "Spanish",
    imagePath: config.app.apiUrl + "assets/pictures/languages/spanish.jpeg"
});
language7.save(function(err) { if (err) return console.error(err); });

var language8 = new Language({
    name: "Turkish",
    imagePath: config.app.apiUrl + "assets/pictures/languages/turkish.jpeg"
});
language8.save(function(err) { if (err) return console.error(err); });

var t1 = new Topic({
    name: "Swimming",
    imagePath: config.app.apiUrl + "assets/pictures/topics/swimming.jpg"
});
t1.save(function(err) { if (err) return console.error(err); });

var t2 = new Topic({
    name: "Environment",
    imagePath: config.app.apiUrl + "assets/pictures/topics/environment.jpg"
});
t2.save(function(err) { if (err) return console.error(err); });

var t3 = new Topic({
    name: "Food",
    imagePath: config.app.apiUrl + "assets/pictures/topics/food.jpg"
});
t3.save(function(err) { if (err) return console.error(err); });

var t4 = new Topic({
    name: "Cars",
    imagePath: config.app.apiUrl + "assets/pictures/topics/cars.jpg"
});
t4.save(function(err) { if (err) return console.error(err); });

var t5 = new Topic({
    name: "Entertainment",
    imagePath: config.app.apiUrl + "assets/pictures/topics/entertainment.jpg"
});
t5.save(function(err) { if (err) return console.error(err); });

var t6 = new Topic({
    name: "Movies",
    imagePath: config.app.apiUrl + "assets/pictures/topics/movies.jpg"
});
t6.save(function(err) { if (err) return console.error(err); });

var t7 = new Topic({
    name: "Music",
    imagePath: config.app.apiUrl + "assets/pictures/topics/music.jpg"
});
t7.save(function(err) { if (err) return console.error(err); });

var t8 = new Topic({
    name: "Oktoberfest",
    imagePath: config.app.apiUrl + "assets/pictures/topics/oktoberfest.jpg"
});
t8.save(function(err) { if (err) return console.error(err); });

var t9 = new Topic({
    name: "Human relationships",
    imagePath: config.app.apiUrl + "assets/pictures/topics/relationships.jpg"
});
t9.save(function(err) { if (err) return console.error(err); });

var t10 = new Topic({
    name: "Technology",
    imagePath: config.app.apiUrl + "assets/pictures/topics/technology.jpg"
});
t10.save(function(err) { if (err) return console.error(err); });

var t11 = new Topic({
    name: "Travel",
    imagePath: config.app.apiUrl + "assets/pictures/topics/travel.jpg"
});
t11.save(function(err) { if (err) return console.error(err); });

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
    name: "China Restaurant Bonsai",
    location: location1
});
restaurant1.save(function(err) { if (err) return console.error(err); });

var restaurant2 = new Restaurant({
    name: "Rabiang Restaurant (Thai cuisine)",
    location: location2
});
restaurant2.save(function(err) { if (err) return console.error(err); });

var restaurant3 = new Restaurant({
    name: "China Restaurant bei Ling",
    location: location3
});
restaurant3.save(function(err) { if (err) return console.error(err); });

var restaurant4 = new Restaurant({
    name: "Tokyo (Japanese place at Olympiazentrum)",
    location: location4
});
restaurant4.save(function(err) { if (err) return console.error(err); });

var restaurant5 = new Restaurant({
    name: "Pâtisserie Amandine (French bakery)",
    location: location5
});
restaurant5.save(function(err) { if (err) return console.error(err); });

var restaurant6 = new Restaurant({
    name: "Nur einmal Leben (Greek cuisine)",
    location: location6
});
restaurant6.save(function(err) { if (err) return console.error(err); });

var restaurant7 = new Restaurant({
    name: "Marbella restaurant (Spanish cuisine)",
    location: location7
});
restaurant7.save(function(err) { if (err) return console.error(err); });

var restaurant8 = new Restaurant({
    name: "KFC",
    location: location8
});
restaurant8.save(function(err) { if (err) return console.error(err); });

var restaurant9 = new Restaurant({
    name: "beach38 (global food)",
    location: location9
});
restaurant9.save(function(err) { if (err) return console.error(err); });

/* Basic English */
var userLanguage1 = new UserLanguage({
    language: language1,
    languageLevel: l1,
    topics: [t1, t2]
});

userLanguage1.save(function(err) { if (err) return console.error(err); });

/* Advanced English */
var userLanguage2 = new UserLanguage({
    language: language1,
    languageLevel: l6,
    topics: [t1, t3]
});

userLanguage2.save(function(err) { if (err) return console.error(err); });

/* French */
var userLanguage3 = new UserLanguage({
    language: language2,
    languageLevel: l3,
    topics: [t2, t3, t6, t7]
});

userLanguage3.save(function(err) { if (err) return console.error(err); });

var userLanguage4 = new UserLanguage({
    language: language2,
    languageLevel: l6,
    topics: [t1, t3, t4, t2]
});

userLanguage4.save(function(err) { if (err) return console.error(err); });

/* Chinese */
var userLanguage5 = new UserLanguage({
    language: language3,
    languageLevel: l2,
    topics: [t2, t5, t11]
});

userLanguage5.save(function(err) { if (err) return console.error(err); });

var userLanguage6 = new UserLanguage({
    language: language3,
    languageLevel: l5,
    topics: [t7, t8, t9]
});

userLanguage6.save(function(err) { if (err) return console.error(err); });

/* German */
var userLanguage7 = new UserLanguage({
    language: language4,
    languageLevel: l3,
    topics: [t9, t10, t11]
});

userLanguage7.save(function(err) { if (err) return console.error(err); });

var userLanguage8 = new UserLanguage({
    language: language4,
    languageLevel: l5,
    topics: [t8, t9]
});

userLanguage8.save(function(err) { if (err) return console.error(err); });

/* Italian */
var userLanguage9 = new UserLanguage({
    language: language5,
    languageLevel: l1,
    topics: [t1, t2, t3, t5]
});

userLanguage9.save(function(err) { if (err) return console.error(err); });

var userLanguage10 = new UserLanguage({
    language: language5,
    languageLevel: l4,
    topics: [t5, t6, t7]
});

userLanguage10.save(function(err) { if (err) return console.error(err); });

/* Japanese */
var userLanguage11 = new UserLanguage({
    language: language6,
    languageLevel: l2,
    topics: [t4, t6, t8]
});

userLanguage11.save(function(err) { if (err) return console.error(err); });

var userLanguage12 = new UserLanguage({
    language: language6,
    languageLevel: l5,
    topics: [t5, t6, t7]
});

userLanguage12.save(function(err) { if (err) return console.error(err); });

/* Spanish */
var userLanguage13 = new UserLanguage({
    language: language7,
    languageLevel: l3,
    topics: [t1, t3, t5]
});

userLanguage13.save(function(err) { if (err) return console.error(err); });

var userLanguage14 = new UserLanguage({
    language: language7,
    languageLevel: l6,
    topics: [t7, t6, t11, t10]
});

userLanguage14.save(function(err) { if (err) return console.error(err); });

/* Turkish */
var userLanguage15 = new UserLanguage({
    language: language8,
    languageLevel: l2,
    topics: [t2, t3, t6, t8]
});

userLanguage15.save(function(err) { if (err) return console.error(err); });

var userLanguage16 = new UserLanguage({
    language: language8,
    languageLevel: l4,
    topics: [t8, t9, t10, t11]
});

userLanguage16.save(function(err) { if (err) return console.error(err); });


var offer1 = new Offer({
    restaurant: restaurant1,
    from: new Date("2017-07-15T07:00:00.123Z"),
    to: new Date("2017-07-23T07:00:00.123Z"),
    numOfPeople: 5,
    discount: 25,
    imagePath: config.app.apiUrl + "assets/pictures/events/event1.jpg"
});

offer1.save(function(err) { if (err) return console.error(err); });

var offer2 = new Offer({
    restaurant: restaurant2,
    from: new Date("2017-07-17T07:00:00.123Z"),
    to: new Date("2017-07-21T07:00:00.123Z"),
    numOfPeople: 5,
    discount: 20,
    imagePath: config.app.apiUrl + "assets/pictures/events/event2.jpg"
});

offer2.save(function(err) { if (err) return console.error(err); });

var offer3 = new Offer({
    restaurant: restaurant3,
    from: new Date("2017-07-17T07:00:00.123Z"),
    to: new Date("2017-07-25T07:00:00.123Z"),
    numOfPeople: 3,
    discount: 10,
    imagePath: config.app.apiUrl + "assets/pictures/events/event3.jpg"
});

offer3.save(function(err) { if (err) return console.error(err); });

var offer4 = new Offer({
    restaurant: restaurant4,
    from: new Date("2017-07-17T07:00:00.123Z"),
    to: new Date("2017-07-25T07:00:00.123Z"),
    numOfPeople: 7,
    discount: 15,
    imagePath: config.app.apiUrl + "assets/pictures/events/event4.jpg"
});

offer4.save(function(err) { if (err) return console.error(err); });

var offer5 = new Offer({
    restaurant: restaurant5,
    from: new Date("2017-07-20T07:00:00.123Z"),
    to: new Date("2017-07-28T07:00:00.123Z"),
    numOfPeople: 5,
    discount: 25,
    imagePath: config.app.apiUrl + "assets/pictures/events/event5.jpg"
});

offer5.save(function(err) { if (err) return console.error(err); });

var offer6 = new Offer({
    restaurant: restaurant6,
    from: new Date("2017-08-01T07:00:00.123Z"),
    to: new Date("2017-08-10T07:00:00.123Z"),
    numOfPeople: 6,
    discount: 20,
    imagePath: config.app.apiUrl + "assets/pictures/events/event6.jpg"
});

offer6.save(function(err) { if (err) return console.error(err); });

var offer7 = new Offer({
    restaurant: restaurant7,
    from: new Date("2017-08-03T07:00:00.123Z"),
    to: new Date("2017-08-26T07:00:00.123Z"),
    numOfPeople: 8,
    discount: 30,
    imagePath: config.app.apiUrl + "assets/pictures/events/event7.jpg"
});

offer7.save(function(err) { if (err) return console.error(err); });

var offer8 = new Offer({
    restaurant: restaurant8,
    from: new Date("2017-07-15T07:00:00.123Z"),
    to: new Date("2017-07-30T07:00:00.123Z"),
    numOfPeople: 2,
    discount: 10,
    imagePath: config.app.apiUrl + "assets/pictures/events/event8.jpg"
});

offer8.save(function(err) { if (err) return console.error(err); });

var offer9 = new Offer({
    restaurant: restaurant9,
    from: new Date("2017-07-20T07:00:00.123Z"),
    to: new Date("2017-07-29T07:00:00.123Z"),
    numOfPeople: 6,
    discount: 25,
    imagePath: config.app.apiUrl + "assets/pictures/events/event9.jpg"
});

offer9.save(function(err) { if (err) return console.error(err); });

var user1 = new User({
    username: "johndoe",
    password: "password",
    email: "john@doe.com",
    age: 23,
    gender: "male",
    location: location10,
    languages: [userLanguage1, userLanguage9, userLanguage16],
    imagePath: config.app.apiUrl + "assets/pictures/users/user-1.jpg"
});

user1.save(function(err) { if (err) return console.error(err); });

var user2 = new User({
    username: "miki",
    password: "password",
    email: "miki@bla.com",
    location: location11,
    languages: [userLanguage4, userLanguage7, userLanguage2]
});

user2.save(function(err) { if (err) return console.error(err); });

var user3 = new User({
    username: "janedoe",
    password: "password",
    email: "janedoe@bla.com",
    location: location12,
    languages: [userLanguage3, userLanguage12, userLanguage15]
});

user3.save(function(err) { if (err) return console.error(err); });

var user4 = new User({
    username: "ann",
    password: "password",
    email: "anndoe@bla.com",
    location: location13,
    languages: [userLanguage6, userLanguage11]
});

user4.save(function(err) { if (err) return console.error(err); });

var user5 = new User({
    username: "mary",
    password: "password",
    email: "marydoe@bla.com",
    location: location14,
    languages: [userLanguage5, userLanguage8, userLanguage2, userLanguage11]
});

user5.save(function(err) { if (err) return console.error(err); });

var user6 = new User({
    username: "chenchang",
    password: "password",
    email: "chenchang@bla.com",
    location: location15,
    languages: [userLanguage5, userLanguage13]
});

user6.save(function(err) { if (err) return console.error(err); });

var user7 = new User({
    username: "mustafa",
    password: "password",
    email: "mustafa@bla.com",
    location: location16,
    languages: [userLanguage7, userLanguage14]
});

user7.save(function(err) { if (err) return console.error(err); });

var user8 = new User({
    username: "patrick",
    password: "password",
    email: "patrick@bla.com",
    location: location17,
    languages: [userLanguage10, userLanguage13, userLanguage2]
});

user8.save(function(err) { if (err) return console.error(err); });

var event1 = new Event({
    name: "Let's speak English",
    language: language1,
    offer: offer1,
    topics: [t1, t2],
    users: [user1, user2]
});

event1.save(function(err) { if (err) return console.error(err); });

var event2 = new Event({
    name: "Let's speak French",
    language: language2,
    offer: offer2,
    topics: [t2, t3],
    users: [user2, user3]
});

event2.save(function(err) { if (err) return console.error(err); });

var event3 = new Event({
    name: "Let's speak Chinese",
    language: language3,
    offer: offer3,
    topics: [t8, t4, t11],
    users: [user4, user5, user6]
});

event3.save(function(err) { if (err) return console.error(err); });

var event4 = new Event({
    name: "Let's speak German",
    language: language4,
    offer: offer4,
    topics: [t2, t7, t9],
    users: [user2, user5, user7]
});

event4.save(function(err) { if (err) return console.error(err); });

var event5 = new Event({
    name: "Let's speak Italian",
    language: language5,
    offer: offer5,
    topics: [t1, t3, t6],
    users: [user1, user8]
});

event5.save(function(err) { if (err) return console.error(err); });

var event6 = new Event({
    name: "Let's speak Japanese",
    language: language6,
    offer: offer6,
    topics: [t2, t6, t9],
    users: [user3, user4, user5]
});

event6.save(function(err) { if (err) return console.error(err); });

var event7 = new Event({
    name: "Let's speak Spanish",
    language: language7,
    offer: offer7,
    topics: [t1, t3, t7, t8],
    users: [user6, user7, user8]
});

event7.save(function(err) { if (err) return console.error(err); });

var event8 = new Event({
    name: "Let's speak Turkish",
    language: language8,
    offer: offer8,
    topics: [t5, t6, t7, t10],
    users: [user1, user3, user4]
});

event8.save(function(err) { if (err) return console.error(err); });

var event9 = new Event({
    name: "Let's speak advanced English",
    language: language1,
    offer: offer9,
    topics: [t5, t3],
    users: [user2, user5, user8]
});

event9.save(function(err) { if (err) return console.error(err); });

mongoose.connection.close();