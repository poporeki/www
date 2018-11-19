var gulp=require('gulp');
var less=require('gulp-less');
var browserSync=require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('less',function(){
    gulp.src('less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('css'))
        .pipe(reload({stream:true}));
});

gulp.task('default',['browser-sync']);

var filePath=['css/*/.css','js/*/.js','*.html'];
gulp.task('browser-sync',['less'],function(){
    browserSync.init({
        server:{
            baseDir:'./'
        }
    })
    gulp.watch('less/**/*.less',['less']);
    gulp.watch(filePath).on('change',reload);
});
