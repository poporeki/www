/* ajax再封装 添加loading动画 
    options：配置
    func：success时候的执行函数
    callback：返回错误
*/
function requestAjax(options, func, callback) {
    /* 添加删除等待动画 */
    function fn(options, func, callback) {
        this.options = options;
        this.func = func;
        this.callback = callback;
        this.el = this.options.el;
        this.aniEle = this.options.aniEle || 'loading-ani';
        /* 发起ajax请求 */

        this.xhr(this);
    }
    fn.prototype.ajaxLoadingAnimate = {
        self:this,
        start: function (_this) {
            this.remove(_this);
            var addCon = '<div class=' + _this.aniEle + '></div>';
            _this.el.append(addCon);
        },
        remove: function (_this) {
            var $target = _this.el.find('.loading-ani');
            $target.length != 0 ? $target.remove() : '';
        }
    }
    fn.prototype.xhr = function (_this) {
        $.ajax({
            type: this.options.type || post,
            url: this.options.url,
            timeout: this.options.timeout || 30000,
            data: this.options.data,
            async: this.options.async || true,
            beforeSend: function () {
                _this.ajaxLoadingAnimate.start(_this);
            },
            error: _this.callback,
            complete: function (XMLHttpRequest, status) {
                if (status == 'timeout') {
                    _this.xhr.abort(); // 超时后中断请求
                    _this.ajaxLoadingAnimate.remove(_this);
                    _this.el.empty().append('链接超时');
                    return;
                }
                _this.ajaxLoadingAnimate.remove(_this);
            },
            success: _this.func
        });
    }
    return new fn(options, func, callback);


    // var aniEle = options.aniEle || 'loading-ani';
    // var ajaxLoadingAnimate = {
    //     start: function ($ele) {
    //         this.remove($ele);
    //         var addCon = '<div class=' + aniEle + '></div>';
    //         $ele.append(addCon);
    //     },
    //     remove: function ($ele) {
    //         var $target = $ele.find('.loading-ani');
    //         $target.length != 0 ? $target.remove() : '';
    //     }
    // }
    // /* 动画目标 */
    // var $el = options.el;
    // /* 发起ajax请求 */
    // var xhr = $.ajax({
    //     type: options.type || post,
    //     url: options.url,
    //     timeout: options.timeout || 30000,
    //     data: options.data,
    //     async: options.async || true,
    //     beforeSend: function () {
    //         ajaxLoadingAnimate.start($el);
    //     },
    //     error: callback,
    //     complete: function (XMLHttpRequest, status) {
    //         if (status == 'timeout') {
    //             xhr.abort(); // 超时后中断请求
    //             ajaxLoadingAnimate.remove($el);
    //             $el.empty().append('链接超时');
    //             return;
    //         }
    //         ajaxLoadingAnimate.remove($el);
    //     },
    //     success: func
    // });
}