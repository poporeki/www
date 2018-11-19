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
 *              speed:       //轮播时间
 *       });
 */


;
(function ($,options) {
    $.fn.carousels = function (options) {

        var __DEFAULTS__ = {
            autoPlay: true,
            speed: 5000,
        }


        var ops = $.extend({}, __DEFAULTS__, options);
        var __PROP__ = {
            init: function (_this,ops) {
                var _self = this;
                _this.idx = 0;
                _this.$list = _this.children('.banner-list');
                _this.$item = _this.$list.children('.list-item');
                _this.$textBlock = _this.$item.find('.text-block');
                _this.num = _this.$item.length;
                _this.$item.eq(0).css({
                        'display': 'block'
                    })
                    .siblings().css({
                        'display': 'none'
                    });
                this.addTips(_this);
                this.addControls(_this);
                _self.play('next', _this, _self);
                console.log(_self);
            },
            addTips: function (_this) {
                var alk = '';
                for (var i = 0; i < _this.num; i++) {
                    alk += '<a href="##" class="tips-btn"></a>';

                }
                var addCon = '<div class="tips">' +
                    alk +
                    '</div>';
                _this.append(addCon);
                _this.$tipsBtn = _this.find('.tips').children('.tips-btn');
                _this.$tipsBtn.eq(0).addClass('clicked').siblings().removeClass('clicked');
            },
            addControls(_this) {
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
                _this.append(addCon);
                _this.$btn = _this.find('.controls-block').children('.btn');
                _this.$pauseBlock = _this.find('.pause-block');
                this.addEvents(_this);

            },
            addEventsTouch(_this) {
                var _self = this;
                var stratX, endX;
                _this.on('touchstart', function (e) {
                    stratX = e.originalEvent.changedTouches[0].pageX;
                });
                _this.on('touchend', function (e) {
                    endX = e.originalEvent.changedTouches[0].pageY;
                    if (endX - stratX > 0) {
                        _self.play('prev', _this, _self);
                        return
                    } else if (endX - startX < 0) {
                        _self.play('next', _this, _self);
                        return
                    }
                })
            },
            addEvents(_this) {
                //单击翻页按钮
                var _self = this;
                _this.$btn.on('click', function (e) {
                    e.preventDefault();
                    var $e = $(e.target);
                    if ($e.hasClass('prev')) {
                        _self.play('prev', _this, _self);
                        return
                    } else if ($e.hasClass('next')) {
                        _self.play('next', _this, _self);
                        return
                    }
                });
                //单击小圆点
                _this.$tipsBtn.on('click', function () {
                    var index = $(this).index();
                    _self.play(index, _this, _self);
                });
                _this.$pauseBlock.on('click', 'a', function () {
                    if ($(this).hasClass('pause-btn')) {
                        _self.autoPlay = false;
                        return
                    }
                    if ($(this).hasClass('play-btn')) {
                        _self.autoPlay = true;
                        return
                    }
                });
                //鼠标移入轮播范围内
                _this
                    .hover(function () {
                        _self.clearTime(_this);
                    }, function () {
                        _this.timer = setTimeout(function () {
                            _self.play('next', _this, _self);
                        }, _self.speed);
                    })
            },
            getIndex(words, _this) {
                //判断是否为number
                var idx = _this.idx;
                var num = _this.num;
                if (typeof words === 'number') {
                    return idx = words;
                }
                switch (words) {
                    case 'prev':
                        idx--;
                        idx < 0 ? idx = num : '';
                        break;
                    case 'next':
                        idx++;
                        idx >= num ? idx = 0 : '';
                        break;
                    default:
                        console.log('error');
                }
                return _this.idx = idx;
            },
            play(words, _this, _self) {
                _self.clearTime(_this);
                var idx = _self.getIndex(words, _this);

                _this.$item.eq(idx).css({
                        'display': 'block'
                    })
                    .siblings().css({
                        'display': 'none'
                    });
                _this.$tipsBtn.eq(idx).addClass('clicked')
                    .siblings().removeClass('clicked');
                /*判断是否自动播放 */

                if (!_self.autoPlay === true) {
                    _self.clearTime(_this);
                    return;
                }

                _this.timer = setTimeout(function () {
                    _self.play('next', _this, _self);
                }, _self.speed);
            },
            clearTime(_this) {
                clearTimeout(_this.timer);
                _this.timer = null;
            },
            IsPC() {
                var userAgentInfo = navigator.userAgent;
                var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
                var flag = true;
                for (var v = 0; v < Agents.length; v++) {
                    if (userAgentInfo.indexOf(Agents[v]) > 0) {
                        flag = false;
                        break;
                    }
                }
                return flag;
            }
        }

        
        __PROP__.init(this,ops);

        return this;
    }
})(jQuery);