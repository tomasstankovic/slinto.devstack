/**
 * Middleware config.
 */
var express = require('express'),
  bodyParser = require('body-parser'),
  compress = require('compression'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  favicon = require('serve-favicon'),
  flash = require('connect-flash'),
  methodOverride = require('method-override'),
  mongoose = require('mongoose'),
  path = require('path'),
  i18n = require('i18n'),
  router = require('./router'),
  pjson = require('../package.json');

const DEV_ENV = 'DEVELOPMENT',
  APP_VER = pjson.version,
  DB_URL = process.env.DB_URL || 'db_url_here';

export const CURRENT_ENV = process.env.NODE_ENV || DEV_ENV;
export const port = process.env.PORT || 8080;

/**
 * Basic app setup.
 * @param {Object} app Express object
 */
export function appSetup(app) {
  app.locals.CURRENT_ENV = CURRENT_ENV;
  app.locals.APP_VER = APP_VER;
  app.set('view engine', 'jade');
  app.set('views', 'server/views');
  //app.use(favicon(path.join(__dirname, '/../build/img/favicons/favicon.ico')));
  app.use(compress());
  app.use(methodOverride());

  i18n.configure({
    locales: ['en', 'sk'],
    defaultLocale: 'en',
    directory: __dirname + '/../locales',
    cookie: 'lang'
  });
  app.use(cookieParser());
  app.use(i18n.init);

  app.use(session({
    secret: 'somesecrettokenhere',
    resave: false,
    saveUninitialized: false
  }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(flash());

  // i18n cookie and locals
  app.use(function(req, res, next) {
    if (typeof req.query.lang === 'string') {
      res.cookie('lang', req.query.lang, {
        maxAge: 900000,
        httpOnly: true
      });
      req.setLocale(req.query.lang);
      res.locals.locale = req.query.lang;
    }
    next();
  });

  // Public dir to locals middleware.
  app.use(function(req, res, next) {
    if (CURRENT_ENV === DEV_ENV) {
      res.locals.publicPrefix = '/client';
    } else {
      res.locals.publicPrefix = '/build';
    }
    next();
  });

  // Public folder setup.
  if (CURRENT_ENV === DEV_ENV) {
    app.use('/bower_components', express.static(path.join(__dirname, '../bower_components'), {
      redirect: false
    }));
    app.use('/client', express.static(path.join(__dirname, '../client'), {
      redirect: false
    }));
    app.use('/build', express.static(path.join(__dirname, '../build'), {
      redirect: false
    }));
  } else {
    app.use('/build', express.static(path.join(__dirname, '../build'), {
      redirect: false
    }));
  }

  router(app);
};

/**
 * Database connection.
 */
export function dbConnect() {
  mongoose.connect(DB_URL, function(err) {
    if (err) {
      console.log('MongoDB: Connecting error : ' + err);
    } else {
      console.log('MongoDB: Succeeded connected!');
    }
  });
};
