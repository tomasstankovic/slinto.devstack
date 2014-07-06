# Slinto DevStack [![Dependency Status](https://david-dm.org/slinto/slinto-devstack.png)](https://david-dm.org/slinto/slinto-devstack) [![devDependency Status](https://david-dm.org/slinto/slinto-devstack/dev-status.png)](https://david-dm.org/slinto/slinto-devstack#info=devDependencies)

Slinto DevStack is my simple devStack for creating [Node.js](http://nodejs.org) apps including: 
  - [Google Closure Tools (Library, Compiler)](https://developers.google.com/closure/)
  - [Express - web application framework for node](http://expressjs.com/)
  - [Stylus — expressive, robust, feature-rich CSS preprocessor](http://learnboost.github.io/stylus/)
  - [nib - CSS3 extensions for Stylus](http://visionmedia.github.io/nib/)
  - [Jade - Template Engine](http://jade-lang.com/)
  - [Mongoose](http://mongoosejs.com/)
  - [Nodemon](http://nodemon.io/)
  - Image minifier
  - JSHint
  - Livereloading (Good with [Google Chrome Extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei))


## Prerequisites
[Node.js](http://nodejs.org)
```
npm install -g gulp
npm install -g bower
```

## Installation
```
git clone git@github.com:slinto/slinto-devstack.git
cd slinto-devstack
npm install && bower install
```

## Workflow

### Recomended dev workflow
```
gulp server
```
Type `gulp server` and open localhost:3000 in your browser.

### Production build
```
gulp build
```
