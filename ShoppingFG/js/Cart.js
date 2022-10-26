var productInfoInCart;
var total = 0;
var price;


function ReadProductInfoFromDB(myCartItem) {
    console.log('readproductinfofromdb', myCartItem);
    $.ajax({
        url: '/ajax/AjaxProductPage.aspx?fn=SearchProductByIdForCart',
        type: 'POST',
        data: {
            getIdArray: JSON.stringify(myCartItem)
        },
        success: function (data) {
        },
    });
}


//購物車視窗
function PrintAllItem() {
    var cartItem = JSON.parse(localStorage.getItem('cartItem'));
    productInfoInCart = cartItem;
    console.log('cartItem', cartItem);
    $('#productTable').html('');
    var tableRow = '';
    tableRow = '<tr>' +
        '<th>' + '項次' + '</th>' +
        //'<th>' + '商品圖片' + '</th>' +
        '<th>' + '產品標題' + '</th>' +
        '<th>' + '數量' + '</th>' +
        '<th>' + '單價' + '</th>' +
        '<th>' + '小計' + '</th>' +
        '<th>' + '操作' + '</th>' +
        '</tr>';

    for (var i = 0; i < cartItem.length; i++) {
        tableRow +=
            '<tr>' +
            '<td>' + (i+1) + '</td>' +
            '<td class="productTitleInCart">' + cartItem[i].ProductTitle + '</td>' +
            '<td><input type="number" class="itemQtnInCart" id="itemQtnInCart' + i + '" min="1" max="' + cartItem[i].ProductQtn + '" onchange="PriceCal(' + cartItem[i].ProductId + ')" value="' + cartItem[i].QtnForBuy + '" /></td>' +
            '<td class="unitPriceInCart" id="unitPriceInCart' + i + '">' + cartItem[i].ProductUnitPrice + '</td>' +
            '<td id="subTotalInCart' + i + '">' + cartItem[i].SubTotal + '</td>' +
            '<td><img src="/images/trashcan.png" class="trashCanImg" onclick="DeleteProduct(\'' + cartItem[i].ProductId + '\')" /><td>' +
            '</tr>';
        total += cartItem[i].SubTotal;
    }

    $('#productTable').append(tableRow);
    $('#totalInCart').text(total);
    $('#productTable').show();
    $('#pointOwned').html(memberInfo.Points);
}

//計算小計的函式
function PriceCal(id) {


    //total = 0;
    //console.log(`row is ${row}`);
    //var qtn = $('#itemQtnInCart' + row).val();
    //productInfoInCart[row].QtnForBuy = qtn;
    //console.log('qtn', qtn);
    //var unitPrice = $('#unitPriceInCart' + row).html();
    //console.log('unitprice=', unitPrice);
    //price = qtn * unitPrice;
    //$('#subTotalInCart' + row).html(price);
    //for (var i = 0; i < productInfoInCart.length; i++) {
    //    productInfoInCart[i].SubTotal = parseInt($('#subTotalInCart' + i).text());
    //    total += productInfoInCart[i].SubTotal;
    //}
    //console.log('productInforInCart', productInfoInCart);
    //$('#totalInCart').text(total);
    //localStorage.setItem('cartItem', JSON.stringify(productInfoInCart));
    //console.log('cartiteminprice', localStorage.getItem('cartItem'));
}


////計算小計的函式
//function PriceCal(row) {
//    total = 0;
//    console.log(`row is ${row}`);
//    var qtn = $('#itemQtnInCart' + row).val();
//    productInfoInCart[row].QtnForBuy = qtn;
//    console.log('qtn', qtn);
//    var unitPrice = $('#unitPriceInCart' + row).html();
//    console.log('unitprice=', unitPrice);
//    price = qtn * unitPrice;
//    $('#subTotalInCart' + row).html(price);
//    for (var i = 0; i < productInfoInCart.length; i++) {
//        productInfoInCart[i].SubTotal = parseInt( $('#subTotalInCart' + i).text());
//        total += productInfoInCart[i].SubTotal;
//    }
//    console.log('productInforInCart', productInfoInCart);
//    $('#totalInCart').text(total);
//    localStorage.setItem('cartItem', JSON.stringify(productInfoInCart));
//    console.log('cartiteminprice', localStorage.getItem('cartItem'));
//}

//刪除購物車裡的產品項目
function DeleteProduct(productId) {
    console.log(productId);
    var RemainItems = productInfoInCart.filter(function (item) {
        return item.ProductId != productId;
    });
    localStorage.setItem('cartItem', JSON.stringify(RemainItems));

    if (!(localStorage.getItem('cartItem'))) {
        $('#cartMessage').text('購物車尚無產品');
        $('#productList').hide();
        $('#cartBlock').show();
    } else {
        PrintAllItem();
    }
}

//開啟訂單div
function CheckOut() {
    $('#cartBlock').hide();
    $('#orderBlock').show();
    PrintOrder();
}