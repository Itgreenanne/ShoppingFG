var sessionBool = true;
var productInfoGlobal;
var memberInfo;

window.onerror = (msg, url, row, col) => {
    var a = document.createElement('a');
    a.href = url;
    var filename = a.pathname;
    var localTime = new Date();
    console.log(platform.os);
    var device = platform.os.family + platform.os.version;
    console.log(device);
    
    $.ajax({
        url: '/ajax/AjaxHomePage.aspx?fn=WriteFrontErrorLog',
        type: 'POST',
        data: {
            getMsg: msg,
            getFilename: filename,
            getRow: row,
            getCol: col,
            getTime: localTime,
            getBrowserName: platform.name,
            getDevice: device
        },
    });
};

//window.addEventListener('error', (e) => {
//    WriteLog();
//    console.log(e);
//}, true);

////將錯誤訊息寫到後端日誌裡
//function WriteLog(e) {
    
// 
//}

//讀取所有產品資訊並列印在產品div
function GetAllProduct() {
    $.ajax({
        url: '/ajax/AjaxHomePage.aspx?fn=LoginVerifyAndGetAllProduct',
        type: 'POST',
        success: function (data) {
            if (data) {
                var jsonResult = JSON.parse(data);
                productInfoGlobal = jsonResult;
                sessionBool = jsonResult['SessionIsNull'];
                memberInfo = jsonResult.UserInfo;
                PrintProductDiv(jsonResult.ProductInfo);

                if (jsonResult['SessionIsNull'] == true) {
                    $('#lastNameShown').text('');
                    $('#firstNameShown').text('');
                } else {
                    $('#lastNameShown').text(jsonResult.UserInfo.LastName);
                    $('#firstNameShown').text(jsonResult.UserInfo.FirstName);
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

//在product的物件資料中加入new key 
function addKeyValue(obj, key, data) {
    obj[key] = data;
}

//用關鍵字模糊搜尋標題裡有同樣字的產品
function SortProduct() {
    $('#productMessage').text('');
    var keyWord = $('#searchBar').val();
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

                    var jsonResult = JSON.parse(data);
                    if (RepeatedStuff(jsonResult)) {
                        return;
                    } else if (jsonResult == 1) {
                        alert('空字串');
                    } else if (jsonResult == 2) {
                        alert('標題輸入超過100字元');
                    } else if (jsonResult == 9) {                        
                        $('#productMessage').text('無此產品，請重新搜尋');
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

setInterval(StatusVerify, 3000);

//讀取DB資料比較密碼是否被改變，是的話就強制會員登出
function StatusVerify() {
    if (!sessionBool) {
        $.ajax({
            url: '/ajax/AjaDbDataChangVerify.aspx',
            type: 'POST',
            success: function (data) {
                if (data) {
                    var jsonResult = JSON.parse(data);
                    memberInfo = jsonResult;

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
    //清空所有會員中心裡的視窗
    ClearMemberCenterAllBlock();
    $('#messageBoxInProductPage').hide();
}

 //清空所有會員中心裡的視窗
function ClearMemberCenterAllBlock() {
    $('#settingBlock').hide();
    $('#cartBlock').hide();
    $('#myOrderBlock').hide();
    $('#orderItemBlock').hide();
    $('#orderPriviewBlock').hide();
    $('#orderNotCreated').hide();
    $('#orderCreated').hide();
    $('#messageWhyCantAddOrderTable').html('');
}

//顯示產品
function PrintProductDiv(jsonResult) {
    $('#productContainer').html('');
    var productTitleShown = jsonResult;
    var productInfo = '';    

    for (var i = 0; i < jsonResult.length; i++) {

        productInfo +=
            '<div class="productInfo">' +
            '<div><img src="/images/' + jsonResult[i].ProductPic + '" class="productImg" id = "productImg" onclick = " window.location.href = \'/view/ProductPage.aspx?id=' + jsonResult[i].ProductId + '\'" target = "_self" /></div > ' +
            '<div class="productTitle">' + '標題：' + productTitleShown[i].ProductTitle + '</div>' +
            '<div class="priceStyle">' + '$' + jsonResult[i].ProductUnitPrice + '</div>' +
            '<div><img src="/images/Qtn1.png" class="qtnImg">' + jsonResult[i].ProductQtn + '</div >' +
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
    $('#loginBlock').show();        
}

//關閉登入div
function LeaveLoginBlock() {
    BlockClear();
    $('.no-scroll').css('overflow', 'auto');
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
    $('#memberCenterlogo').show();
    $('#pwdModify').hide();
    $('#orderPriviewBlock').hide();
    $('#orderNotCreated').hide();
    $('#orderCreated').hide();
    ClassSet();
}

//關閉帳號設定視窗
function CancelContent() {
    ClassSet();
    $('#memberCenterlogo').show();
    ClearMemberCenterAllBlock()
    ResetAll();
}

//關閉會員中心視窗
function LeaveMemberCenter() {
    //$('#memberCenter').hide();
    //ClearMemberCenterAllBlock();
    //$('#overlay').hide();
    //$('.no-scroll').css('overflow', 'auto');
    //ResetAll()
    window.location.href = '/view/HomePage.aspx';
}

//離開註冊頁面
function LeaveSignUpBlock() {
    ResetAll();
    $('#overlay').show();    
    $('#signUpBlock').hide();
    $('#loginBlock').show();
    $('.no-scroll').css('overflow', 'auto');
}

//彈跳出我的購物車div
function OpenCart() {
    if (sessionBool) {
        OpenLoginBlock();
    } else {
        $('#overlay1').hide();
        $('#orderPriviewBlock').hide();
        OpenMemberCenterBlock();
        OpenCartBlock();
    }
}

//離開我的購物車div
function LeaveCartBlock() {
    //if (localStorage.length != 0) {
    //    localStorage.setItem('cartItem', JSON.stringify(productInfoInCart));
    //}
    $('#overlay').hide();
    $('#cartBlock').hide();
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

//$('#productImg').click(function (event) {
//    window.location.href = '/view/ProductPage.aspx';
//})

//var productImgForEvent = $('#productImg');

//productImgForEvent.addEventListener('click', (e) => {
//    window.location.href = '/view/ProductPage.aspx';
// })