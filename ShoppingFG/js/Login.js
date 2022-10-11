
//登入驗証功能
function LoginVerify() {
    var loginIdInput = $('#inputIdNo').val();
    var loginPwdInput = $('#inputPwd').val();

    if (!loginIdInput || !loginPwdInput) {
        alert('請輸入帳號密碼');
        //} else if (loginIdInput.length !=10) {
        //    alert('身份証字號輸入長度錯誤');
        //} else if (loginPwdInput.length < 8 && loginPwdInput.length > 20) {
        //    alert('密碼輸入要8-20字元');
    } else {
        $.ajax({
            url: '/ajax/AjaxLogin.aspx?fn=LoginVerify',
            type: 'POST',
            data: { getId: loginIdInput, getPwd: loginPwdInput },
            success: function (data) {
                var jsonResult = (JSON.parse(data));
                memberInfo = jsonResult;
                console.log(jsonResult);
                if (!jsonResult) {
                    alert('資料錯誤');
                } else if (jsonResult.Result == 0) {
                    alert('帳號密碼正確');
                    $('#loginBlock').hide();
                    $('#pageHeadBefore').hide();
                    $('#overlay').hide();
                    $('#lastNameShown').text(jsonResult['LastName']);
                    $('#firstNameShown').text(jsonResult['FirstName']);
                    $('#pageHeadAfter').show();

                } else if (jsonResult.Result == 1) {
                    alert('請輸入帳號密碼');
                } else if (jsonResult.Result == 2) {
                    alert('請輸入帳號密碼');
                } else if (jsonResult.Result == 3) {
                    alert('身份証字號輸入長度錯誤');
                } else if (jsonResult.Result == 4) {
                    alert('密碼輸入長度錯誤');
                }
            },
            error: function (err) {
                str = JSON.stringify(err, null, 2);
                console.log('err:');
                console.log(err);
                alert(str);
            }
        })
    }
}
