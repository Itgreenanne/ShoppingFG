//var productInfoInCart;
var productInfoFromDB
var total = 0;
var price;

//購物車視窗
function PrintAllItem() {
    $('#productTable').html('');
    var cartItem = JSON.parse(localStorage.getItem('cartItem'));
    var tableRow = '';
    if (cartItem.length != 0) {
        tableRow = '<tr>' +
            '<th>' + '項次' + '</th>' +
            '<th>' + '產品標題' + '</th>' +
            '<th>' + '數量' + '</th>' +
            '<th>' + '單價' + '</th>' +
            '<th>' + '小計' + '</th>' +
            '<th>' + '操作' + '</th>' +
            '</tr>';

        total = 0;

        for (var i = 0; i < cartItem.length; i++) {
            var qtn = cartItem[i].QtnForBuy;
            productInfoFromDB[i].QtnForBuy = qtn;
            tableRow +=
                '<tr>' +
                '<td>' + (i + 1) + '</td>' +
                '<td class="productTitleInCart">' + productInfoFromDB[i].ProductTitle + '</td>' +
                '<td><input type="text" class="itemQtnInCart" id="itemQtnInCart' + i + '" onchange="PriceCal(' + productInfoFromDB[i].ProductId + ', ' + productInfoFromDB[i].ProductQtn + ', ' + i + ' )" value="' + qtn + '" /></td>' +
                '<td class="unitPriceInCart" id="unitPriceInCart' + i + '">' + productInfoFromDB[i].ProductUnitPrice + '</td>' +
                '<td id="subTotalInCart' + i + '">' + productInfoFromDB[i].ProductUnitPrice * qtn + '</td>' +
                '<td><img src="/images/trashcan.png" class="trashCanImg" onclick="DeleteProduct(\'' + productInfoFromDB[i].ProductId + '\')" /><td>' +
                '</tr>';
            total += productInfoFromDB[i].ProductUnitPrice * qtn;
        }

        $('#productTable').append(tableRow);
        $('#totalInCart').text(total);
        $('#productTable').show();
        $('#pointOwned').html(memberInfo.Points);
    } else {
        $('#cartMessage').text('尚無產品');
        $('#productList').hide();       
    }
}

//計算小計的函式
function PriceCal(id, maxQtn, row) {
    total = 0;  
    var qtn = $('#itemQtnInCart' + row).val();
    if (qtn > 0 && qtn <= maxQtn) {
        //productInfoFromDB.find(function (x) { return x.ProductId === +id }).QtnForBuy = qtn;
        //var unitPrice = productInfoFromDB.find(function (x) { return x.ProductId === +id }).ProductUnitPrice;
        //console.log('unitprice=', unitPrice);
        //price = qtn * unitPrice;
        var price = 0;
        for (var i = 0; i < productInfoFromDB.length; i++) {
            productInfoFromDB[i].QtnForBuy = $('#itemQtnInCart' + i).val();
            price = productInfoFromDB[i].QtnForBuy * productInfoFromDB[i].ProductUnitPrice;
            $('#subTotalInCart' + i).html(price);
            total += price;
        }

        $('#totalInCart').text(total);
        //var ItemForSave = {};
        var ItemForSaveArray = [];
        //for (var i = 0; i < productInfoFromDB.length; i++) {

        //    ItemForSave[i].ProductId = productInfoFromDB[i].ProductId;
        //    ItemForSave[i].QtnForBuy = productInfoFromDB[i].QtnForBuy;
        //    ItemForSaveArray = [ItemForSave[i]];
        //}

        for (var i = 0; i < productInfoFromDB.length; i++) {
            var ItemForSave = {};
            ItemForSave['ProductId'] = productInfoFromDB[i].ProductId;
            ItemForSave['QtnForBuy'] = productInfoFromDB[i].QtnForBuy;
            ItemForSaveArray.push(ItemForSave);
        }
      
        localStorage.setItem('cartItem', JSON.stringify(ItemForSaveArray));

    } else {
        $('#itemQtnInCart' + row).val(1);
    }
}

//開啟購物車就會從DB讀取產品庫存數量、單價、標題
function ReadProductInfoFromDB(myCartItem) {
    ItemAfterParse = JSON.parse(myCartItem);
    //新生一個物件裡面只有ProductId這個key
    var ItemAfterMap = ItemAfterParse.map(function (x) {
        return x.ProductId;
    });

    $.ajax({
        url: '/ajax/AjaxProductPage.aspx?fn=SearchProductByIdForCart',
        type: 'POST',
        data: {
            getIdArray: JSON.stringify(ItemAfterMap)
        },
        success: function (data) {
            if (data) {
                var jsonResult = JSON.parse(data);
                //將讀庫出來後的資料加上新key QtnForBuy，預設值為1
                //jsonResult.map(function (jsonResult) {
                //    addKeyValue(jsonResult, 'QtnForBuy', ItemAfterParse.QtnForBuy);
                //});
                //將讀庫出來後的資料加上新key QtnForBuy，預設值為1
                //jsonResult.map(function (jsonResult) {
                //    return addKeyValue(jsonResult, 'SubTotal', jsonResult.ProductUnitPrice);
                //});
                productInfoFromDB = jsonResult;
                //列印購物車裡的產品表格
                PrintAllItem();
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

    productInfoFromDB = productInfoFromDB.filter(function (item) {
        return item.ProductId != productId;
    });

    var ItemForSaveArray = [];
    for (var i = 0; i < productInfoFromDB.length; i++) {
        var ItemForSave = {};
        ItemForSave['ProductId'] = productInfoFromDB[i].ProductId;
        ItemForSave['QtnForBuy'] = productInfoFromDB[i].QtnForBuy;
        ItemForSaveArray.push(ItemForSave);
    }

    localStorage.setItem('cartItem', JSON.stringify(ItemForSaveArray));

    if (!(localStorage.getItem('cartItem'))) {
        $('#cartMessage').text('尚無產品');
        $('#productList').hide();
        $('#cartBlock').show();
    } else {
        PrintAllItem();
    }
}

//開啟訂單div
function OrderPreview() {
    $('#overlay1').show();
    $('#orderPriviewBlock').show();
    PrintPriviewOrder();
}