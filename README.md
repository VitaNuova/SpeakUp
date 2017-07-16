# SpeakUp application for SEBA Master course

## Prerequisites

[Mongo DB](https://www.mongodb.com/download-center#community)

[Node.js](https://nodejs.org/de/download/)

## Quickstart

Clone the repository:
```
git clone https://github.com/VitaNuova/SpeakUp.git
```

### Server application

start mongod service on your local machine:

* linux - ```sudo service mongod start```
* windows -  usually ```C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe```

Copy ```backend/config/config.dev_local.js``` into same folder and name it ```config.js```.

Adjust the parameters for the database in newly created ```config.js```, if necessary. 

```
cd SpeakUp/backend
npm install
node fill_db.js
npm start
```

### Client application

```
cd SpeakUp/frontend
npm install
npm run build
npm start
```

## Notes

If you have problems starting the server for the client application, please run:

```npm install -g superstatic```

There are reported problems that somethimes it wont install from ```package.json``` file.

## Devevlopers

* Branislav Vidojevic - branislav.vidojevic@tum.de - @Branislav1993
* Marija Jovanovic - marija.jovanovic@tum.de - @JovanovicMarija
* Naum Gjorgjeski - naum.gjorgjeski@tum.de - @NaumGj
* Viktoriia Bakalova - viktoriia.bakalova@tum.de - @VitaNuova
