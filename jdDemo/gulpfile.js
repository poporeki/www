var gulp=require('gulp');
var PORT=require('./app');
var browsync=require('browser-sync').create(),
    reload=browsync.reload;

    /*路径 */
var static = {
    jade: './views/**/*.jade',
    css: './public/css/**/*.css',
    less: './public/less/**/*.less',
    js: './public/js/**/*.js',
    img: './public/images/**/*',
    fonts: './public/fonts/**/*',
    swf: './public/swf/**/*.swf',
    data:'./public/data/**/*.json',

    path: {
        outPath: './dist/',
        outPath_img: './dist/public/images/',
        outPath_css: './dist/public/css/',
        outPath_js: './dist/public/js/',
        outPath_data:'./dist/public/data/',
    }
}

gulp.task('brow-sync',function(){
    browsync.init({
        proxy: 'http://localhost:'+PORT,
        browser: 'chrome',
        notify: false,
        port: 4001
    });
    gulp.watch([static.jade,static.js,'app.js']).on('change',reload);
})

gulp.task('default',['brow-sync']);