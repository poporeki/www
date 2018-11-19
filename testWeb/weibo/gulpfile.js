var gulp=require('gulp');
var browsync=require('browser-sync').create();
var sass=require('gulp-sass');
var PORT=require('./app');
var reload=browsync.reload;
gulp.task('browSync',['sass'],function(){
    browsync.init({
        proxy:'localhost:'+PORT
    });
    gulp.watch('./public/sass/**/*.scss',['sass']);
    gulp.watch('./views/**/*.ejs').on('change',reload);
})

gulp.task('sass',function(){
    gulp.src('./public/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'))
        .pipe(reload({stream:true}));
})

gulp.task('default',['browSync']);