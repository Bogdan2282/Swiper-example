const gulp = require('gulp');

//HTML
const fileInclude = require ('gulp-file-include');
const htmlclean = require ('gulp-htmlclean')
const fileIncludeSetting ={
    prefix:'@@',
    basepath:'@file'
}
const webpHtml = require('gulp-webp-html');

//SASS
const sass =require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const webpCss = require('gulp-webp-css');

//images
const imegemin = require('gulp-imagemin');
const webp = require('gulp-webp');

const server = require('gulp-server-livereload');

const clean = require('gulp-clean');

const fs = require('fs');

const sourceMaps = require('gulp-sourcemaps');

const grupMedia = require('gulp-group-css-media-queries');// полезно для продакшена 

const plumber = require('gulp-plumber')

const notify = require('gulp-notify');

const webpack = require('webpack-stream');

const babel = require('gulp-babel');

const changed = require('gulp-changed');

const plumberNotify =(Title) => {
    errorHandler: notify.onError({
        title: Title,
        message:' Error <%= error.message %>',
        sound: true
    })
}

gulp.task('html:docs', function(){
return gulp
.src(['./src/html/**/*.html','!./src/html/blocks/*.html'])
.pipe(changed('./docs/'))
.pipe(plumber(plumberNotify('HTML')))
.pipe(fileInclude(fileIncludeSetting))
.pipe(webpHtml())
.pipe(htmlclean())
.pipe(gulp.dest('./docs/'));

});

gulp.task('sass:docs', function(){
return gulp
.src('./src/scss/*.scss')
.pipe(changed('./docs/css/'))
.pipe(plumber(plumberNotify('SCSS')))
//.pipe(sourceMaps.init())
.pipe(autoprefixer())
.pipe(sassGlob())
//.pipe(grupMedia())
.pipe(sass())
.pipe(csso())
.pipe(webpCss())
//.pipe(sourceMaps.write())
.pipe(gulp.dest('./docs/css/'))
});

gulp.task('images:docs', function(){
    return gulp
    .src('./src/images/**/*')
    .pipe(changed('./docs/images/'))
    .pipe(webp())
    .pipe(gulp.dest('./docs/images/'))
    .pipe(gulp.src('./src/images/**/*'))
    .pipe(changed('./docs/images/'))
    .pipe(imegemin({verbose: true}))
    .pipe(gulp.dest('./docs/images/'))
});

gulp.task('fonts:docs', function(){
    return gulp
    .src('./src/fonts/**/*')
    .pipe(changed('./docs/fonts/'))
    .pipe(gulp.dest('./docs/fonts/'))
});

gulp.task('files:docs', function(){
    return gulp
    .src('./src/files/**/*')
    .pipe(changed('./docs/files/'))
    .pipe(gulp.dest('./docs/files/'))
});

gulp.task('js:docs', function(){
    return gulp
    .src('./src/js.*.js')
    .pipe(changed('./docs/js/'))
    .pipe(plumber(plumberNotify('JS')))
    .pipe(babel())
    .pipe(webpack(require('./../webpack.config.js')))
    .pipe(gulp.dest('./docs/js'))
})

gulp.task('server:docs', function(){
    return gulp.src('./docs/').pipe(server({
        livereload: true,
        open: true
    }))
});

gulp.task('clean:docs',function(done){
    if (fs.existsSync('./docs/')){
       return gulp.src('./docs/',{read: false}).pipe(clean()) 
    }
    done();
});




