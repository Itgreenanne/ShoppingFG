$(document).ready(function () {
    BlockClear();
    $.ajax({
        url: '/ajax/AjaxHomePage.aspx?fn=LoginVerifyAndGetAllProduct',
        type: 'POST',
        success: function (data) {
            if (data) {
                var jsonResult = JSON.parse(data);
                console.log(jsonResult);
                sessionBool = jsonResult['SessionIsNull'];
                memberInfo = jsonResult.UserInfo;
                if (jsonResult['SessionIsNull'] == true) {
                    $('#lastNameShown').text('');
                    $('#firstNameShown').text('');
                    PrintProductDiv(jsonResult.ProductInfo);
                } else {
                    console.log('HP data=', jsonResult);
                    $('#lastNameShown').text((jsonResult.UserInfo.LastName).slice(0, 3) + '..');
                    $('#firstNameShown').text((jsonResult.UserInfo.FirstName).slice(0, 3) + '..');
                    PrintProductDiv(jsonResult.ProductInfo);
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

})

//重覆的東西
function RepeatedStuff(data) {
    if (data && data['result'] == 0 || data && data['result'] == 1) {
        alert('即將被登出');
        window.location.href = "/view/HomePage.aspx";
        return true;
    }
    return false;
}

//window.addEventListener("orientationchange", toOrientation);

//function toOrientation() {
    
//    if (window.orientation == 90 || window.orientation == -90) {       
//        $('#memberCenter').style.height = '650px';
//    } 
//}

var sessionBool;
var productInfoGlobal;
var memberInfo;

function BlockClear() {
    $('#overlay').hide();
    $('#overlay1').hide();
    $('#loginBlock').hide();
    $('#signUpBlock').hide();
    $('#pageHeadAfter').hide();
    $('#memberCenter').hide();
    $('#pwdModify').hide();
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
            productTitleShown[i].ProductTitle = productTitleShown[i].ProductTitle.slice(0, 8)+'...';
        }
        productInfo +=
            '<div class="productInfo">' +
            '<div><img src="/images/' + jsonResult[i].ProductPic + '" class="productImg"></div>' +
            '<div>' + '標題：' + productTitleShown[i].ProductTitle + '</div>' +
            '<div>' + '$' + jsonResult[i].ProductUnitPrice + '</div>' +
            '<div>' + '件：'+ jsonResult[i].ProductQtn + '</div>' +          
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
    ResetAll();
    $('.no-scroll').css('overflow', 'hidden');
    $('#loginBlock').show()
        
}

//關閉登入div
function LeaveLoginBlock() {
    $('#overlay').hide();
    $('.no-scroll').css('overflow', 'auto');
    $('#loginBlock').hide();
}

//開啟註冊頁面
function OpenSignUpBlock() {
    $('#loginBlock').hide();
    $('.no-scroll').css('overflow', 'hidden');
    $('#signUpBlock').show();
}

//開啟會員中心視窗
function OpenMemberCenterBlock() {
    $('#overlay').show();
    $('.no-scroll').css('overflow', 'hidden');
    $('#memberCenter').show();
    $('#functionContent').hide();
    $('#pwdModify').hide();
}

//離開會員中心視窗
function CancelContent() {    
    $('#functionContent').hide();
    $('#memberCenterlogo').show();
    ResetAll();
}

function LeaveMemberCenter() {
    $('#memberCenter').hide();
    $('#overlay').hide();
    $('.no-scroll').css('overflow', 'auto');
    ResetAll()
}

//離開註冊頁面
function LeaveSignUpBlock() {
    ResetAll();
    $('#overlay').show();    
    $('#signUpBlock').hide();
    $('#loginBlock').show();
    $('.no-scroll').css('overflow', 'auto');
}


//不能輸入空白鍵
function NoSpaceKey(inputName) {
    var id = '#' + inputName;
    var inputText = $(id).val();
    inputText = inputText.replace(/\s/g, '');
    $(id).val(inputText);
}

//清除所有輸入框
function ResetAll() {
    $("input[type='text']").val('');
    $("input[type='password']").val('');
    $('input[type=radio]').prop('checked', 0);
    $("input[type='date']").val('');
    $('textarea').val('');
}

//判斷點擊會員圖示是會開啟登入視窗還是會員中心,false就開啟login視窗，true就開啟會員中心視窗
function LoginOrSignUp() {
    if (sessionBool) {
        OpenLoginBlock();
    } else {
        OpenMemberCenterBlock();
    }
}


$('#productInfo').click(function (event) {
    window.location.href = '/view/ProductPage.aspx';

})