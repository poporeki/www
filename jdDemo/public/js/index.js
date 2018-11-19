$(function () {
    loadLeftMenu();
    loadGoodsListDatas()
    loadFindDatas();
    carousel();
    serviceTab();
    countDown();
    controlMenu();
    dropdown();
    $('.news-tab').tabs3({
        headPanel: '.tab-head',
        contentPanel: '.tab-content',
        contentItem: '.news-list',
        side: false
    });
    $(window).on('scroll', function () {
        var _wH = $(window).scrollTop();
        var $sBox = $('#search');
        var _sH = $('.banner-block').outerHeight() + $('.banner-block').offset().top;
        if (_wH > _sH) {
            $sBox.addClass('search-fixed');
        } else {
            $sBox.removeClass('search-fixed');
        }
    });

    

});

//下拉
function dropdown() {
    var $ele = $('.dropdown');
    $ele.hover(function () {
        var func; 
        var $layer = $(".dropdown-layer", this);
        $layer.show();
        /* 查找是否有函数需要执行 */
        var f=$(this).attr('data-func');
        f?func=eval(f):'';
        func ? func($layer) : '';
    }, function () {
        var $layer = $(".dropdown-layer", this);
        $layer.hide();
    });
}


/* 载入城市列表 */
function loadCityDatas(ele) {
    $lr = $(ele);
    if($lr.find('.dd-item').length!=0) return;
    requestAjax({
        el: $lr,
        type: 'get',
        url: '/data/cw-data.json'
    }, func);

    function func(datas) {
        $lr.empty();
        if (!datas) return;
        $.each(datas.data_content, function (key, val) {
            //console.log(val.c_name);
            var addHtmls = '<div class="dd-item">' +
                '<a href="##" class="cn" data-cid=' + val.city_num + '>' + val.city_name + '</a>' +
                '</div>';
            $lr.append(addHtmls);
        });
    }
}

function loadLeftMenu() {
    $lm = $(".left-menu");
    $listEle = $lm.find(".menu-content");
    requestAjax({
        el: $listEle,
        type: 'get',
        url: '/data/menu-list-data.json'
    }, func);

    function func(datas) {
        $sm = $lm.find(".menu-content-extends");
        if (datas.data_name != "left-menu") return;
        //遍历返回数据
        $.each(datas.data_content, function (i, listDatas) {
            createMenuList(listDatas);
            createListItemContent(listDatas);
        });
        /* 菜单列表 */
        function createMenuList(vals) {
            var addHtmls = '<li class="menu-items" data-index=' + vals.menu_num + '></li>';
            $lm.find(".menu-content").append(addHtmls);
            //console.log(val.menu_num+'+'+this);
            $.each(vals.menu_content, function (key, val) {
                //console.log(val.name);
                if (key < vals.menu_content.length - 1) {
                    $lm.find(".menu-items:last").append('<a href="' + val.href + '" class="a-item">' + val.name + '</a><span class="menu-line">/</span>');
                } else {
                    $lm.find(".menu-items:last").append('<a href="' + val.href + '" class="a-item">' + val.name + '</a>');
                }
            });
        }
        //二级菜单内容
        function createListItemContent(items) {
            if (!items.second_menu_content) return;
            $.each(items.second_menu_content, function (key, item) {
                var addC = '<div id="item' + items.menu_num + '" class="item-wrap clearfix">' +
                    '<div class="details-cols-left">' +
                    '<div class="d-head"></div>' +
                    '<div class="details-items"></div>' +
                    '</div>' +
                    '<div class="details-cols-right">' +
                    '<div class="brand-img-up clearfix"></div>' +
                    '<div class="promotion-img"></div>' +
                    '</div>' +
                    '</div>';
                $sm.append(addC);
                if (!(item.d_head_lk || item.d_body_items_lk || item.d_img_lk)) return;

                $.each(item.d_head_lk, function (key, lk) {
                    var addHtmls = '<a href="' + lk.href + '" class="details-lk">' + lk.name +
                        ' <i class="fa fa-angle-right details-lk-arrow"></i>' +
                        '</a>';
                    $sm.find(".details-cols-left:last").find(".d-head").append(addHtmls);
                });

                var $di = $(".details-items:last");
                $.each(item.d_body_items_lk, function (key, lk) {
                    var addHtmls = '<dl class="detail-item-dl">' +
                        '<dt class="tit"></dt>' +
                        '<dd class="con"></dd>' +
                        '</dl>';
                    $di.append(addHtmls);
                    if (lk.details_tit) {
                        $.each(lk.details_tit, function (key, dtl) {
                            var addC = '<a href="' + dtl.href + '">' + dtl.name +
                                '<i class="fa fa-angle-right details-lk-arrow"></i>' +
                                '</a>';
                            $di.find(".detail-item-dl:last").find(".tit").append(addC);
                        });
                    }
                    if (lk.details_items) {
                        $.each(lk.details_items, function (key, dis) {
                            var addC = '<a href="' + dis.href + '">' + dis.name + '</a>';
                            $di.find(".detail-item-dl:last").find(".con").append(addC);
                        });
                    }
                });

                var $dcr = $(".details-cols-right:last");
                $.each(item.d_img_lk, function (key, lk) {
                    if (lk.brand_lk) {
                        $.each(lk.brand_lk, function (key, blk) {
                            var addC = '<a href="' + blk.href + '" class="brand-lk">' +
                                '<img src="' + blk.img_src + '">' +
                                '</a>';
                            $dcr.find(".brand-img-up:last").append(addC);
                        });
                    }
                    if (lk.promotion_lk) {
                        $.each(lk.promotion_lk, function (key, plk) {
                            var addC = '<a href="' + plk.href + '" class="promotion-lk">' +
                                '<img src="' + plk.img_src + '">' +
                                '</a>';
                            $dcr.find(".promotion-img:last").append(addC);
                        });
                    }
                });
            });

        }
    }
}


function controlMenu() {
    var $lm = $(".left-menu");
    var idx = reidx = 0;
    var $mce,
        $iw;
    /* 监听一级菜单鼠标移入移出 */
    $lm.on('mouseenter', '.menu-items', function () {
            $(this).addClass("hover").siblings().removeClass("hover");
            idx = $(this).index();
            $mce = $lm.find(".menu-content-extends");
            $iw = $mce.find(".item-wrap");
            $iw.eq(idx).addClass("not-enter");
            $iw.eq(idx).addClass('show')
                .siblings().removeClass('show');

        })
        .on('mouseleave', '.menu-items', function () {
            reidx = idx;
            var _this = this;
            setTimeout(function () {
                if ($iw.eq(reidx).hasClass('not-enter')) {
                    $(_this).removeClass("hover");
                    $iw.eq(reidx).removeClass('show not-enter');
                }
            }, 1);
        });
    /* 监听二级菜单鼠标移入移出 */
    $lm.on('mouseenter', '.item-wrap', function () {
            idx = $(this).index();
            $(this).removeClass('not-enter');
            $(this).addClass('show').siblings().removeClass('show');
        })
        .on('mouseleave', '.item-wrap', function () {
            var $list=$lm.find('.menu-items');
            $list.removeClass('hover');
            $(this).removeClass('show');
        });
}

function carousel() {
    var $cb = $(".carousel-block");
    var $cbImg = $cb.find(">img");
    var _arrImgcon = [];
    var addc = '<ul class="ul-wrap"></ul>' +
        '<div class="car-tips-wrap"></div>' +
        '<div class="car-arrow">' +
        '<a href="javascript:;" id="left-arr">' +
        '<i class="fa fa-angle-left"></i>' +
        '</a>' +
        '<a href="javascript:;" id="right-arr">' +
        '<i class="fa fa-angle-right"></i>' +
        '</a>' +
        '</div>';
    $cb.append(addc);
    $.each($cbImg, function (key, val) {
        _arrImgcon.push(val);
    });
    $cbImg.remove();
    var $wrap = $(".ul-wrap");
    var $tips = $(".car-tips-wrap");
    var $ca = $(".car-arrow");
    for (var i = 0; i < _arrImgcon.length; i++) {
        var addc = '<li>' +
            '<a href="' + $(_arrImgcon[i]).attr("src") + '">' +
            '<img data-original="' + $(_arrImgcon[i]).attr("src") + '" alt="' + $(_arrImgcon[i]).attr("alt") + '">' +
            '</a>' +
            '</li>';
        var addc2 = '<i class="car-tips"></i>';
        $wrap.append(addc);
        $tips.append(addc2);
        /* if(i==_arrImgcon.length-1){
            $(".carousel-block").find("img").lazyload({
                effect: "fadeIn",
                placeholder: "/images/index/loading.gif"
            });
        } */
    }
    var $li = $wrap.find('li'),
        $t = $tips.find('i'),
        _tipwrapWId = $tips.outerWidth();

            $(".carousel-block").find("img").lazyload({
                effect: "fadeIn"
            });
    /*重定位 */
    $tips.css({
        'margin-left': -_tipwrapWId / 2
    });
    $t.eq($t.length - 1).css({
        'margin-right': 0
    });
    var idx = 0,
        reidx = idx,
        _speed = 500,
        _timSpd = 2000,
        aniTime = '';
    animate(_timSpd);

    /*banner运动 */
    function animate(_s) {
        /*判断动画是否在执行中  如果是 则返回 */
        if ($li.is(":animated")) return
        idx == $li.length ? idx = 0 : 'console.log("animate!=")';
        /*当前页淡入，其它页淡出  时间_speed */
        $li.eq(idx).fadeIn(_speed)
            .siblings().fadeOut(_speed);
        $t.eq(idx).addClass('tips-active')
            .siblings().removeClass('tips-active');
        /*页数+1 */
        idx++;
        /*创建定时器 */
        aniTime = setInterval(function () {
            animate(_s);
        }, _s);

    }
    /* 鼠标移入页码时停止滚动，移出重新开始*/
    $tips.hover(function () {
        clearInterval(aniTime);
    }, function () {
        animate(_timSpd);
    });
    /*鼠标移入箭头时停止滚动，移出重新开始 */
    $ca.find("a").hover(function () {
        clearInterval(aniTime);
    }, function () {
        animate(_timSpd);
    });
    /*单击页码 */
    $t.hover(function () {
        var thisidx = $(this).index(),
            $t_s = $t.eq(thisidx),
            $l_s = $li.eq(thisidx);
        $t_s.addClass('tips-active')
            .siblings().removeClass('tips-active');
        if ($li.is(":animated")) return
        $l_s.fadeIn(_speed)
            .siblings().fadeOut(_speed);
    });
    /*单击前一页或后一页 */
    $ca.find("a").on('click', function () {
        var _tarId = $(this).attr('id');
        switch (_tarId) {
            case 'left-arr':
                idx == 0 ? idx = $li.length : '';
                idx--;
                $li.eq(idx).fadeIn(_speed).siblings().fadeOut(_speed);
                $t.eq(idx).addClass('tips-active').siblings().removeClass('tips-active');
                break;
            case 'right-arr':
                idx == $li.length ? idx = 0 : '';
                idx++;
                $li.eq(idx).fadeIn(_speed).siblings().fadeOut(_speed);
                $t.eq(idx).addClass('tips-active').siblings().removeClass('tips-active');
                break;
            default:
                console.log($(this));
        }
    });
    
}



function serviceTab() {
    var $service = $('.service'),
        $sEntry = $service.find('.service-entry'),
        $sContent = $service.find(".service-content"),
        $closeBtn = $service.find('#close_btn'),
        $sList = $sEntry.find('.service-list'),
        $sTHItem = $sList.find('.tab-head-item'),
        $sTCItem = $sContent.find('.tab-content-item'),
        $sLk = $sTHItem.find('.service-lk');


    $sTHItem.on('mouseenter', function () {
        var $this = $(this),
            _idx = $(this).index(),
            $txt = $this.find('.service-txt'),
            $sibTxt = $this.siblings().find('.service-txt');

        $this.addClass('extends')
            .siblings().removeClass('extends');
        $txt.css({
            'border-top': '2px solid #e01121'
        });
        $sibTxt.css({
            'border-top': '2px solid #fff'
        });
        $sLk.css({
            'transform': 'translate3d(0,-38px,0)'
        });
        $sContent.css({
            'top': '24px'
        });
        $sTCItem.eq(_idx).css({
            'display': 'block'
        }).siblings('div').css({
            'display': 'none'
        });


    });

    $closeBtn.on('click', function () {
        for (var i = 0; i < $sTHItem.length; i++) {
            if ($sTHItem.eq(i).hasClass('extends')) {
                var $target = $sTHItem.eq(i);
                $target.removeClass('extends');
                var $txt = $target.find('.service-txt');
                $txt.css({
                    'border-top': '2px solid #fff'
                });
                $sLk.css({
                    'transform': 'translate3d(0,0,0)'
                });
                $sContent.css({
                    'top': '210px'
                });
                var addLayer = '<div class="service-item-layer"></div>';
                $sTHItem.parent().append(addLayer);
                var $sitem_layer = $sList.find('.service-item-layer');

                $sitem_layer.on('mouseleave', function () {
                    $(this).remove();
                });
            }
        }

    });

}


/***********秒杀倒计时***** */
function countDown() {
    /* 获取显示时间的元素 */
    var $hour_text = $('.cd-hour').find('.cd-item-text'),
        $minute_text = $('.cd-minute').find('.cd-item-text'),
        $second_text = $('.cd-second').find('.cd-item-text');
    /*目标时间 */
    time_target = new Date('2018/6/10 00:00:00').getTime();
    /* 执行函数 */
    timer(time_target, $hour_text, $minute_text, $second_text);
}

/**
 * 倒计时
 * h，m，s为需要填充数值的jquery对象
 * 
 */
function timer(t_target, h, m, s) {
    /*获取系统时间 毫秒 */
    var time_now = new Date().getTime();
    /*目标时间和系统时间差值 */
    var _time = t_target - time_now;
    /*获取天数 取整*/
    var _day = Math.floor(_time / 86400000);
    /*减去时间 */
    _time -= _day * 86400000;
    /*获得小时数 取整  */
    var _hour = Math.floor(_time / 3600000);
    _time -= _hour * 3600000;
    /*取整 获得分钟数 */
    var _minute = Math.floor(_time / 60000);
    _time -= _minute * 60000;
    /*获得秒数 取整 */
    var _second = Math.floor(_time / 1000);
    
    var resultDates = {
        _day:_day,
        _hour:_hour,
        _minute:_minute,
        _second:_second
    };
    /*如果小于10 则前面加0 */
    for (var i in resultDates) {
        if (resultDates[i] < 10) {
            resultDates[i]="0"+resultDates[i];
        }
    }
    _hour=resultDates['_hour'];
    _minute=resultDates['_minute'];
    _second=resultDates['_second'];
    /* 赋值 */
    _hour ? $(h).text(_hour) : '';
    _minute ? $(m).text(_minute) : '';
    _second ? $(s).text(_second) : '';
    /* 每1s执行一次*/
    setTimeout(function () {
        timer(t_target, h, m, s);
    }, 1000);
}


/****************************** */
function loadGoodsListDatas() {
    var $gList = $('.goods-list');
    requestAjax({
        el: $gList,
        url: '/data/secKill.json',
        type: 'get',
    }, func);

    function func(datas) {
        if (datas.txt_name != 'seckillgoods-data' || !datas.data) return
        $.each(datas.data, function (key, data) {
            createGoodsList(data);
            if(key==datas.data.length-1){
                $gList.find("img").lazyload({
                    effect: "fadeIn",
                    container: $gList,
                    placeholder: "/images/index/loading.gif"
                });
                $('.goods-list-wrap').myCarousel({
                    controls: '.goods-controls'
                });
            }
        });

        function createGoodsList(dt) {
            var addCon = '<li class="goods-item carousel-list">' +
                '<div class="goods-item-pic">' +
                '<a href="' + dt.goods_href + '" class="lk">' +
                '<img data-original="' + dt.goods_img_src + '" class="item-img">' +
                '<p class="item-name">' +
                dt.goods_name +
                '</p>' +
                '</a>' +
                '<span class="item-shadow"></span>' +
                '</div>' +
                '<p class="goods-item-price">' +
                '<span class="item-price-new">' +
                '<i>￥</i>' +
                '<span>' + dt.goods_price_new + '</span>' +
                '</span>' +
                '<span class="item-price-origin">' +
                '<i>￥</i>' +
                '<del>' + dt.goods_price_origin + '</del>' +
                '</span>' +
                '</p>' +
                '</li>';

            $gList.append(addCon);
        }
    }
}

function loadFindDatas() {
    var $fbt = $('.fbt'),
        $bd = $fbt.find('.box-bd');
    requestAjax({
        el: $bd,
        type: 'get',
        url: '/data/fbt.json'
    }, func);

    function func(datas) {
        if (!datas && datas.data_name == 'fbt' && datas.data_content) return;
        $.each(datas.data_content, function (key, data) {
            if (!data.content) return;

            function appendFind(c_data) {
                var $ul = $bd.find('.find-list');
                $.each(c_data.content, function (key, d) {
                    var addCon = '<li class="find-item">' +
                        '<a href="' + d.item_href + '" class="find-item-lk">' +
                        '<p class="find-item-name">' + d.item_name + '</p>' +
                        '<img data-original="' + d.item_img_src + '" title="' + d.item_text + '" class="find-item-img" alt="' + d.item_text + '"/>' +
                        '</a>' +
                        '</li>';
                    $ul.append(addCon);
                });
                $ul.find("img").lazyload({
                    effect: "fadeIn",
                    container: $ul,
                    placeholder: "/images/index/loading.gif"
                });
            }
            function appendSup(c_data){
                var $e = $('.' + c_data.c_name).find('.box-bd');
                    $.each(c_data.content, function (key, d) {
                        var addImg = '';
                        var addImg2 = '';
                        for (i in d.item_img_src) {
                            if (i > 2) {
                                addImg2 += '<img data-original="' + d.item_img_src[i] + '" class="sup-img"/>';
                                continue;
                            }
                            addImg += '<img data-original="' + d.item_img_src[i] + '" class="sup-img"/>';
                        }
                        var addCon = '<div class="sup-page">' +
                            '<a href="' + d.item_href[0] + '" class="sup-page-lk">' +
                            '<p class="sup-desc">' + d.item_tit[0] + '</p>' +
                            addImg +
                            '</a>' +
                            '<div class="sup-line"></div>' +
                            '<a href="' + d.item_href[1] + '" class="sup-page-lk">' +
                            '<p class="sup-desc">' + d.item_tit[1] + '</p>' +
                            addImg2 +
                            '</a>' +
                            '</div>';
                        $e.append(addCon);

                    });
                    supControls($e);
                    $e.find("img").lazyload({
                        effect: "fadeIn",
                        container: $e,
                        placeholder: "/images/index/loading.gif"
                    });
            }        
            function appendTop(c_data){
                var $e = $('.' + c_data.c_name);
                    var tit = '',
                        img_src = '';
                    $.each(c_data.content, function (key, d) {
                        for (i in d.item_tit) {
                            tit += '<a href="javascript:;" class="tab-head-item">' + d.item_tit[i] + '</a>';
                        }
                        for (i in d.item_img_src) {
                            img_src += '<div class="tab-content-item"><img data-original=" ' + d.item_img_src[i] + '"></div>';
                        }
                    })
                    var addCon = '<div class="top-tab-head">' +
                        tit +
                        '</div>' +
                        '<div class="top-tab-content">' +
                        img_src +
                        '</div>'
                    $e.find('.box-bd').append(addCon);
                    $('.box-bd', $e).tabs3({
                        headPanel: '.top-tab-head',
                        contentPanel: '.top-tab-content',
                        side: true
                    });
                    $e.find("img").lazyload({
                        effect: "fadeIn"
                    });
            }
            switch (data.c_name) {
                case 'find':
                        appendFind(data);
                    break;
                case 'sup':
                        appendSup(data);
                    break;
                case 'top':
                        appendTop(data);
            }
            
        });
    }
}

var supControls = function ($box) {
    var $box = $box,
        $page = $box.find('.sup-page'),
        $btn, $tips, $li;
    var _init = {
        index: 0,
        reindex: 0,
        timer: null,
        speed: 1000,
        autoPlay: false,
        time: 5000,
        tips: true
    }
    var init = function () {
        $page.eq(0)
            .css({
                'opacity': '1'
            })
            .siblings('.sup-page')
            .css({
                'opacity': '0'
            });
        var addControls = '<a href="javascript:;" class="btn prev">' + '<i class="fa fa-angle-left"></i></a>' +
                            '<a href="javascript:;" class="btn next"><i class="fa fa-angle-right"></i></a>';
        $box.append(addControls);
        $btn = $box.find('.btn'),
            _init.tips ? addTips() : '';

        thishover($box);
        thisclick($box);

        $li.eq(_init.index)
            .addClass('active')
            .siblings()
            .removeClass('active');

    }
    var thisclick = function (box) {
        $btn.on('click', function () {
            if ($(this).hasClass('prev')) {
                _init.index--;
            }
            if ($(this).hasClass('next')) {
                _init.index++;
            }
            play();
        });
    }
    var thishover = function (page) {
        $box.hover(function (e) {
            clearTimeout(_init.timer);
            $btn.css({
                'display': 'block'
            });
        }, function (e) {
            _init.autoPlay ? play() : '';
            $btn.css({
                'display': 'none'
            });
        });

    }
    var addTips = function () {
        var add = '';
        for (var i = 0; i < $page.length; i++) {
            add += '<li></li>';
        }
        var addCon = '<ul class="tips">' +
            add +
            '</ul>';
        $box.append(addCon);
        $tips = $box.find('.tips');
        $li = $tips.find('li');
        $li.hover(function (e) {
            if (e.target)
                $(e.target).addClass('active')
                .siblings().removeClass('active');
            _init.index = $(this).index();
            play();
        }, function () {

        });
    }
    var play = function () {
        var
            idx = _init.index,
            reidx = _init.reindex,
            speed = _init.speed;


        if (idx > $page.length - 1) {
            _init.index = 0;
        }
        if (idx < 0) {
            _init.index = $page.length - 1;
        }
        $page.eq(_init.index)
            .css({
                'opacity': '1'
            })
            .siblings('.sup-page')
            .css({
                'opacity': '0'
            });
        $li.eq(_init.index)
            .addClass('active')
            .siblings('li')
            .removeClass('active');
        if (!_init.autoPlay) return;

        _init.timer = setTimeout(function () {
            play();
        }, _init.time);
    }
    init();
}