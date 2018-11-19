$(function(){
    $('.login-submit-btn').on('click', function () {
        var username = $('.account-login').find('input[name="username"]').val();
        var password = $('.account-login').find('input[name="pwd"]').val();
        $.post('/login', {
            uname: username,
            pwd: password
        }, function (result) {
            if (result == false) {
                alert("输入的账号或密码错误，请重新输入");
            } else {
                window.location.href = "/";
            }
        })
    });
});