/*正则 规则 */
var regs = {
    name: /^([\u4e00-\u9fa5\-\w]){4,20}$/, //用户名规则
    pwd: /^\S{6,20}$/, //密码规则
    tel: /^1[3-9]\d{9}$/ //手机号码规则
}
var $reg = $('.reg'),
    $form_item = $reg.find('.form-item'),
    $item_input = $form_item.find('.item-input'),
    $input = $item_input.find('input');
var userName, password, telNumber;

function regexp() {
    $input
        .on('focus', function () { /*input得到焦点 */
            var $this_input = $(this),
                $this_wrap = $this_input.parent('.item-input'),
                $input_tips = $this_input.parents('.form-item').find('.input-tips'),
                $text_block = $input_tips.find('.text-block'),
                $i_status = $this_wrap.find('.i-status');
            tbk_child_length = $text_block.children().length;

            tbk_child_length == 0 ? '' : $text_block.empty(); /*判断提示框是否有元素 */
            $i_status.attr('class', 'i-status');
            var _def = $this_input.data('default'); /*默认提示内容 */
            var addCon = _def ? _def : ''; /*将提示内容赋值给addCon */
            $this_wrap.css({
                'border-color': '#ddd'
            });
            $text_block.append(addCon);
        })
        .on('keyup blur', function () { /*input 按键抬起 和失去焦点 */

            var $this_input = $(this),
                thisName = $(this).attr('id'), //当前input的id
                _text = $this_input.val(),
                $this_wrap = $this_input.parent('.item-input'),
                $input_tips = $this_input.parents('.form-item').find('.input-tips'),
                $text_block = $input_tips.find('.text-block');
            $i_status = $this_wrap.find('.i-status');

            $text_block.empty();
            _text == '' ? textNull() : textIs(); /*判断当前input value是否为空 */

            /*当value为空时 */
            function textNull(con) {
                con == undefined ? function () {
                    $this_wrap.css({
                        'border-color': 'red'
                    });
                    $text_block.empty().append('<i class="img i-err"></i>内容不能为空');
                    $this_input.attr('data-checked', 'false');
                }() : '';
            }

            /*value不为空时 */
            function textIs() {
                var tip_text = '<i class="img i-err"></i>', //提示内容
                    reg, //正则模式
                    t_status=true,
                    result; //返回值 true false
                switch (thisName) {
                    /*用户名 */
                    case 'reg_name':
                        tip_text += '输入有误，仅支持汉字、字母、数字、“-”“_”的组合，且4-20个字符';
                        reg = regs.name;
                        t_status = reg.test(_text);

                        break;

                        /*密码 */
                    case 'reg_pwd':
                        var $againIpt = $('#reg_pwdAgain'); //确认密码的input
                        /*判断确认密码的input data-checked是否为true */
                        $againIpt.attr('data-checked') == 'true' ? function () {
                            /*data-checked为true时 比较密码和确认密码是否相等 */
                            var getPwd = $againIpt.val();
                            getPwd == _text ? t_status = true : function () {
                                t_status = false;
                                tip_text += '输入的密码与下面不匹配，请检查';
                            }();
                        }() : function () {
                            /*data-checked不等于true时 判断密码是否符合规则 */
                            tip_text += '长度只能在6-20个字符之间';
                            reg = regs.pwd;
                            t_status = reg.test(_text);
                        }();
                        break;

                        /*确认密码 */
                    case 'reg_pwdAgain':
                        var $pwdIpt = $('#reg_pwd'); //密码的input
                        /*判断确认密码的input data-checked是否为true */
                        $pwdIpt.attr('data-checked') == 'true' ? function () {
                            /*data-checked为true时 比较密码和确认密码是否相等 */
                            var getPwd = $('#reg_pwd').val();
                            getPwd == _text ? t_status = true : function () {
                                t_status = false;
                                tip_text += '输入的密码与上面不匹配，请检查';
                            }();
                        }() : function () {
                            /*data-checked不等于true时 判断密码是否符合规则 */
                            tip_text += '长度只能在6-20个字符之间';
                            reg = regs.tel;
                            t_status = reg.test(_text);
                        }();
                        break;

                        /*手机号码 */
                    case 'reg_tel':
                        reg = /^1[3-9]\d{9}$/;
                        tip_text += '格式有误';
                        t_status = reg.test(_text);
                        break;
                    case 'reg_code':

                        break;
                    default:
                        break;
                }

                t_status ? function () { //result为true时
                    
                    switch (thisName) {
                        case 'reg_name':
                            requestAjax({
                                el: $text_block,
                                url: '/checkUserName',
                                type: 'post',
                                data: {
                                    username: _text
                                }
                            }, checkUser);

                            function checkUser(res) {
                                if (res == true) {
                                    
                                    tip_text = '<i class="img i-suc"></i>' + '该账号未被注册';
                                    userName = _text;
                                    successS();
                                    $text_block.empty().append(tip_text);
                                } else if (res == false) {

                                    tip_text = '<i class="img i-err"></i>' + '账号已经存在，请重新输入';
                                    errorS();
                                }
                            }
                            break;
                        case 'reg_pwdAgain':
                            successS();
                            password = _text;
                            break;
                        case 'reg_tel':
                             successS();
                            telNumber = _text;
                            break;
                        case 'reg_code':
                            requestAjax({
                                el: $text_block,
                                url: '/checkCaptcha',
                                type: 'post',
                                data: {
                                    str: _text
                                }
                            }, checkCaptcha);

                            function checkCaptcha(res) {
                                if (res == false) {
                                    tip_text = '<i class="img i-err"></i>' + '验证码输入错误';
                                    errorS();
                                }else{
                                    successS();
                                }
                            }
                            break;
                        
                        default:
                            successS();
                            break;

                    }

                }() : errorS() /* result为false */ ;

                function errorS() { //result为false时
                    $this_input.attr('data-checked', 'false');
                    $text_block.empty().append(tip_text);
                    $this_wrap.css({
                        'border-color': 'red'
                    });
                    $i_status.attr('class', 'i-status i-err');
                    $i_status.css({
                        'display': 'block'
                    });
                }

                function successS() {
                    $this_wrap.css({
                        'border-color': 'green'
                    });
                    $this_input.attr('data-checked', 'true');
                    $i_status.attr('class', 'i-status i-suc');
                    $i_status.css({
                        'display': 'block'
                    });
                }

            }


        })

}


$(function () {
    regexp();
    $('#btn_reg').on('click', function (e) {
        e.preventDefault();
        $input.trigger('blur');
        var s=false;
        for (var i = 0; i < $input.length; i++) {
            var ck = $input.eq(i).attr('data-checked');
            if (ck == 'false') {
                return false;
                
            }else{
                console.log(1111);
            }
        }
        $.post('/postReg', {
            reg_name: userName,
            reg_pwd: password,
            reg_tel: telNumber
        }, function (result) {
            var res = JSON.stringify(result);
            document.write(res);
        })
    })
    
    $('.captcha').find('img').on('click', function () {
        var $this = $(this);
        requestAjax({
            el: $this,
            url: '/refreshCaptcha',
            type: 'post'
        }, function (result) {
            $this.attr('src', result);
        });
    });
});