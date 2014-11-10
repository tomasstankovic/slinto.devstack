var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  changed = require('gulp-changed'),
  closureCompiler = require('gulp-closure-compiler'),
  closureDeps = require('gulp-closure-deps'),
  imagemin = require('gulp-imagemin'),
  jshint = require('gulp-jshint'),
  livereload = require('gulp-livereload'),
  minifyCSS = require('gulp-minify-css'),
  mocha = require('gulp-mocha'),
  nib = require('nib'),
  nodemon = require('gulp-nodemon'),
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber'),
  pngcrush = require('imagemin-pngcrush'),
  rimraf = require('gulp-rimraf'),
  runSequence = require('run-sequence'),
  shell = require('gulp-shell'),
  size = require('gulp-size'),
  stylus = require('gulp-stylus');

var paths = {
  scriptsFrontend: [
    './bower_components/closure-library/closure/goog/**/*.js',
    './client/js/**/*.js'
  ],
  scripts: [
    './client/js/**/*.js',
    './server/**/*.js'
  ],
  images: ['./client/img/*'],
  stylus: ['./client/css/app.styl'],
  css: ['./build/css/app.css']
};

var errorNotify = notify.onError({
  message: "Error: <%= error.message %>",
  title: "<%= error.plugin %> error!"
});

gulp.task('clean', function() {
  return gulp.src(['./build/js', './build/css', './build/deps.js'], { read: false })
    .pipe(rimraf({ force: true }));
});

gulp.task('clean-all', function() {
  return gulp.src('./build', { read: false })
    .pipe(rimraf({ force: true }));
});

gulp.task('compile', function() {
  return gulp.src(paths.scriptsFrontend)
    .pipe(closureCompiler({
      compilerPath: './bower_components/closure-compiler/compiler.jar',
      fileName: 'build.js',
      compilerFlags: {
        closure_entry_point: 'slinto.app',
        compilation_level: 'ADVANCED_OPTIMIZATIONS',
        define: [
          "goog.DEBUG=false"
        ],
        //debug: true,
        //formatting: 'PRETTY_PRINT',
        only_closure_dependencies: true,
        output_wrapper: '(function(){%output%})();',
        warning_level: 'VERBOSE'
      }
    }))
    .pipe(size({
      showFiles: true
    }))
    .pipe(size({
      showFiles: true,
      gzip: true
    }))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('deps', function() {
  return gulp.src(paths.scriptsFrontend)
    .pipe(closureDeps({
      fileName: 'deps.js',
      prefix: '../../../..'
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('imagemin', function () {
  return gulp.src(paths.images)
    .pipe(imagemin({
      use: [pngcrush()]
  }))
  .pipe(gulp.dest('./build/img'));
});

gulp.task('jshint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(notify(function (file) {
      if (file.jshint.success) {
        return false;
      }

      var errors = file.jshint.results.map(function (data) {
        if (data.error) {
          return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
        }
      }).join("\n");
      return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
    }))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('minify-css', function() {
  return gulp.src(paths.css)
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('stylus', function() {
  return gulp.src(paths.stylus)
    .pipe(plumber({
      errorHandler: errorNotify
    }))
    .pipe(stylus({
      errors: true,
      use: [nib()]
    }))
    .pipe(autoprefixer(['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie 8', 'ie 9']))
    .pipe(size({
      showFiles: true
    }))
    .pipe(size({
      showFiles: true,
      gzip: true
    }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('set-ulimit', shell.task([
  'ulimit -n 10240'
]));

gulp.task('test', function () {
  return gulp.src('test/**/*.js', {read: false})
    .pipe(mocha({
      reporter: 'spec'
    }));
});

gulp.task('dev', ['stylus', 'jshint', 'test', 'deps']);

gulp.task('build', function() {
  runSequence('clean', 'stylus', 'minify-css', 'image-copy', 'test', 'compile');
});

gulp.task('image-copy', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest('./build/img'));
});

gulp.task('start-server', function() {
  nodemon({
    script: 'server/app.js',
    watch: ['server/**/*.js']
  }).on('change', ['jshint', 'test']);

  livereload.listen();
  gulp.watch(['client/css/**/*.styl'], ['stylus']);
  gulp.watch(['client/js/**/*.js'], ['jshint', 'test', 'deps']);
  gulp.watch(['test/**/*.js'], ['test']);
  gulp.watch(['build/**', 'server/views/**/*.jade']).on('change', livereload.changed);
  gulp.watch(['client/img/**/*.png'], ['image-copy']);
});

gulp.task('server', ['dev', 'start-server']);
gulp.task('default', ['set-ulimit', 'dev', 'start-server']);
