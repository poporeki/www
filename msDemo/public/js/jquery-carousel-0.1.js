/**
 * 自定义轮播插件 Jquery
 * 
 * 结构：
 *      .banner #banner
 *          ul.banner-list
 *              li.list-item
 *                  a.item-lk
 *              li.list-item
 *                  a.item-lk
 *              *********
 * 使用
 *      $('#banner').carousels({
 *              autoPlay:   //true或false
 *              time:       //轮播时间
 *       });
 */


;
(function ($) {
    $.fn.carousels = function (options) {
        var __DEFAULTS__ = {
            autoPlay: true,
            time: 5000,
        }
        var __PROP__={
            init:function(){
                this.$item.eq(0).css({
                    'display': 'block'
                }).siblings().css({
                    'display': 'none'
                });
                addTips();
                addControls();
                timer = setTimeout(function () {
                    play('next');
                }, tim);
            }
        }
        var ops = $.extend({}, __DEFAULTS__, options);
        var $wrap = this,
            $list = $wrap.children('.banner-list'),
            $item = $list.children('.list-item'),
            $textBlock = $item.find('.text-block'),
            $pauseBlock,
            $btn, $tipsBtn,
            idx = reidx = 0,
            autoPlay = ops.autoPlay,
            timer,
            tim = ops.time,
            num = $item.length;
        this.idx=this.reidx=0;
        this.$list=$wrap.children('.banner-list');
        this.$item=$list.children('.list-item');
        this.$textBlock=$item.find('.text-block');
        init();
        //初始化
        function init() {
            $item.eq(0).css({
                'display': 'block'
            }).siblings().css({
                'display': 'none'
            });
            addTips();
            addControls();
            timer = setTimeout(function () {
                play('next');
            }, tim);

        }
        //添加圆点
        function addTips() {
            var alk = '';
            for (var i = 0; i < num; i++) {
                alk += '<a href="##" class="tips-btn"></a>';

            }
            var addCon = '<div class="tips">' +
                alk +
                '</div>';
            $wrap.append(addCon);
            $tipsBtn = $wrap.find('.tips').children('.tips-btn');
            $tipsBtn.eq(0).addClass('clicked').siblings().removeClass('clicked');

        }
        //添加控制
        function addControls() {
            var addCon = '<div class="controls-block">' +
                '<a href="##" class="btn prev">' +
                '<i class="fa fa-angle-left"></i>' +
                '</a>' +
                '<a href="##" class="btn next">' +
                '<i class="fa fa-angle-right"></i>' +
                '</a>' +
                '</div>' +
                '<div class="pause-block">' +
                '<a href="##" class="pause-btn">' +
                '<i class="fa fa-pause"></i>' +
                '</a>' +
                '<a href="##" class="play-btn">' +
                '<i class="fa fa-caret-right"></i>' +
                '</a>' +
                '</div>';
            $wrap.append(addCon);
            $btn = $wrap.find('.controls-block').children('.btn');
            $pauseBlock = $wrap.find('.pause-block');
            addEvents();
        }

        //添加事件监听
        function addEvents() {
            //单击翻页按钮
            $btn.on('click', function (e) {
                e.preventDefault();
                var $e = $(e.target);
                if ($e.hasClass('prev')) {
                    idx--;
                    play('prev');
                    return
                } else if ($e.hasClass('next')) {
                    idx++;
                    play('next');
                    return
                }
            });
            //单击小圆点
            $tipsBtn.on('click', function () {
                var index = $(this).index();
                play(index);
            });
            $pauseBlock.on('click', 'a', function () {
                if ($(this).hasClass('pause-btn')) {
                    autoPlay = false;
                    return
                }
                if ($(this).hasClass('play-btn')) {
                    autoPlay = true;
                    return
                }
            });
            //鼠标移入轮播范围内
            $wrap
                .on('mouseenter', function () {
                    clearTime();
                })
                .on('mouseleave', function () {
                    timer = setTimeout(function () {
                        idx++;
                        play('next');
                    }, tim);
                });
        }
        //获得idx的值
        function getIndex(words) {
            //判断是否为number
            if (typeof words == 'number') {
                return idx = words;
            }
            switch (words) {
                case 'prev':
                    idx < 0 ? idx = num : '';
                    break;
                case 'next':
                    idx >= num ? idx = 0 : '';
                    break;
                default:
                    console.log('error');
            }
            return idx;
        }
        /*轮播实现 */
        function play(words) {
            getIndex(words);
            clearTime();
            $item.eq(idx).css({
                    'display': 'block'
                })
                .siblings().css({
                    'display': 'none'
                });
            $tipsBtn.eq(idx).addClass('clicked')
                .siblings().removeClass('clicked');
            /*判断是否自动播放 */

            if (autoPlay == true) {
                timer = setTimeout(function () {
                    idx++;
                    play('next');
                }, tim);
            }
        }

        function clearTime() {
            return timer ? clearTimeout(timer) : '';
        }
        return this;
    }
})(jQuery);