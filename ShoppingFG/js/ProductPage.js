$(document).ready(function () {
    BlockClear();
    var getUrlString = location.href;
    var url = new URL(getUrlString);
    var productId = url.searchParams.get('id');
    ReadProductInfo(productId);
})

var sessionIsNull;
var productInfo;

//從db讀取被選取產品的資料
function ReadProductInfo(productId) {

    $.ajax({
        url: '/ajax/AjaProductPage.aspx?fn=SearchProductByIdAndLoginVerify',
        type: 'POST',
        data: {
            getId: productId,
        },
        success: function (data) {
            if (data) {
                if (data == 0) {
                    $('#productMessage').text('網路錯誤');
                } else if (data == 1) {
                    $('#productMessage').text('id型別錯誤');
                } else if (data == 2) {
                    $('#productMessage').text('無此產品');
                } else {                    
                    var jsonResult = JSON.parse(data);
                    productInfo = jsonResult.ProductInfo[0];
                    sessionIsNull = jsonResult.SessionIsNull;
                    ShowProductInfo(productInfo);
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
    if (sessionIsNull) {
        OpenLoginBlock();
    } else {
        var myCart = localStorage.getItem('cartItem');
        console.log('myCart=', myCart);
        //判斷購物車裡是否已有產品，如果已有產品
        if (myCart) {
            myCart = JSON.parse(myCart);
            var key = false;

            //判斷購物車是否有相同產品
            myCart.forEach(p => {
                if (p.ProductId == productInfo.ProductId) {
                    $('#productMessage').text('此產品已在購物車裡');
                    key = true;
                }
            });

            //購物車裡無此項產品
            if (!key) {
                myCart.push(productInfo);
                localStorage.setItem('cartItem', JSON.stringify(myCart));
                $('#productMessage').text('加入購物車成功');
            }

            //購物車裡無產品
        } else {
            var goods = productInfo;
            var goodArray = [goods];
            localStorage.setItem('cartItem', JSON.stringify(goodArray));
            $('#productMessage').text('加入購物車成功');
        }

        var i;
        console.log("local storage");
        for (i = 0; i < localStorage.length; i++) {

            console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
        }
        console.log(localStorage.length);

        $('#productInfoBlock').html('');
    }
}

