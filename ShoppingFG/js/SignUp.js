﻿//註冊功能
function SignUp() {
    var idNo = $('#signUpIdNo').val();
    var tel = $('#signUpInputTel').val();
    var pwd = $('#signUpInputPwd').val();
    var gender = '';
    $("input[type=radio]:checked").each(function () {
        gender = $(this).val();
    });
    var lastName = $('#signUpLastName').val();
    var firstName = $('#signUpFirstName').val();
    var birth = $('#signUpInputBirth').val();
    var mail = $('#signUpInputMail').val();
    var address = $('#signUpInputAddress').val();

    if (!idNo || !tel || !pwd || !gender || !lastName ||
        !firstName || !birth || !mail || !address) {
        alert('有輸入框未填');
    } else if (idNo.length != 10) {
        alert('身份証字號輸入長度錯誤');
    } else if (idNo) {

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
            url: '/ajax/AjaxFrontUser.aspx?fn=AddMember',
            type: 'POST',
            data: {
                getidNo: idNo,
                getTel: tel,
                getPwd: pwd,
                getGender: gender,
                getLastName: lastName,
                getFirstname: firstName,
                getBirth: birth,
                getMail: mail,
                getAddress: address
            },
            success: function (data) {
                console.log(data);
                if (data) {
                    switch (data) {
                        case '0':
                            alert("新增人員成功");
                            $('#signUpBlock').hide();
                            $('#loginBlock').show();
                            break;
                        case '1':
                            alert('已有此人員帳號');
                            break;
                        case '3':
                            alert('身份証字號輸入長度錯誤');
                            break;
                        case '4':
                            alert('電話號碼輸入長度錯誤');
                            break;
                        case '5':
                            alert('密碼長度不對');
                            break;
                        case '9':
                            alert('姓太長');
                            break;
                        case '10':
                            alert('名太長');
                            break;
                        case '11':
                            alert('email長度太長');
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
