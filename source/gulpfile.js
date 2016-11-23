var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require('gulp-notify');

// Javascript libs
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

// SCSS libs
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');

// Prefix all latest browsers and IE9+
var autoprefixerOptions = {
  browsers: ['last 2 versions', 'Explorer >= 9', 'Android >= 4.1', 'Safari >= 7', 'iOS >= 7']
};

// Setup BrowserSync
var browserSync = require('browser-sync').create();

// Javascript
gulp.task('js', function() {
    return gulp.src('js/*js')
        .pipe(concat('base.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
})

gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

// Sass
gulp.task('styles', function() {
  return sass('scss/*.scss', { style: 'expanded' })
    .pipe(plumber())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
});

// Serve all the things and start watching
gulp.task('serve', ['js'], function (done) {
    browserSync.init({
        server: {
            baseDir: './'
        },
        notify: false
    });

    gulp.watch('js/*.js', ['js-watch']);
    gulp.watch('scss/**/*.scss', ['styles']);
    gulp.watch('**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);