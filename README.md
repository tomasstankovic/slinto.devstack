# Slinto DevStack [![Dependency Status](https://david-dm.org/slinto/slinto-devstack.png)](https://david-dm.org/slinto/slinto-devstack) [![devDependency Status](https://david-dm.org/slinto/slinto-devstack/dev-status.png)](https://david-dm.org/slinto/slinto-devstack#info=devDependencies)

Slinto DevStack is my simple automated DevStack for creating [Node.js](http://nodejs.org) apps including: 
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
> Run server, nodemon for automatically reload node.js app, livereloading when is jade, js or css changed and run JSHint. Automatic compilation of Stylus code and automatic creating of google deps file.

```
gulp server
```
Type `gulp server` and open localhost:3000 in your browser.

### Production build
> Compilation of Stylus code, minifying CSS code, image minifying and run Google Closure Compiler.

```
gulp build
```

### Error: spawn EMFILE on OSX
Call `ulimit -n 10240` or `gulp set-ulimit`.
For automatic setup on start, call `gulp server-ulimit` instead `gulp server`

## License

[MIT](http://opensource.org/licenses/MIT) © [Tomáš Stankovič](http://slinto.sk)
