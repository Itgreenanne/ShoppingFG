$(document).ready(function () {
    BlockClear();
    var getUrlString = location.href;
    var url = new URL(getUrlString);
    var productId = url.searchParams.get('id');
    ReadProductInfo(productId);
})

var sessionBool;
var productInfo;


//從db讀取被選取產品的資料
function ReadProductInfo(productId) {

    $.ajax({
        url: '/ajax/AjaxProductPage.aspx?fn=SearchProductByIdAndLoginVerify',
        type: 'POST',
        data: {
            getId: productId,
        },
        success: function (data) {
            if (data) {
                var jsonResult = JSON.parse(data);
                productInfo = jsonResult.ProductInfo[0];
                productInfo['QtnForBuy'] = '1';
                productInfo['SubTotal'] = productInfo.ProductUnitPrice;
                sessionBool = jsonResult.SessionIsNull;
                memberInfo = jsonResult.UserInfo;
                ShowProductInfo(productInfo);
                if (data == 0) {
                    $('#MessageInProductPage').text('網路錯誤');
                } else if (data == 1) {
                    $('#MessageInProductPage').text('id型別錯誤');
                } else if (data == 2) {
                    $('#MessageInProductPage').text('無此產品');
                } else if (jsonResult['SessionIsNull'] == true) {
                    $('#lastNameShown').text('');
                    $('#firstNameShown').text('');
                } else if (jsonResult['SessionIsNull'] == false) {
                    $('#lastNameShown').text(jsonResult.UserInfo.LastName);
                    $('#firstNameShown').text(jsonResult.UserInfo.FirstName);                    
                } else {
                    alert('資料錯誤');
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
}

//把從db讀到的產品資料顯示在產品div
function ShowProductInfo() {
    $('#productImgDiv').html('');
    var img = $('<img class="productImgInProductPage" id="productImgInProductPage">');
    img.attr('src', '/images/' + productInfo.ProductPic+'');
    img.appendTo('#productImgDiv');
    $('#productTitleInProductPage').html('標題' + '<div class="titleContent">' + productInfo.ProductTitle + '</div>');
    $('#productPriceInProductPage').html('<img src="/images/unitPrice.png" class="unitPricePic" /><div class="unitPriceNo">' + productInfo.ProductUnitPrice + '</div>');
    $('#productQtnInProductPage').html('<img src="/images/Qtn1.png" class="qtnPic" /><div class="qtnNo">' + productInfo.ProductQtn + '</div>');
    $('#productDetailInProductPage').html('詳情' + '<div class="detailContent">' + productInfo.ProductDetail + '</div>');
}

//將產品加到購物車
function AddToCart() {
    if (sessionBool) {
        OpenLoginBlock();
    } else {
        var myCart = localStorage.getItem('cartItem');
        myCart = JSON.parse(myCart);
        console.log('myCart=', myCart);
        //判斷購物車裡是否已有產品，如果已有產品        
        if (myCart) {
            if (myCart.length < 5) {
                var key = false;

                //判斷購物車是否有相同產品
                myCart.forEach(p => {
                    if (p.ProductId == productInfo.ProductId) {
                        $('#messageBoxInProductPage').show();
                        $('#MessageInProductPage').text('此產品已在購物車裡');
                        key = true;
                    }
                });

                //購物車裡無此項產品
                if (!key) {
                    myCart.push(productInfo.ProductId);
                    localStorage.setItem('cartItem', JSON.stringify(myCart));
                    $('#messageBoxInProductPage').show();
                    $('#MessageInProductPage').text('加入購物車成功');
                }
            } else {
                $('#messageBoxInProductPage').show();
                $('#MessageInProductPage').text('購物車已滿');
            }

            //購物車裡無產品
        } else {
            var goods = productInfo.ProductId;
            var goodArray = [goods];
            localStorage.setItem('cartItem', JSON.stringify(goodArray));
            $('#messageBoxInProductPage').show();
            $('#MessageInProductPage').text('加入購物車成功');
        }

        //console.log('mycartlength', myCart.length);
        var i;
        console.log('local storage');
        for (i = 0; i < localStorage.length; i++) {

            console.log(localStorage.key(i) + '=[' + localStorage.getItem(localStorage.key(i)) + ']');
        }
        console.log(localStorage.length);
        $('#productInfoBlock').hide();
    }
}

////將產品加到購物車
//function AddToCart() {
//    if (sessionBool) {
//        OpenLoginBlock();
//    } else {
//        var myCart = localStorage.getItem('cartItem');
//        myCart = JSON.parse(myCart);
//        console.log('myCart=', myCart);
//        //判斷購物車裡是否已有產品，如果已有產品        
//        if (myCart) {
//            if (myCart.length < 5) {
//                var key = false;

//                //判斷購物車是否有相同產品
//                myCart.forEach(p => {
//                    if (p.ProductId == productInfo.ProductId) {
//                        $('#messageBoxInProductPage').show();
//                        $('#MessageInProductPage').text('此產品已在購物車裡');
//                        key = true;
//                    }
//                });

//                //購物車裡無此項產品
//                if (!key) {
//                    myCart.push(productInfo);
//                    localStorage.setItem('cartItem', JSON.stringify(myCart));
//                    $('#messageBoxInProductPage').show();
//                    $('#MessageInProductPage').text('加入購物車成功');
//                }
//            } else {
//                $('#messageBoxInProductPage').show();
//                $('#MessageInProductPage').text('購物車已滿');
//            }

//            //購物車裡無產品
//        } else {
//            var goods = productInfo;
//            var goodArray = [goods];
//            localStorage.setItem('cartItem', JSON.stringify(goodArray));
//            $('#messageBoxInProductPage').show();
//            $('#MessageInProductPage').text('加入購物車成功');
//        }

//        //console.log('mycartlength', myCart.length);
//        var i;
//        console.log('local storage');
//        for (i = 0; i < localStorage.length; i++) {

//            console.log(localStorage.key(i) + '=[' + localStorage.getItem(localStorage.key(i)) + ']');
//        }
//        console.log(localStorage.length);
//        $('#productInfoBlock').hide();
//    }
//}

//產品頁中的回上頁
function BackToProductPage() {
    $('#messageBoxInProductPage').hide();
    $('#productInfoBlock').show();

}