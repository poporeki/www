$(function(){
    $(window).on('scroll resize',function(){
        var target=$('#left-nav');
        if(target.hasClass('affix')){
            $('#left-nav').width($('#left-nav').parent().width());
        }    
    })
   
    $(window).scroll(function(){
        var $findBox=$('.find-box');
        var h=$findBox.offset().top-$(document).scrollTop()+$findBox.height();
        console.log(h);
    })
    
});