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
                    result=true; //返回值 true false
                switch (thisName) {
                    /*用户名 */
                    case 'reg_name':
                        tip_text += '输入有误，仅支持汉字、字母、数字、“-”“_”的组合，且4-20个字符';
                        reg = regs.name;
                        result = reg.test(_text);

                        break;

                        /*密码 */
                    case 'reg_pwd':
                        var $againIpt = $('#reg_pwdAgain'); //确认密码的input
                        /*判断确认密码的input data-checked是否为true */
                        $againIpt.attr('data-checked') == 'true' ? function () {
                            /*data-checked为true时 比较密码和确认密码是否相等 */
                            var getPwd = $againIpt.val();
                            getPwd == _text ? result = true : function () {
                                result = false;
                                tip_text += '输入的密码与下面不匹配，请检查';
                            }();
                        }() : function () {
                            /*data-checked不等于true时 判断密码是否符合规则 */
                            tip_text += '长度只能在6-20个字符之间';
                            reg = regs.pwd;
                            result = reg.test(_text);
                        }();
                        break;

                        /*确认密码 */
                    case 'reg_pwdAgain':
                        var $pwdIpt = $('#reg_pwd'); //密码的input
                        /*判断确认密码的input data-checked是否为true */
                        $pwdIpt.attr('data-checked') == 'true' ? function () {
                            /*data-checked为true时 比较密码和确认密码是否相等 */
                            var getPwd = $('#reg_pwd').val();
                            getPwd == _text ? result = true : function () {
                                result = false;
                                tip_text += '输入的密码与上面不匹配，请检查';
                            }();
                        }() : function () {
                            /*data-checked不等于true时 判断密码是否符合规则 */
                            tip_text += '长度只能在6-20个字符之间';
                            reg = regs.tel;
                            result = reg.test(_text);
                        }();
                        break;

                        /*手机号码 */
                    case 'reg_tel':
                        reg = /^1[3-9]\d{9}$/;
                        tip_text += '格式有误';
                        result = reg.test(_text);
                        break;
                    default:
                        break;
                }

                result ? function () { //result为true时
                    $this_wrap.css({
                        'border-color': 'green'
                    });
                    $this_input.attr('data-checked', 'true');
                    $i_status.attr('class', 'i-status i-suc');
                    $i_status.css({
                        'display': 'block'
                    });
                    switch (thisName) {
                        case 'reg_name':
                            $.post('/ajax', {
                                username: _text
                            }, function (result) {
                                if (result.status == true) {
                                    tip_text = '<i class="img i-suc"></i>' + '该账号未被注册';
                                    userName = _text;
                                    $text_block.empty().append(tip_text);
                                } else if (result.status == false) {
                                    tip_text = '<i class="img i-err"></i>' + '账号已经存在，请重新输入';
                                    errorS();
                                }
                            })
                            break;
                        case 'reg_pwdAgain':
                            password = _text;
                            break;
                        case 'reg_tel':
                            telNumber = _text;
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

            }


        })

}


$(function () {
    regexp();
    $('#btn_reg').on('click', function (e) {
        e.preventDefault();
        $input.trigger('focus');
        for (var i = 0; i < $input.length; i++) {
            var ck = $input.eq(i).data('checked');
            if (ck == false) {
                return false;
            }
        }
        $.post('/postReg', {
            reg_name: userName,
            reg_pwd:password,
            reg_tel:telNumber
        },function(result){
            var res=JSON.stringify(result);
            document.write(res);
        })
    })
    $('.login-submit-btn').on('click',function(){
        var username=$('.account-login').find('input[name="username"]').val();
        var password=$('.account-login').find('input[name="pwd"]').val();
        $.post('/login',{uname:username,pwd:password},function(result){
            if(result==false){
                alert("输入的账号或密码错误，请重新输入");
            }else{
                window.location.href="/";
            }
        })
    })
});