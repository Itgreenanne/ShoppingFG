//var productInfoInCart;
var productInfoFromDB
var total = 0;
var price;

//開啟購物車就會從DB讀取產品庫存數量、單價、標題
function ReadProductInfoFromDB(myCartItem) {
    ItemAfterParse = JSON.parse(myCartItem);
    console.log('2.myCartItem after Json parse', ItemAfterParse);
    //新生一個物件裡面只有ProductId這個key
    var ItemAfterMap = ItemAfterParse.map(function (x) {
        return x.ProductId;
    });
    console.log('3.myCartItem after map', ItemAfterMap);


    $.ajax({
        url: '/ajax/AjaxProductPage.aspx?fn=SearchProductByIdForCart',
        type: 'POST',
        data: {
            getIdArray: JSON.stringify(ItemAfterMap)
        },
        success: function (data) {
            if (data) {
                if (data == 2) {
                    alert('產品不存在');
                }
                else {
                    var jsonResult = JSON.parse(data);
                    console.log('4.讀庫後parse的資料', jsonResult);
                    //將讀庫出來後的資料加上新key QtnForBuy，預設值為1
                    //jsonResult.map(function (jsonResult) {
                    //    addKeyValue(jsonResult, 'QtnForBuy', ItemAfterParse.QtnForBuy);
                    //});
                    //將讀庫出來後的資料加上新key QtnForBuy，預設值為1
                    //jsonResult.map(function (jsonResult) {
                    //    return addKeyValue(jsonResult, 'SubTotal', jsonResult.ProductUnitPrice);
                    //});
                    //memberInfo.Points = jsonResult.MemberPoints;
                    productInfoFromDB = jsonResult.ProductInfoList;
                    console.log('5.全域變數productInfoFromDB', productInfoFromDB);

                    //列印購物車裡的產品表格
                    PrintAllItem();
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



//購物車視窗
function PrintAllItem() {
    $('#productTable').html('');
    $('#cartMessage').html('');
    var cartItem = JSON.parse(localStorage.getItem('cartItem'));
    console.log('6 在表格PrintAllItem裡的carItem', cartItem);
    var tableRow = '';

    //判斷購物車裡是否有產品，沒有的話就秀'尚無產品'
    if (cartItem.length != 0) {
        
        total = 0;

        for (var i = 0; i < cartItem.length; i++) {

            var qtn = cartItem[i].QtnForBuy;
            productInfoFromDB[i].QtnForBuy = qtn;

            if ((i + 1) % 2 === 0) {
                tableRow +=
                    '<tr>' +
                    '<th class="tgEven" rowspan="2">項次</th>' +
                    '<th class="tgEven" rowspan="2">產品標題</th>' +
                    '<th class="tgEven" rowspan="2">數量</th>' +
                    '<th class="tgEven">單價</th>' +
                    '<th class="tgEven" rowspan="2">操作</th>' +
                    '</tr>' +
                    '<tr>' +
                    '<td class="tgEven" rowspan="2"  id="unitPriceInCart' + i + '">' + productInfoFromDB[i].ProductUnitPrice + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td class="tgEven" rowspan="3">' + (i + 1) + '</td>' +
                    '<td class="tgEven" rowspan="3">' + productInfoFromDB[i].ProductTitle + '</td>' +
                    '<td class="tgEven" rowspan="3"><input type="number" class="itemQtnInCart" id="itemQtnInCart' + i + '" onchange="PriceCal(' + productInfoFromDB[i].ProductId + ', ' + productInfoFromDB[i].ProductQtn + ', ' + i + ' )" value="' + qtn + '" min="1"  max="' + productInfoFromDB[i].ProductQtn + '"/></td>' +
                    '<td class="tgEven" rowspan="3"><img src="/images/trashcan.png" class="trashCanImg" onclick="DeleteProduct(\'' + productInfoFromDB[i].ProductId + '\')" /></td>' +
                    '</tr>' +
                    '<tr>' +
                    '<th class="tgEven">小計</th>' +
                    '</tr>' +
                    '<tr>' +
                    '<td class="tgEven" id="subTotalInCart' + i + '">' + productInfoFromDB[i].ProductUnitPrice * qtn + '</td>' +
                    '</tr>';
            } else {
                tableRow +=
                    '<tr>' +
                    '<th class="tg">' + '項次' + '</th>' +
                    '<th class="tg">' + '產品標題' + '</th>' +
                    '<th class="tg">' + '數量' + '</th>' +
                    '</tr>' +
                    '<tr>' +
                    '<td class="tg">' + (i + 1) + '</td>' +
                    '<td class="tg">' + productInfoFromDB[i].ProductTitle + '</td>' +
                    '<td class="tg"><input type="number" class="itemQtnInCart" id="itemQtnInCart' + i + '" onchange="PriceCal(' + productInfoFromDB[i].ProductId + ', ' + productInfoFromDB[i].ProductQtn + ', ' + i + ' )" value="' + qtn + '" min="1"  max="' + productInfoFromDB[i].ProductQtn + '"/></td>' +
                    '<tr class="tg"></tr>' +
                    '<th class="tg">' + '單價' + '</th>' +
                    '<th class="tg">' + '小計' + '</th>' +
                    '<th class="tg">' + '操作' + '</th>' +
                    '</tr>' +
                    '<tr>' +
                    '<td class="tg" id="unitPriceInCart' + i + '">' + productInfoFromDB[i].ProductUnitPrice + '</td>' +
                    '<td class="tg" id="subTotalInCart' + i + '">' + productInfoFromDB[i].ProductUnitPrice * qtn + '</td>' +
                    '<td class="tg"><img src="/images/trashcan.png" class="trashCanImg" onclick="DeleteProduct(\'' + productInfoFromDB[i].ProductId + '\')" /></td>' +
                    '</tr>';

                //tableRow +=
                //    '<tr>' + '<th class="tg" colspan="2">' + '項次' + '</th>' +
                //    '<th class="tg" colspan="2">' + '產品標題' + '</th>' +
                //    '<th>' + '數量' + '</th>' +
                //    '</tr>' +
                //    '<tr>' +
                //    '<td colspan="2">' + (i + 1) + '</td>' +
                //    '<td class="tg" colspan="2">' + productInfoFromDB[i].ProductTitle + '</td>' +
                //    '<td><input type="number" class="itemQtnInCart" id="itemQtnInCart' + i + '" onchange="PriceCal(' + productInfoFromDB[i].ProductId + ', ' + productInfoFromDB[i].ProductQtn + ', ' + i + ' )" value="' + qtn + '" min="1"  max="' + productInfoFromDB[i].ProductQtn + '"/></td>' +
                //    '<tr></tr>' +
                //    '<th colspan="2">' + '單價' + '</th>' +
                //    '<th colspan="2">' + '小計' + '</th>' +
                //    '<th>' + '操作' + '</th>' +
                //    '</tr>' +
                //    '<tr>' +
                //    '<td class="tg" colspan="2" id="unitPriceInCart' + i + '">' + productInfoFromDB[i].ProductUnitPrice + '</td>' +
                //    '<td colspan="2" id="subTotalInCart' + i + '">' + productInfoFromDB[i].ProductUnitPrice * qtn + '</td>' +
                //    '<td><img src="/images/trashcan.png" class="trashCanImg" onclick="DeleteProduct(\'' + productInfoFromDB[i].ProductId + '\')" /></td>' +
                //    '</tr>';
            }
                
            total += productInfoFromDB[i].ProductUnitPrice * qtn;
        }
        console.log('7 tableRow', tableRow);
        $('#productTable').append(tableRow);
        $('#totalInCart').text(total);
        $('#productTable').show();
        $('#productList').show();
        console.log('8 total', total);

        $('#pointOwned').html(memberInfo.Points);
    } else {
        $('#cartMessage').text('尚無產品');
        $('#productList').hide();       
    }
}


//back up just in case i screw it
//function PrintAllItem() {
//    $('#productTable').html('');
//    var cartItem = JSON.parse(localStorage.getItem('cartItem'));
//    var tableRow = '';

//    //判斷購物車裡是否有產品，沒有的話就秀'尚無產品'
//    if (cartItem.length != 0) {
//        tableRow = '<tr>' +
//            '<th>' + '項次' + '</th>' +
//            '<th>' + '產品標題' + '</th>' +
//            '<th>' + '數量' + '</th>' +
//            '<th>' + '單價' + '</th>' +
//            '<th>' + '小計' + '</th>' +
//            '<th>' + '操作' + '</th>' +
//            '</tr>';

//        total = 0;

//        for (var i = 0; i < cartItem.length; i++) {
//            var qtn = cartItem[i].QtnForBuy;
//            productInfoFromDB[i].QtnForBuy = qtn;
//            tableRow +=
//                '<tr>' +
//                '<td>' + (i + 1) + '</td>' +
//                '<td class="productTitleInCart">' + productInfoFromDB[i].ProductTitle + '</td>' +
//                '<td><input type="number" class="itemQtnInCart" id="itemQtnInCart' + i + '" onchange="PriceCal(' + productInfoFromDB[i].ProductId + ', ' + productInfoFromDB[i].ProductQtn + ', ' + i + ' )" value="' + qtn + '" min="1"  max="' + productInfoFromDB[i].ProductQtn + '"/></td>' +
//                '<td class="unitPriceInCart" id="unitPriceInCart' + i + '">' + productInfoFromDB[i].ProductUnitPrice + '</td>' +
//                '<td id="subTotalInCart' + i + '">' + productInfoFromDB[i].ProductUnitPrice * qtn + '</td>' +
//                '<td><img src="/images/trashcan.png" class="trashCanImg" onclick="DeleteProduct(\'' + productInfoFromDB[i].ProductId + '\')" /><td>' +
//                '</tr>';
//            total += productInfoFromDB[i].ProductUnitPrice * qtn;
//        }

//        $('#productTable').append(tableRow);
//        $('#totalInCart').text(total);
//        $('#productTable').show();
//        $('#pointOwned').html(memberInfo.Points);
//    } else {
//        $('#cartMessage').text('尚無產品');
//        $('#productList').hide();
//    }
//}


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
        $('#overlay1').show();
        $('#orderNotCreated').show();
        $('#messageForUser').text('庫存數量為' + maxQtn + '，請修改');
        //$('#itemQtnInCart' + row).val(1);
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
    if (memberInfo.Points < total) {
        $('#overlay1').show();
        $('#orderNotCreated').show();
        $('#messageForUser').text('點數不夠');
    } else {
        $('#overlay1').show();
        $('#orderPriviewBlock').show();
        PrintPriviewOrder();
    }
}



////開啟訂單div
//function OrderPreview() {
//    if (memberInfo.Points < total) {
//        $('#overlay1').show();
//        $('#orderNotCreated').show();
//        $('#messageForUser').text('點數不夠');
//    }
//    for (var i = 0; i <= productInfoFromDB.length; i++) {
//        console.log(productInfoFromDB[i]);
//        if (productInfoFromDB[i].ProductQtn == 0) {
//            alert('產品已售完');
//            DeleteProduct(productInfoFromDB[i].ProductId);
//        }
//        else if (productInfoFromDB[i].QtnForBuy > productInfoFromDB[i].ProductQtn) {
//            $('#overlay1').show();
//            $('#orderNotCreated').show();
//            $('#messageForUser').text('庫存數量為' + productInfoFromDB[i].ProductQtn + '，請修改');
//        }
//    }

//    $('#overlay1').show();
//    $('#orderPriviewBlock').show();
//    PrintPriviewOrder();
//}