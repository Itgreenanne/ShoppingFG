var globalMember;

//開啟會員帳號設定視窗
function OpenSettingBlock() {
    $('#setting').css('background-color', '#87CEFA');
    $('#setting').css('color', 'white');
    $('#setting').css('font-weight', 'bold');
    $('#memberCenterlogo').hide();
    $('#functionContent').show();
    $('#settingBlock').show();
    $.ajax({
        url: '/ajax/AjaxFrontUser.aspx?fn=GetSearchMemberById',
        type: 'POST',
        data: {
            getMemberId: memberInfo.MemberId
        },
        success: function (data) {
            if (data) {
                var jsonResult = JSON.parse(data);
                if (RepeatedStuff(jsonResult)) {
                    return;
                } else {
                    console.log(jsonResult);
                    //顯示跟選擇列資料一樣的資料
                    globalMember = jsonResult;
                    $('#setInputTel').val(jsonResult.phone);
                    $('#setInputPwd').val('*******************');
                    $('#setLastName').val(jsonResult.lastname);
                    $('#setFirstName').val(jsonResult.firstname);
                    $('#setInputMail').val(jsonResult.mail);
                    $('#setInputAddress').val(jsonResult.address);
                    $('#setInputBirth').val(jsonResult.birth);

                    if (jsonResult.gender == 1) {
                        $("#chkSetMale").prop('checked', true);
                    } else if (jsonResult.gender == 2) {
                        $("#chkSetFemale").prop('checked', true);
                    } else {
                        $("#chkSetOther").prop('checked', true);
                    }

                    $('#MemberLevelNo').text(jsonResult.level);
                    $('#MemberPoints').text(jsonResult.points);
                    $('#settingBlock').show();
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

function SettingConfirm() {
    var tel = $('#setInputTel').val();
    var pwd = globalMember.pwd;
    console.log('pwd=', pwd);
    var lastname = $('#setLastName').val();
    var firstname = $('#setFirstName').val();
    var mail = $('#setInputMail').val();
    var address = $('#setInputAddress').val();
    var birth = $('#setInputBirth').val();
    var gender = '';
    $("input[type=radio]:checked").each(function () {
        gender = $(this).val();
    });
    var level = $('#MemberLevelNo').text();
    var points = $('#MemberPoints').text();
    if (!tel || !lastname || !firstname || !mail ||
        !birth || !gender) {
        alert('有輸入框未填');
    } else if (tel.length != 10) {
        alert('電話號碼輸入長度錯誤');
    } else if (lastname.length > 20) {
        alert('姓輸入超過20字元');
    } else if (firstname.length > 20) {
        alert('名輸入超過20字元');
    } else if (mail.length > 40) {
        alert('email輸入超過40字元');
    } else if (pwd.length < 8 && pwd.length > 20) {
        alert('密碼輸入要8-20字元');
    } else {
        $.ajax({
            url: '/ajax/AjaxFrontUser.aspx?fn=ModifyMember',
            type: 'POST',
            data: {
                getId: memberInfo.MemberId,
                getTel: tel,
                getPwd: pwd,
                getGender: gender,
                getLastName: lastname,
                getFirstname: firstname,
                getBirth: birth,
                getMail: mail,
                getAddress: address,
                getLevel: level,
                getPoints: points
            },
            success: function (data) {
                console.log(data);
                if (data) {
                    var jsonResult = JSON.parse(data);
                    if (RepeatedStuff(jsonResult)) {
                        return;
                    } else {
                        switch (data) {
                            case '0':
                                alert("修改會員資料成功");
                                $('#settingBlock').hide();
                                $('#functionContent').hide();
                                $('#memberCenterlogo').show();
                                $('#lastNameShown').text(lastname);
                                $('#firstNameShown').text(firstname);
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
                            default:
                                alert('資料錯誤');
                        }
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

//登出
function Logout() {
    $.ajax({
        url: '/ajax/AjaxFrontUser.aspx?fn=Logout',
        type: 'POST',       
    });
    window.location.href = '/view/HomePage.aspx';
}

function ModifyPwdBlock() {
    $('#overlay1').show();
    $('#inputOldPwd').val('');
    $('#inputNewPwd').val('');
    $('#newPwdConfirm').val('');
    $('#pwdModify').show();
}

//會員中心中的密碼設定
function SetModifiedPwd() {
    var oldPwd = $('#inputOldPwd').val();
    var newPwd = $('#inputNewPwd').val();
    var newPwdConfirm = $('#newPwdConfirm').val();

    console.log('before globalMemberPwd', globalMember.pwd);

    if (oldPwd == globalMember.pwd && newPwd == newPwdConfirm) {
        alert('修改密碼成功');
        globalMember.pwd = newPwdConfirm;
        $('#pwdModify').hide();
        $('#overlay1').hide();
    } else if (oldPwd != globalMember.pwd) {
        alert('舊密碼輸入錯誤');
        $('#inputOldPwd').val('');
        $('#inputNewPwd').val('');
        $('#newPwdConfirm').val('');
    } else if (newPwd != newPwdConfirm) {
        alert('新密碼輸入不一致');
        //$('#inputOldPwd').val('');
        $('#inputNewPwd').val('');
        $('#newPwdConfirm').val('');
    }
    console.log(oldPwd);
    console.log('after globalMemberPwd', globalMember.pwd);
}

function LeavePwdBlock() {
    $('#pwdModify').hide();
    $('#overlay1').hide();
}

function MemberCenterEmailVerify(el) {
    var inputText = el.value;
    var emailSymbol = '@';
    if (!inputText.includes(emailSymbol)) {
        alert('輸入不符合email格式或空白');
        $('#setInputMail').val(globalMember.mail);
    }
}

function MemberCenterTelVerify(el) {
    var inputText = el.value;
    var rightForm = /^\d{10}$/;
    if (!rightForm.test(inputText)) {
        alert('聯絡電話輸入錯誤或空白');
        $('#setInputTel').val(globalMember.phone);
    }
}

//const button = document.querySelector('.btnMemberGroup');

//button.addEventListener('click', (e) => {
//    const isButton = e.target.nodeName === 'BUTTON';
//    if (!isButton) {
//        return;
//    }
//    e.target.style.background = '#87CEFA';
// });

$('#setting').on('click', function () {
    $('#setting').removeClass('selected');
    $(this).addClass('.btnMemberGroup ');
});