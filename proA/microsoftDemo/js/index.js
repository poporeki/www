$(function () {
    var $btn = $('nav').find('.btn');
    $btn
        .on('mouseenter', function (e) {
            e.preventDefault();
            var $this = $(this),
                $e = $(e.target),
                $liSib = $this.parent('li').siblings(),
                $liSibBtn = $liSib.children('.btn'),
                $liSibMenu = $liSib.children('.menu'),
                $menu = $this.siblings('.menu');

            if ($this.data('menu-btn') === 2 && $menu) {
                console.log('chufa')
                var $sUl = $this.parent().parent('.menu');
                var $tUl = $this.siblings('.menu');
                var lsHei = rigHei = 0;

                $sUl.children('li').each(function () {
                    lsHei += $(this).outerHeight();
                });
                rigHei = $tUl.outerHeight();

                if (lsHei > rigHei) {
                    $sUl.outerHeight(lsHei);
                    $tUl.outerHeight(lsHei);
                } else if (lsHei < rigHei) {
                    $sUl.outerHeight(rigHei);
                    $tUl.outerHeight(rigHei);
                }
            }



            $this.css({ 'background-color': '#d8d8d8' });
            $liSibBtn.css({ 'background-color': '' })
            $liSibMenu.css({ 'display': 'none' });
            $this.siblings('.menu').css({ 'display': 'block' });
        })
    $btn.parent()
        .on('mouseleave', function (e) {
            $(this).children('.btn').css({ 'background-color': '' });
            $(this).children('.btn').siblings('.menu').css({ 'display': 'none' });
        });

});


/*轮播 */

/**
 * .banner
 *      //主体列表
 *      ul.banner-list
 *          li.list-item
 *              a.item-lk
 *                  .text-block
 *          li.list-item
 *              a.item-lk
 *                  .text-block
 *      //小圆点
 *      .tips
 *          a.tips-btn
 *      //控制按钮
 *      .controls-block
 *          a.prev
 *          a.next
 * 
 *      //暂停自动轮播
 *      .pause-block
 *          a.pause-btn
 *          a.play-btn
 * 
 */
// $(function () {
//     var $wrap = $('.banner'),
//         $list = $wrap.children('.banner-list'),
//         $item = $list.children('.list-item'),
//         $textBlock = $item.find('.text-block'),
//         $pauseBlock,
//         $btn, $tipsBtn,
//         idx = reidx = 0,
//         autoPlay = true,
//         timer,
//         tim = 5000,
//         num = $item.length;
//     init();

//     //初始化
//     function init() {
//         $item.eq(0).css({ 'display': 'block' }).siblings().css({ 'display': 'none' });
//         addTips();
//         addControls();
//         timer = setTimeout(function () {
//             play('next');
//         }, tim);

//     }
//     //添加圆点
//     function addTips() {
//         var alk = '';
//         for (var i = 0; i < num; i++) {
//             alk += '<a href="##" class="tips-btn"></a>';

//         }
//         var addCon = '<div class="tips">' +
//             alk +
//             '</div>';
//         $wrap.append(addCon);
//         $tipsBtn = $('.tips').children('.tips-btn');
//         $tipsBtn.eq(0).addClass('clicked').siblings().removeClass('clicked');

//     }
//     //添加控制
//     function addControls() {
//         var addCon = '<div class="controls-block">' +
//             '<a href="##" class="btn prev">' +
//             '<i class="fa fa-angle-left"></i>' +
//             '</a>' +
//             '<a href="##" class="btn next">' +
//             '<i class="fa fa-angle-right"></i>' +
//             '</a>' +
//             '</div>' +
//             '<div class="pause-block">' +
//             '<a href="##" class="pause-btn">' +
//             '<i class="fa fa-pause"></i>' +
//             '</a>' +
//             '<a href="##" class="play-btn">' +
//             '<i class="fa fa-caret-right"></i>' +
//             '</a>' +
//             '</div>';
//         $wrap.append(addCon);
//         $btn = $('.controls-block').children('.btn');
//         $pauseBlock = $('.pause-block');
//         addEvents();
//     }

//     //添加事件监听
//     function addEvents() {
//         //单击翻页按钮
//         $btn.on('click', function (e) {
//             e.preventDefault();
//             var $e = $(e.target);
//             if ($e.hasClass('prev')) {
//                 idx--;
//                 play('prev');
//                 return
//             } else if ($e.hasClass('next')) {
//                 idx++;
//                 play('next');
//                 return
//             }
//         });
//         //单击小圆点
//         $tipsBtn.on('click', function () {
//             var index = $(this).index();
//             play(index);
//         });
//         $pauseBlock.on('click', 'a', function () {
//             if ($(this).hasClass('pause-btn')) {
//                 autoPlay = false;
//                 return
//             }
//             if ($(this).hasClass('play-btn')) {
//                 autoPlay = true;
//                 return
//             }
//         });
//         //鼠标移入轮播范围内
//         $wrap
//             .on('mouseenter', function () {
//                 clearTime();
//             })
//             .on('mouseleave', function () {
//                 timer = setTimeout(function () {
//                     idx++;
//                     play('next');
//                 }, tim);
//             });
//     }
//     //获得idx的值
//     function getIndex(words) {
//         //判断是否为number
//         if (typeof words == 'number') {
//             return idx = words;
//         }
//         switch (words) {
//             case 'prev':
//                 idx < 0 ? idx = num : '';
//                 break;
//             case 'next':
//                 idx >= num ? idx = 0 : '';
//                 break;
//             default:
//                 console.log('error');
//         }
//         return idx;
//     }
//     /*轮播实现 */
//     function play(words) {
//         getIndex(words);
//         clearTime();
//         $item.eq(idx).css({ 'display': 'block' })
//                 .siblings().css({ 'display': 'none' });
//         $tipsBtn.eq(idx).addClass('clicked')
//                     .siblings().removeClass('clicked');
//         /*判断是否自动播放 */
        
//         if (autoPlay == true) {
//             timer = setTimeout(function () {
//                 idx++;
//                 play('next');
//             }, tim);
//         }
//     }
//     function clearTime() {
//         return timer ? clearTimeout(timer) : '';
//     }
// });