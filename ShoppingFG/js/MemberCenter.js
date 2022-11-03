var globalMember;
var orderData;

//會員中心四個按鍵的增加移除樣式設定
function ClassSet() {
    $('#setting').removeClass('btnMemberGroupPressed').addClass('btnMemberGroup');
    $('#cart').removeClass('btnMemberGroupPressed').addClass('btnMemberGroup');
    $('#myOrder').removeClass('btnMemberGroupPressed').addClass('btnMemberGroup');
}

//開啟會員帳號設定視窗
function OpenSettingBlock() {
    ClassSet();
    ClearMemberCenterAllBlock();
    $('#setting').removeClass('btnMemberGroup').addClass('btnMemberGroupPressed');
    $('#memberCenterlogo').hide();
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

//確定會員中心中的帳號設定
function SettingConfirm() {
    var tel = $('#setInputTel').val();
    var pwd = globalMember.pwd;
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
                if (data) {
                    var jsonResult = JSON.parse(data);
                    if (RepeatedStuff(jsonResult)) {
                        return;
                    } else {
                        switch (data) {
                            case '0':
                                alert("修改會員資料成功");
                                $('#settingBlock').hide();
                                ClassSet();
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

//開啟會員中心中的購物車div
function OpenCartBlock() {
    ClassSet();
    ClearMemberCenterAllBlock();
    $('#cart').removeClass('btnMemberGroup').addClass('btnMemberGroupPressed');
    $('#memberCenterlogo').hide();
    //console.log('cartlength', JSON.parse(localStorage.getItem('cartItem')).length );

    if (sessionBool) {
        localStorage.clear();
        OpenLoginBlock();

    } else if (localStorage.getItem('cartItem') == null || JSON.parse(localStorage.getItem('cartItem')).length == 0) {
        $('#cartMessage').text('尚無產品');
        $('#productList').hide();       
        $('#cartBlock').show();

    } else {
        myCartItem = localStorage.getItem('cartItem');
        $('#cartBlock').show();
        ReadProductInfoFromDB(myCartItem);        
    }
}

//開啟會員中心中的訂單
function OpenMyOrder() {
    ClassSet();
    ClearMemberCenterAllBlock();
    $('#myOrder').removeClass('btnMemberGroup').addClass('btnMemberGroupPressed');
    $('#memberCenterlogo').hide();
    $.ajax({
        url: '/ajax/AjaxFrontUser.aspx?fn=GetOrder',
        type: 'POST',
        data: {
            getMemberId: memberInfo.MemberId
        },
        success: function (data) {

            if (data) {
                var jsonResult = JSON.parse(data);
                console.log('1.訂單資料fromDB', jsonResult);

                if (RepeatedStuff(jsonResult)) {
                    return;
                } else {
                    //var orderDate = jsonResult.InfoList.OrderCreatedTime.getFullYear();
                    //console.log('orderDate', orderDate);
                    //orderData = jsonResult;
                    orderData = jsonResult;
                    $('#myOrderBlock').show();
                    PrintMyOrder();
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
    });
}

//按下會員中心中的登出鍵
function Logout() {
    $.ajax({
        url: '/ajax/AjaxFrontUser.aspx?fn=Logout',
        type: 'POST',
    });
    localStorage.clear();
    window.location.href = '/view/HomePage.aspx';
}

//修改會員密碼
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
}

//關閉修改密碼div
function LeavePwdBlock() {
    $('#pwdModify').hide();
    $('#overlay1').hide();
}

//帳號設定中的email格式驗証
function MemberCenterEmailVerify(el) {
    var inputText = el.value;
    var emailSymbol = '@';
    if (!inputText.includes(emailSymbol)) {
        alert('輸入不符合email格式或空白');
        $('#setInputMail').val(globalMember.mail);
    }
}

//帳號設定中的電話格式驗証
function MemberCenterTelVerify(el) {
    var inputText = el.value;
    var rightForm = /^\d{10}$/;
    if (!rightForm.test(inputText)) {
        alert('聯絡電話輸入錯誤或空白');
        $('#setInputTel').val(globalMember.phone);
    }
}

//列印會員所有訂單
function PrintMyOrder() {
    $('#orderCreatedTable').html('');
    var tableForAll = '';
    var total = 0;
    tableForAll = '<tr>' +
        '<th>' + '項次' + '</th>' +
        '<th>' + '訂單編號' + '</th>' +
        '<th>' + '總額' + '</th>' +
        '<th>' + '建立日期' + '</th>' +
        '<th>' + '細項' + '</th>' +
        '</tr>';

    for (var i = orderData.InfoList.length - 1; i >= 0 ; i--) {        
        tableForAll +=
            '<tr>' +
            '<td>' + (i + 1) + '</td>' +
            '<td class="productTitleInCart">' + orderData.InfoList[i].OrderNo + '</td>' +
            '<td>' + orderData.InfoList[i].OrderTotalPrice + '</td>' +
            '<td>' + orderData.InfoList[i].OrderCreatedTime + '</td>' +
            '<td><button class = "btnShowOrderItem" onclick = "OpenOrderItem(\'' + orderData.InfoList[i].OrderId + '\')">查看</button></td>' +
            '</tr>';
    }

    $('#orderCreatedTable').append(tableForAll);
    $('#orderCreatedTable').show();
    //$('#totalInOrderCreated').text(total);
}

//開啟訂單細項div
function OpenOrderItem(OrderId) {    
    $('#overlay1').show();
    $('#orderItemBlock').show();
    PrintOrderItem(OrderId);
}

//列印訂單細項
function PrintOrderItem(OrderId) {
    $('#orderItemTable').html('');
    var tableRow = '';
    tableRow = '<tr>' +
        '<th>' + '項次' + '</th>' +
        '<th>' + '產品標題' + '</th>' +
        '<th>' + '數量' + '</th>' +
        '<th>' + '單價' + '</th>' +
        '<th>' + '小計' + '</th>' +
        '</tr>';

    total = 0;
    var j = 1;
    for (var i = 0; i < orderData.OrderList.length; i++) {

        if (orderData.OrderList[i].OrderId == OrderId) {
            
            tableRow +=
                '<tr>' +
                '<td>' + j + '</td>' +
                '<td class="productTitleInCart">' + orderData.OrderList[i].ProductTitle + '</td>' +
                '<td>' + orderData.OrderList[i].QtnForBuy + '</td>' +
                '<td class="unitPriceInCart" id="unitPriceInCart' + i + '">' + orderData.OrderList[i].ProductUnitPrice + '</td>' +
                '<td id="subTotalInCart' + i + '">' + orderData.OrderList[i].QtnForBuy * orderData.OrderList[i].ProductUnitPrice + '</td>' +
                '</tr>';
            total += orderData.OrderList[i].QtnForBuy * orderData.OrderList[i].ProductUnitPrice;
            j++;
        }
    }

    $('#orderItemTable').append(tableRow);
    $('#orderItemTable').show();
    $('#totalInOrderItem').text(total);
}

//關掉訂單細項div
function CloseOrderItem() {
    $('#overlay1').hide();
    $('#orderItemBlock').hide();
}

//const button = $('.btnMemberGroup');

//button.addEventListener('click', (e) => {
//    const isButton = e.target.nodeName === 'BUTTON';
//    if (!isButton) {
//        return;
//    }
//    e.target.style.background = '#87CEFA';
// });

//$(this).on('click', function() {
// /*   $('.btnMemberBox button').removeClass('btnMemberGroupPressed').addClass('btnMemberGroup');  */ 
//    $(this).addClass('btnMemberGroupPressed');
//});

//$('#cart').on('click', function () {
//    $('#setting').removeClass('.btnMemberGroup');
//    $('#myOrder').removeClass('.btnMemberGroup');
//    $('#logout').removeClass('.btnMemberGroup');
//    $(this).addClass('.btnMemberGroupPressed');
//});

//$('#myOrder').on('click', function () {
//    $('#cart').removeClass('.btnMemberGroup');
//    $('#setting').removeClass('.btnMemberGroup');
//    $('#logout').removeClass('.btnMemberGroup');
//    $(this).addClass('.btnMemberGroupPressed');
//});

//$('#logout').on('click', function () {
//    $('#cart').removeClass('.btnMemberGroup');
//    $('#myOrder').removeClass('.btnMemberGroup');
//    $('#setting').removeClass('.btnMemberGroup');
//    $(this).addClass('.btnMemberGroupPressed');
//});