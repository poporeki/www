var gulp= require('gulp');
var server= require('gulp-express');
var less= require('gulp-less');
var plumber=require('gulp-plumber');


var assets={
  views:'./views/**/*.jade',
  public:{
    js:'./public/js/**/*.js',
    css:'./public/css/**/*.css',
    less:'./public/less/**/*.less'
  },
  publicPath:{
    js:'./public/js',
    css:'./public/css',
    less:'./public/less'
  }
}
gulp.task('default', function() {
  server.run(['./bin/www']); //启动

  gulp.watch('views/**/*.jade', server.notify); //监视模板文件
  gulp.watch(['app.js', 'routes/**/*.js'], server.run);
  gulp.watch('public/**/*.css', server.notify);
  gulp.watch('public/**/*.js', server.notify);
  gulp.watch(assets.public.less,['watch_less']);
});

gulp.task('watch_less',function(){
  gulp.src([assets.public.less,'!./public/less/default-less.less'])
      .pipe(plumber())
      .pipe(less())
      .pipe(gulp.dest(assets.publicPath.css));
});
