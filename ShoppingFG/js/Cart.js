var productInfoInCart;
var productInfoFromDB
var total = 0;
var price;


function ReadProductInfoFromDB(myCartItem) {
    ItemafterParse = JSON.parse(myCartItem);
    console.log('readproductinfofromdb', ItemafterParse);
    var abc = ItemafterParse.map(function (x) {
        return x.id;
    });
    console.log(abc);
    //var key = 'qtn';
    
    //delete ItemafterParse[key];
    console.log('afterdelete', ItemafterParse);
    

    $.ajax({
        url: '/ajax/AjaxProductPage.aspx?fn=SearchProductByIdForCart',
        type: 'POST',
        data: {
            getIdArray: JSON.stringify(abc)
        },
        success: function (data) {
            if (data) {
                var jsonResult = JSON.parse(data);
                console.log('datafromDB', jsonResult);
                //購買數量 QtnForBuy，預設值為1
                jsonResult.map(function (jsonResult) {
                    addKeyValue(jsonResult, 'QtnForBuy', 1);                    
                });
                jsonResult.map(function (jsonResult) {
                    return addKeyValue(jsonResult, 'SubTotal', jsonResult.ProductUnitPrice);
                });      
                productInfoFromDB = jsonResult;
                console.log('afteraddkey', productInfoFromDB);
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


//購物車視窗
function PrintAllItem() {
    var cartItem = JSON.parse(localStorage.getItem('cartItem'));
    productInfoInCart = cartItem;
    console.log('cartItem', cartItem);
    $('#productTable').html('');
    var tableRow = '';
    tableRow = '<tr>' +
        '<th>' + '項次' + '</th>' +
        '<th>' + '產品標題' + '</th>' +
        '<th>' + '數量' + '</th>' +
        '<th>' + '單價' + '</th>' +
        '<th>' + '小計' + '</th>' +
        '<th>' + '操作' + '</th>' +
        '</tr>';

    for (var i = 0; i < productInfoFromDB.length; i++) {
        tableRow +=
            '<tr>' +
            '<td>' + (i+1) + '</td>' +
            '<td class="productTitleInCart">' + productInfoFromDB[i].ProductTitle + '</td>' +
            '<td><input type="number" class="itemQtnInCart" id="itemQtnInCart' + i + '" min="1" max="' + productInfoFromDB[i].ProductQtn + '" onchange="PriceCal(' + productInfoFromDB[i].ProductId + ', ' + productInfoFromDB[i].ProductQtn+ '+ '+ i +' )" value="' + productInfoFromDB[i].QtnForBuy + '" /></td>' +
            '<td class="unitPriceInCart" id="unitPriceInCart' + i + '">' + productInfoFromDB[i].ProductUnitPrice + '</td>' +
            '<td id="subTotalInCart' + i + '">' + productInfoFromDB[i].SubTotal + '</td>' +
            '<td><img src="/images/trashcan.png" class="trashCanImg" onclick="DeleteProduct(\'' + productInfoFromDB[i].ProductId + '\')" /><td>' +
            '</tr>';
        total += productInfoFromDB[i].SubTotal;
    }

    $('#productTable').append(tableRow);
    $('#totalInCart').text(total);
    $('#productTable').show();
    $('#pointOwned').html(memberInfo.Points);
}

//計算小計的函式
function PriceCal(id, maxQtn, row) {
    //total = 0;  
    var qtn = $('#itemQtnInCart' + row).val();
    if (qtn > 0 && qtn <= maxQtn) {
        productInfoFromDB.find(function (x) { return x.ProductId === +id }).QtnForBuy = qtn;
        console.log('qtn', qtn);
        var unitPrice = productInfoFromDB.find(function (x) { return x.ProductId === +id }).ProductUnitPrice;
        console.log('unitprice=', unitPrice);
        price = qtn * unitPrice;
        $('#subTotalInCart' + row).html(price);
        for (var i = 0; i < productInfoFromDB.length; i++) {
            productInfoFromDB[i].SubTotal = parseInt($('#subTotalInCart' + i).text());
            total += productInfoFromDB[i].SubTotal;
        }
        console.log('productInforInCart', productInfoFromDB);
        $('#totalInCart').text(total);
        localStorage.setItem('cartItem', JSON.stringify(productInfoFromDB));
        console.log('cartiteminprice', localStorage.getItem('cartItem'));
    } else {
        $('#itemQtnInCart' + row).val(1);
    }
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
        $('#cartMessage').text('尚無產品');
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