//註冊功能
function SignUp() {
    var idNo = $('#signUpIdNo').val();
    var tel = $('#signUpInputTel').val();
    var pwd = $('#signUpInputPwd').val();
    var pwdConfirm = $('#pwdConfirm').val();
    var gender = '';
    $("input[type=radio]:checked").each(function () {
        gender = $(this).val();
    });
    var lastName = $('#signUpLastName').val();
    var firstName = $('#signUpFirstName').val();
    var birth = $('#signUpInputBirth').val();
    var mail = $('#signUpInputMail').val();
    var address = $('#signUpInputAddress').val();

    if (!idNo || !tel || !pwd || !pwdConfirm || !gender || !lastName ||
        !firstName || !birth || !mail) {
        alert('有輸入框未填');
    } else if (idNo.length != 10) {
        alert('身份証字號輸入長度錯誤');
    } else if (tel.length != 10) {
        alert('電話號碼輸入長度錯誤');
    } else if (lastName.length > 20) {
        alert('姓輸入超過20字元');
    } else if (firstName.length > 20) {
        alert('名輸入超過20字元');
    } else if (mail.length > 40) {
        alert('email輸入超過40字元');
    } else if (pwd.length < 8 && pwd.length > 20) {
        alert('密碼輸入要8-20字元');
    } else {
        $.ajax({
            url: '/ajax/AjaxLogin.aspx?fn=AddMember',
            type: 'POST',
            data: {
                getidNo: idNo,
                getTel: tel,
                getPwd: pwd,
                getGender: Number(gender),
                getLastName: lastName,
                getFirstname: firstName,
                getBirth: birth,
                getMail: mail,
                getAddress: address
            },
            success: function (data) {
                if (data) {
                    switch (data) {
                        case '11':
                            alert('會員資料新增成功');
                            $('#signUpBlock').hide();
                            $('#overlay').hide();
                            break;
                        case '3':
                            alert('身份証字號輸入錯誤');
                        case '6':
                            alert('電話號碼輸入長度錯誤');
                            break;
                        case '4':
                            alert('密碼長度不對');
                            break;
                        case '7':
                            alert('姓太長');
                            break;
                        case '8':
                            alert('名太長');
                            break;
                        case '9':
                            alert('email長度太長');
                        case '10':
                            alert('此身份証字號已被註冊');
                        default:
                            alert('資料錯誤');
                    }
                } else {
                    alert('資料錯誤');
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

//身份証字號驗証函式
function IdNoVerify(el) {
    if (el && el.value) {
        var inputText = el.value.toUpperCase();
        el.value = inputText;
        var rightForm = /^[A-Z]{1}\d{9}$/;

        if (!rightForm.test(inputText)) {
            alert('身份証字號輸入錯誤');
            el.value = '';
        }
    }
}
//電話是否都是數字並且等於10字元的驗証函式
function TelVerify(el) {
    var inputText = el.value;
    var rightForm = /^\d{10}$/;
    if (!rightForm.test(inputText)) {
        alert('聯絡電話輸入錯誤或空白');
        el.value = '';
    }
}

//密碼是否是英文數字混合長度8-20字元的驗証函式
function PwdVerify(el) {
    var inputText = el.value;
    var rightForm = /^(?=.{8,20}$)(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)*$/;
    if (!rightForm.test(inputText)) {
        alert('密碼輸入必需英文數字混合且字元長度為8-20');
        el.value = '';
    }
}


function PwdConfirmVerify(el) {
    var inputText = el.value;
    var rightForm = $('#signUpInputPwd').val();
    if (inputText != rightForm) {
        alert('密碼輸入不一致');
        el.value = '';
    }
}

function EmailVerify(el) {
    var inputText = el.value;
    var emailSymbol = '@';
    if (!inputText.includes(emailSymbol)) {
        alert('輸入不符合email格式或空白');
        el.value = '';
    }
}
