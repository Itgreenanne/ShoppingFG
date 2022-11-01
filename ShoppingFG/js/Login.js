
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

                if (!jsonResult) {
                    alert('資料錯誤');
                } else if (jsonResult.Result == 1) {
                    alert('帳號密碼正確');
                    //清除之前購物車資料
                    localStorage.clear();
                    window.location.href = "/view/HomePage.aspx";
                } else if (jsonResult.Result == 2) {
                    alert('請輸入帳號密碼');
                } else {
                    alert("帳號或密碼錯誤");
                    $('#inputIdNo').val('');
                    $('#inputPwd').val('');
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
