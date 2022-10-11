$(document).ready(function () {
    BlockClear();
    $.ajax({
        url: '/ajax/AjaxHomePage.aspx?fn=GetAllProduct',
        type: 'POST',
        success: function (data) {
            if (data) {
                var jsonResult = JSON.parse(data);
                PrintProductDiv(jsonResult);
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
    });

})

var productInfoGlobal;
var memberInfo;

function BlockClear() {
    $('#overlay').hide();
    $('#loginBlock').hide();
    $('#signUpBlock').hide();
    $('#pageHeadAfter').hide();
    $('#memberCenter').hide();
}

//顯示產品
function PrintProductDiv(jsonResult) {
    $('#productContainer').html('');
    var productTitleShown = jsonResult;
    //將區域變數值傳給全域變數
    productInfoGlobal = jsonResult;
    var productInfo = '';    

    for (var i = 0; i < jsonResult.length; i++) {
        if (productTitleShown[i].ProductTitle.length > 7) {            
            productTitleShown[i].ProductTitle = productTitleShown[i].ProductTitle.slice(0, 6)+'...';
        }
        productInfo +=
            '<div class="productInfo">' +
            '<div><img src="/images/' + jsonResult[i].ProductPic + '" class="productImg"></div>' +
            '<div>' + '產品名稱：' + productTitleShown[i].ProductTitle + '</div>' +
            '<div>' + '單價：' + jsonResult[i].ProductUnitPrice + '</div>' +
            '<div>' + '數量：'+ jsonResult[i].ProductQtn + '</div>' +          
            //'<td> <button onclick="DeleteDuty(\'' + jsonResult[i].dutyId + '\')">' +
            //'刪除' + '</button>' + ' ' +
            //'<button onclick="ModifyDutyReadFront(\'' + jsonResult[i].dutyId + '\')">' + '修改(前)' + '</button>' + ' ' +
            //'<button onclick="ModifyDutyReadBack(\'' + jsonResult[i].dutyId + '\')">' + '修改(後)' + '</button>' + '</td>' +
            '</div>';            
    }

    $('#productContainer').append(productInfo);
    $('#productContainer').show();
}

//開啟登入頁面
function OpenLoginBlock() {
    $('#overlay').show();
    $('#loginBlock').show();
}

//關閉登入div
function LeaveLoginBlock() {
    $('#overlay').hide();
    $('#loginBlock').hide();
}

function OpenSignUpBlock() {
    $('#loginBlock').hide();
    $('#signUpBlock').show();

}


//開啟會員中心視窗
function OpenMemberCenterBlock() {
    $('#overlay').show();
    $('#memberCenter').show();
    $('#functionContent').hide();
}

//離開會員中心視窗
function CancelContent() {
    $('#overlay').hide();
    $('#memberCenter').hide();
}

//離開註冊頁面
function LeaveSingUpBlock() {
    $('#overlay').hide();
    $('#signUpBlock').hide();
}

//開啟會員帳號設定視窗
function OpenSettingBlock() {
    console.log('memberid=', memberInfo.MemberId);
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
                console.log(jsonResult);
                //顯示跟選擇列資料一樣的資料                
                $('#setInputTel').val(jsonResult.phone);
                $('#setInputPwd').val('************************************');
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
    var pwd = $('#setInputPwd').val();
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
    console.log(birth);
    if (!tel || !pwd || !lastname || !firstname || !mail ||
        !address || !birth || !gender) {
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
                    switch (data) {
                        case '0':
                            alert("修改會員資料成功");
                            $('#settingBlock').hide();
                            $('#functionContent').hide();
                            $('#memberCenterlogo').hide();
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


//不能輸入空白鍵
function NoSpaceKey(inputName) {
    var id = '#' + inputName;
    var inputText = $(id).val();
    inputText = inputText.replace(/\s/g, '');
    $(id).val(inputText);
}   