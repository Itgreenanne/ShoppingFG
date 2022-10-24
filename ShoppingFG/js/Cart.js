//var unitPrice = 0;
var productInfoInCart;

//購物車視窗
function PrintAllItem() {
    var cartItem = JSON.parse(localStorage.getItem('cartItem'));
    productInfoInCart = cartItem;
    console.log('cartItem', cartItem);
    $('#productTable').html('');
    //將區域變數值傳給全域變數
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
    var i = 1;
    var price = 0;
    var total = 0;
    cartItem.forEach(p => {
        tableRow +=
            '<tr>' +
            '<td>' + i + '</td>' +
            //'<td><img src="/images/' + p.ProductPic + '" class="productPicInCart" width="20%"></td>' +
            '<td class="productTitleInCart">' + p.ProductTitle + '</td>' +
        '<td><input type="number" class="itemQtnInCart" id="itemQtnInCart" min="1" max="' + p.ProductQtn + '" onblur="PriceCal()" value="1" /></td>' +
            '<td class="unitPriceInCart" id="unitPriceInCart">' + p.ProductUnitPrice + '</td>' +
            '<td id="subTotalInCart">' + p.ProductUnitPrice + '</td>' +
            '<td><img src="/images/trashcan.png" class="trashCanImg" onclick="DeleteProduct(\'' + p.ProductId + '\')" /><td>' +
            '</tr>';
        i++;
        console.log('qtn', $('#itemQtnInCart').val());
        console.log('UP', p.ProductUnitPrice);
        price = $('#itemQtnInCart').val() * p.ProductUnitPrice;
        console.log('price', price);
        total += price;
    });

    $('#productTable').append(tableRow);
    $('#productTable').show();
    $('#totalInCart').text(total);
}

//這個小計的函式有問題bug
function PriceCal() {
    var qtn = $('#itemQtnInCart').val();
    console.log('qtn', qtn);
    var unitPrice = $('#unitPriceInCart').html();
    console.log('unitprice=', unitPrice);
    price = qtn * unitPrice;
    $('#subTotalInCart').html(price);
}

//刪除購物車裡的產品項目
function DeleteProduct(productId) {
    console.log(productId);
    var RemainItems = productInfoInCart.filter(function (item) {
        return item.ProductId != productId;
    });
    localStorage.setItem('cartItem', JSON.stringify(RemainItems));
    PrintAllItem();
}


//開啟訂單div
function CheckOut() {
    $('#cartAtHomePage').hide();
    $('#orderBlock').show();
    PrintOrder();
}