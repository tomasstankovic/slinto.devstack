var gulp = require('gulp'),
  changed = require('gulp-changed'),
  closureCompiler = require('gulp-closure-compiler'),
  closureDeps = require('gulp-closure-deps'),
  jshint = require('gulp-jshint'),
  livereload = require('gulp-livereload'),
  minifyCSS = require('gulp-minify-css'),
  nib = require('nib'),
  nodemon = require('gulp-nodemon'),
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
    .pipe(changed('./build'))
    .pipe(closureDeps({
      fileName: 'deps.js',
      prefix: '../../../..'
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('minify-css', function() {
  return gulp.src(paths.css)
    .pipe(changed('./build/css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('stylus', function() {
  return gulp.src(paths.stylus)
    .pipe(changed('./build/css'))
    .pipe(stylus({
      errors: true,
      use: [nib()]
    }))
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

gulp.task('default', ['stylus', 'lint', 'deps']);

gulp.task('build', function() {
  runSequence('clean', 'stylus', 'minify-css', 'compile');
});

gulp.task('start-server', function() {
  nodemon({
    script: 'server/app.js',
    watch: ['server/**/*.js']
  }).on('change', ['lint']);

  livereload.listen();
  gulp.watch(['client/css/**/*.styl'], ['stylus']);
  gulp.watch(['client/js/**/*.js'], ['lint', 'deps']);
  gulp.watch(['build/**', 'server/views/**/*.jade']).on('change', livereload.changed);
});

gulp.task('server-ulimit', ['set-ulimit', 'start-server']);
gulp.task('server', ['start-server']);
