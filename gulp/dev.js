const gulp = require('gulp');

//HTML
const fileInclude = require ('gulp-file-include');
const fileIncludeSetting ={
    prefix:'@@',
    basepath:'@file'
}

//SASS
const sass =require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');

const server = require('gulp-server-livereload');

const clean = require('gulp-clean');

const fs = require('fs');

const sourceMaps = require('gulp-sourcemaps');

const plumber = require('gulp-plumber')

const notify = require('gulp-notify');

const webpack = require('webpack-stream');

const babel = require('gulp-babel');

const imegemin = require('gulp-imagemin');

const changed = require('gulp-changed');

const connect = require('gulp-connect');

const plumberNotify =(Title) => {
    errorHandler: notify.onError({
        title: Title,
        message:' Error <%= error.message %>',
        sound: true
    })
}
/*
gulp.task('connectDev', function () {
    connect.server({
      name: 'Dev App',
      root: 'build',
      host: '192.168.1.139',
      port: 8888,
      livereload: true,
      open: true
    });
  });

*/
gulp.task('html:dev', function(){
return gulp
.src(['./src/html/**/*.html','!./src/html/blocks/*.html'])
.pipe(changed('./build/',{hasChanged: changed.compareContents}))
.pipe(plumber(plumberNotify('HTML')))
.pipe(fileInclude(fileIncludeSetting))
.pipe(gulp.dest('./build/'))
//.pipe(connect.reload());
});

gulp.task('sass:dev', function(){
return gulp
.src('./src/scss/*.scss')
.pipe(changed('./build/css/'))
.pipe(plumber(plumberNotify('SCSS')))
.pipe(sourceMaps.init())
.pipe(sassGlob())
.pipe(sass().on('error', sass.logError))
.pipe(sourceMaps.write())
.pipe(gulp.dest('./build/css/'))
//.pipe(connect.reload());
});

gulp.task('images:dev', function(){
    return gulp
    .src('./src/images/**/*')
    .pipe(changed('./build/images/'))
    //.pipe(imegemin({verbose: true}))
    .pipe(gulp.dest('./build/images/'))
});

gulp.task('fonts:dev', function(){
    return gulp
    .src('./src/fonts/**/*')
    .pipe(changed('./build/fonts/'))
    .pipe(gulp.dest('./build/fonts/'))
});

gulp.task('files:dev', function(){
    return gulp
    .src('./src/files/**/*')
    .pipe(changed('./build/files/'))
    .pipe(gulp.dest('./build/files/'))
});

gulp.task('js:dev', function(){
    return gulp
    .src('./src/js.*.js')
    .pipe(changed('./build/js/'))
    .pipe(plumber(plumberNotify('JS')))
    .pipe(babel())
    .pipe(webpack(require('./../webpack.config.js')))
    .pipe(gulp.dest('./build/js/'))
})

gulp.task('server:dev', function(){
    return gulp.src('./build/')
    .pipe(server({
        host: '192.168.1.139',
        livereload: true,
        open: false
    }))
});

gulp.task('clean:dev',function(done){
    if (fs.existsSync('./build/')){
       return gulp.src('./build/',{read: false}).pipe(clean()) 
    }
    done();
});

gulp.task ('watch:dev',function(){
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass:dev'));
    gulp.watch('./src/**/*.html', gulp.parallel('html:dev'));
    gulp.watch('./src/images/**/*', gulp.parallel('images:dev'));
    gulp.watch('./src/fonts/**/*', gulp.parallel('fonts:dev'));
    gulp.watch('./src/files/**/*', gulp.parallel('files:dev'));
    gulp.watch('./src/js/**/*.js', gulp.parallel('js:dev'));
})


