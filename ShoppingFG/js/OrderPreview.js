
//顯示訂單內容
function PrintPriviewOrder() {
    $('#orderTable').html('');
    var cartItem = JSON.parse(localStorage.getItem('cartItem'));    
    var tableRow = '';
    tableRow = '<tr>' +
        '<th>' + '項次' + '</th>' +
        '<th>' + '產品標題' + '</th>' +
        '<th>' + '數量' + '</th>' +
        '<th>' + '單價' + '</th>' +
        '<th>' + '小計' + '</th>' +     
        '</tr>';

    total = 0;

    for (var i = 0; i < productInfoFromDB.length; i++) {
        qtn = cartItem[i].QtnForBuy;
        tableRow +=
            '<tr>' +
            '<td>' + (i + 1) + '</td>' +
            '<td class="productTitleInCart">' + productInfoFromDB[i].ProductTitle + '</td>' +
            '<td>' + qtn + '</td>' +
            '<td class="unitPriceInCart" id="unitPriceInCart' + i + '">' + productInfoFromDB[i].ProductUnitPrice + '</td>' +
            '<td id="subTotalInCart' + i + '">' + productInfoFromDB[i].ProductUnitPrice * qtn + '</td>' +           
            '</tr>';
        total += productInfoFromDB[i].ProductUnitPrice * qtn;
    }

    $('#orderTable').append(tableRow);
    $('#orderTable').show();
    $('#totalInOrderPreview').text(total);
    $('#pointInPreviewOrder').html(memberInfo.Points);
}


function OrderConfirm() {
    var orderItemArray = [];
    var total = 0;

    for (var i = 0; i < productInfoFromDB.length; i++) {
        var orderItem = {};
        orderItem['ProductId'] = productInfoFromDB[i].ProductId;
        orderItem['QtnForBuy'] = productInfoFromDB[i].QtnForBuy;
        orderItem['UnitPrice'] = productInfoFromDB[i].ProductUnitPrice;
        orderItemArray.push(orderItem);
        total += productInfoFromDB[i].QtnForBuy * productInfoFromDB[i].ProductUnitPrice;
    }

    console.log('from orderconfirm()', productInfoFromDB);

    if (memberInfo.Points < total) {
        $('#orderPriviewBlock').hide();
        $('#orderNotCreated').show();
        $('#messageForUser').text('點數不夠');
        //OpenCart();
    } else {

        $.ajax({
            url: '/ajax/AjaxProductPage.aspx?fn=AddOrder',
            type: 'POST',
            data: {
                getMemberIdNo: memberInfo.IdNo,
                getItemArray: JSON.stringify(orderItemArray)
            },
            success: function (data) {
                var jsonResult = JSON.parse(data);

                if (jsonResult) {
                    console.log('result', jsonResult);

                    if (jsonResult[0].messageNo == 5) {
                        localStorage.clear();
                        $('#orderPriviewBlock').hide();
                        $('#orderCreated').show();
                        $('#messageForOrderCreated').text('訂單建立成功');
                    } else {
                        var resultString = '';
                        var finalString = '';
                        var ItemForSaveArray = [];
                        for (var i = 0; i < jsonResult.length; i++) {
                            var ItemForSave = {};

                            if (jsonResult[i].messageNo == 1)
                            {
                                resultString = jsonResult[i].productTitle + '價格變動,目前價格為' + jsonResult[i].unitPrice + '<br>';

                            } else if (jsonResult[i].messageNo == 2) {
                                
                                resultString = jsonResult[i].productTitle + '數量不足，剩餘數量為' + jsonResult[i].productQtn + '<br>';
                                ItemForSave['ProductId'] = jsonResult[i].productId;
                                ItemForSave['QtnForBuy'] = jsonResult[i].productQtn;
                                ItemForSaveArray.push(ItemForSave);

                            } else if (jsonResult[i].messageNo == 3) {

                                resultString = jsonResult[i].productTitle + '數量不足，剩餘數量為' +
                                               jsonResult[i].productQtn + '<br>' + jsonResult[i].productTitle +
                                               '價格變動,目前價格為' + jsonResult[i].unitPrice + '<br>';
                                ItemForSave['ProductId'] = jsonResult[i].productId;
                                ItemForSave['QtnForBuy'] = jsonResult[i].productQtn;
                                ItemForSaveArray.push(ItemForSave);

                            }
                            else if (jsonResult[i].messageNo == 4) {

                                resultString = '點數不足，剩餘點數為' + jsonResult[i].points + '而總價為' + total + '<br>';

                            } else {
                                alert('資料錯誤');
                                break;
                            }                            
                            finalString += resultString;
                        }
                        $('#orderPriviewBlock').hide();
                        $('#orderNotCreated').show();
                        $('#messageForUser').html(finalString);

                        console.log('ItemForSaveArray', ItemForSaveArray);

                        var cartItem = JSON.parse(localStorage.getItem('cartItem'));

                        //更新localStorage這樣購物車的表格數量顯示才會正確
                        for (var i = 0; i < ItemForSaveArray.length; i++) {
                            for (var j = 0; j < cartItem.length; j++) {

                                if (ItemForSaveArray[i].ProductId == cartItem[j].ProductId) {
                                    cartItem[j].QtnForBuy = ItemForSaveArray[i].QtnForBuy;
                                }
                                console.log('cartItem[', j, '].QtnForBuy', cartItem[j].QtnForBuy);
                            }
                        }
                        console.log('cartItem', cartItem);

                        localStorage.setItem('cartItem', JSON.stringify(cartItem));
                        console.log('after setItem in the orderconfirm()', productInfoFromDB);

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
}



//for (var i = 0; i < jsonResult.length; i++) {
//    if (jsonResult[i].messageNo == 1) {
//        $('#orderPriviewBlock').hide();
//        $('#orderNotCreated').show();
//        $('#messageForUser').html(jsonResult[i].productTitle + '價格變動,目前價格為' + jsonResult[i].unitPrice + '<br/>');
//    } else if (jsonResult[i].messageNo == 2) {
//        $('#orderPriviewBlock').hide();
//        $('#orderNotCreated').show();
//        $('#messageForUser').html(jsonResult[i].productTitle + '數量不足，剩餘數量為' + jsonResult[i].productQtn + '<br/>');
//    } else if (jsonResult[i].messageNo == 3) {
//        $('#orderPriviewBlock').hide();
//        $('#orderNotCreated').show();
//        $('#messageForUser').html(jsonResult[i].productTitle + '數量不足，剩餘數量為' +
//            jsonResult[i].productQtn + jsonResult[i].productTitle + '價格變動,目前價格為' + jsonResult[i].unitPrice + '<br/>');
//    }
//    else if (jsonResult[i].messageNo == 4) {
//        $('#orderPriviewBlock').hide();
//        $('#orderNotCreated').show();
//        $('#messageForUser').html('點數不足，剩餘點數為' + jsonResult[i].points + '而總價為' + total + '<br/>');
//    } else {
//        alert('資料錯誤');
//    }
//}