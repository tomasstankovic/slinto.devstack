/**
 * Middleware config.
 */
var express = require('express'),
  bodyParser = require('body-parser'),
  compress = require('compression'),
  cookieParser = require('cookie-parser'),
  csrf = require('csurf'),
  session = require('express-session'),
  favicon = require('serve-favicon'),
  methodOverride = require('method-override'),
  mongoose = require('mongoose'),
  morgan = require('morgan'),
  path = require('path');

var DEV_ENV = 'development',
  CURRENT_ENV = process.env.NODE_ENV || DEV_ENV,
  port = process.env.PORT || 3000,
  DB_URL = 'db_url_here';

var appSetup = function(app) {
  app.locals.CURRENT_ENV = CURRENT_ENV;
  app.set('view engine', 'jade');
  app.set('views', 'server/views');
  app.use(compress());

  app.use(methodOverride());
  app.use(cookieParser());
  app.use(session({
    secret: 'somesecrettokenhere',
    resave: false,
    saveUninitialized: false
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  if (CURRENT_ENV === DEV_ENV) {
    app.use(morgan('dev', {
      skip: function(req, res) {
        return res.statusCode === 304;
      }
    }));
    app.use('/bower_components', express.static(path.join(__dirname, '../bower_components')));
    app.use('/client', express.static(path.join(__dirname, '../client')));
    app.use('/build', express.static(path.join(__dirname, '../build')));
  } else {
    app.use('/build', express.static(path.join(__dirname, '../build')));
  }

};

var dbConnect = function() {
  mongoose.connect(DB_URL, function(err, res) {
    if (err) {
      console.log('MongoDB: Connecting error : ' + err);
    } else {
      console.log('MongoDB: Succeeded connected!');
    }
  });
};

module.exports = {
  CURRENT_ENV: CURRENT_ENV,
  port: port,
  dbConnect: dbConnect,
  appSetup: appSetup
};
