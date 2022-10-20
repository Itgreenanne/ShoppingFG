$(document).ready(function () {
    BlockClear();
    GetAllProduct();

})

//讀取所有產品資訊並列印在產品div
function GetAllProduct() {
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
                    $('#lastNameShown').text(jsonResult.UserInfo.LastName);
                    $('#firstNameShown').text(jsonResult.UserInfo.FirstName);
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
}

//用關鍵字模糊搜尋標題裡有同樣字的產品
function SortProduct() {
    var keyWord = $('#searchBar').val();
    console.log("keyWord=", keyWord);
    if (!keyWord) {
        GetAllProduct();
    } else if (keyWord.length > 100) {
        alert('標題輸入超過100字元');
    } else {
        $.ajax({
            url: '/ajax/AjaxHomePage.aspx?fn=GetSearchProduct',
            type: 'POST',
            data: {
                getProductTitle: keyWord,
            },
            success: function (data) {
                if (data) {
                    console.log(data);
                    var jsonResult = JSON.parse(data);
                    if (RepeatedStuff(jsonResult)) {
                        return;
                    } else if (jsonResult == 1) {
                        alert('空字串');
                    } else if (jsonResult == 2) {
                        alert('標題輸入超過100字元');
                    } else if (jsonResult == 9) {                        
                        $('#noProductMessage').text('無此產品，請重新搜尋');
                        $('#productContainer').html('');
                    } else {
                        PrintProductDiv(jsonResult);
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

var sessionBool;
var productInfoGlobal;
var memberInfo;

setInterval('StatusVerify()', 3000);

//讀取DB資玖比較密碼是否被改變，是的話就強制會員登出
function StatusVerify() {
    if (!sessionBool) {
        $.ajax({
            url: '/ajax/AjaDbDataChangVerify.aspx',
            type: 'POST',
            success: function (data) {
                if (data) {
                    var jsonResult = JSON.parse(data);
                    console.log(jsonResult);
                    if (RepeatedStuff(jsonResult)) {
                        return;
                    }
                }
            },
            error: function (err) {
                str = JSON.stringify(err, null, 2);
                console.log('err:');
                console.log(err);
                alert(str);
            }
        });
    } else { return; }
   /* else {        */
    //    $('#lastNameShown').text('');
    //    $('#firstNameShown').text('');
    //}
}

//根據父頁的回傳訊息強制會員登出
function RepeatedStuff(data) {
    //用來判斷是否已經進入下面被登出的條件式
    var count = 0;
    if (count == 0) {
        if (data && data['result'] == 0 || data && data['result'] == 1) {
            alert('即將被登出');
            window.location.href = "/view/HomePage.aspx";
            count++;
            return true;
        }
    }
    return false;
}

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
        productInfo +=
            '<div class="productInfo">' +
            '<div><img src="/images/' + jsonResult[i].ProductPic + '" class="productImg"></div>' +
            '<div class="productTitle">' + '標題：' + productTitleShown[i].ProductTitle + '</div>' +
            '<div class="priceStyle">' + '$' + jsonResult[i].ProductUnitPrice + '</div>' +
            '<div><img src="/images/Qtn1.png" class="qtnImg">' + jsonResult[i].ProductQtn + '</div >'+          
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
    $('#memberCenterlogo').show();
    $('#memberCenter').show();
    $('#functionContent').hide();
    $('#pwdModify').hide();
}

//關閉帳號設定視窗
function CancelContent() {    
    $('#functionContent').hide();
    $('#memberCenterlogo').show();
    ResetAll();
}

//關閉會員中心視客
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