//var productInfoInCart;
var productInfoFromDB
var total = 0;
var price;

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

                if (data == 2) {
                    alert('產品不存在');
                }
                else {
                    var resultDB = JSON.parse(data);
                    console.log('1.resultDB', resultDB);
                    productInfoFromDB = resultDB;                   
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

    var tableRow = '';

    //判斷購物車裡是否有產品，沒有的話就秀'尚無產品'
    if (cartItem.length != 0) {
       
        total = 0;
        //global變數productInfoFromDB建立QtnForBuy這個欄位
        for (var i = 0; i < productInfoFromDB.length; i++) {
            productInfoFromDB[i].QtnForBuy = 0;
        }

        for (var i = 0; i < cartItem.length; i++) {
            for (var j = 0; j < productInfoFromDB.length; j++) {
                if (productInfoFromDB[j].ProductId == cartItem[i].ProductId) {                    
                    productInfoFromDB[j].QtnForBuy = cartItem[i].QtnForBuy;
                }
            }
        }        
        for (var i = 0; i < productInfoFromDB.length; i++) {
           /* if (productInfoFromDB[i].ProductQtn > 0) {*/

                //$('#messageForUser').text(+ productInfoFromDB[i].ProductTitle + '庫存數量為' + maxQtn + '，將從購物車上移除');

                var qtn = productInfoFromDB[i].QtnForBuy;

                if ((i + 1) % 2 === 0) {
                    tableRow +=
                        '<tr>' +
                        '<th class="evenOrderNo">項次</th>' +
                        '<th class="evenOrderNo">產品標題</th>' +
                        '<th class="evenOrderNo">數量</th>' +
                        '<th class="evenOrderNo">單價</th>' +
                        '<th class="evenOrderNo">操作</th>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="evenOrderNo" rowspan="3">' + (i + 1) + '</td>' +
                        '<td class="evenOrderNo" rowspan="3">' + productInfoFromDB[i].ProductTitle + '</td>' +
                        '<td class="evenOrderNo" rowspan="3"><input type="number" class="itemQtnInCart" id="itemQtnInCart' + i + '" onchange="PriceCal(' + productInfoFromDB[i].ProductId + ', ' + productInfoFromDB[i].ProductQtn + ', ' + i + ' )" value="' + qtn + '" min="1"  max="' + productInfoFromDB[i].ProductQtn + '"/></td>' +
                        '<td class="evenOrderNo" id="unitPriceInCart' + i + '">' + productInfoFromDB[i].ProductUnitPrice + '</td>' +
                        '<td class="evenOrderNo" rowspan="3"><img src="/images/trashcan.png" class="trashCanImg" onclick="DeleteProduct(\'' + productInfoFromDB[i].ProductId + '\')" /></td>' +
                        '</tr>' +
                        '<tr>' +
                        '<th class="evenOrderNo">小計</th>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="evenOrderNo" id="subTotalInCart' + i + '">' + productInfoFromDB[i].ProductUnitPrice * qtn + '</td>' +
                        '</tr>';
                } else {
                    tableRow +=
                        '<tr>' +
                        '<th class="orderNo" colspan="2">項次</th>' +
                        '<th class="orderNo" colspan="2">產品標題</th>' +
                        '<th class="orderNo">數量</th>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="orderNo" colspan="2">' + (i + 1) + '</td>' +
                        '<td class="orderNo" colspan="2">' + productInfoFromDB[i].ProductTitle + '</td>' +
                        '<td class="orderNo"><input type="number" class="itemQtnInCart" id="itemQtnInCart' + i + '" onchange="PriceCal(' + productInfoFromDB[i].ProductId + ', ' + productInfoFromDB[i].ProductQtn + ', ' + i + ' )" value="' + qtn + '" min="1"  max="' + productInfoFromDB[i].ProductQtn + '"/></td>' +
                        '<tr></tr>' +
                        '<th class="orderNo" colspan="2">單價</th>' +
                        '<th class="orderNo" colspan="2">小計</th>' +
                        '<th class="orderNo">操作</th>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="orderNo" colspan="2" id="unitPriceInCart' + i + '">' + productInfoFromDB[i].ProductUnitPrice + '</td>' +
                        '<td class="orderNo" colspan="2" id="subTotalInCart' + i + '">' + productInfoFromDB[i].ProductUnitPrice * qtn + '</td>' +
                        '<td class="orderNo"><img src="/images/trashcan.png" class="trashCanImg" onclick="DeleteProduct(\'' + productInfoFromDB[i].ProductId + '\')" /></td>' +
                        '</tr>';
                }

                total += productInfoFromDB[i].ProductUnitPrice * qtn;
           /* }*/
        }

        $('#productTable').append(tableRow);
        $('#totalInCart').text(total);
        $('#productTable').show();
        $('#productList').show();
        $('#pointOwned').html(memberInfo.Points);

    } else {
        localStorage.clear();
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
    if (maxQtn > 0) {
        if (qtn > 0 && qtn <= maxQtn) {
            //productInfoFromDB.find(function (x) { return x.ProductId === +id }).QtnForBuy = qtn;
            //var unitPrice = productInfoFromDB.find(function (x) { return x.ProductId === +id }).ProductUnitPrice;
            //console.log('unitprice=', unitPrice);
            //price = qtn * unitPrice;
            var price = 0;
            for (var i = 0; i < productInfoFromDB.length; i++) {
                productInfoFromDB[i].QtnForBuy = parseInt($('#itemQtnInCart' + i).val());
                price = productInfoFromDB[i].QtnForBuy * productInfoFromDB[i].ProductUnitPrice;
                $('#subTotalInCart' + i).html(price);
                total += price;
            }

            $('#totalInCart').text(total);
            var ItemForSaveArray = [];

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
            $('#itemQtnInCart' + row).val(1);
        }
    } else {

        $('#overlay1').show();
        $('#orderNotCreated').show();       
        $('#messageForUser').text( productInfoFromDB[row].ProductTitle + '庫存數量為' + maxQtn + '，將從購物車上移除');
        var ItemForSaveArray = [];

        for (var i = 0; i < productInfoFromDB.length; i++) {
            if (productInfoFromDB[i].ProductId != id) {
                var ItemForSave = {};
                ItemForSave['ProductId'] = productInfoFromDB[i].ProductId;
                ItemForSave['QtnForBuy'] = productInfoFromDB[i].QtnForBuy;
                ItemForSaveArray.push(ItemForSave);
            }
        }

        localStorage.setItem('cartItem', JSON.stringify(ItemForSaveArray));
       
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

//開啟下單前的訂單預覽div
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