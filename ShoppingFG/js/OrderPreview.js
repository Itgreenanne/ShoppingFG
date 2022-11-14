
//顯示訂單內容
function PrintPriviewOrder() {
    $('#orderTable').html('');
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
        qtn = productInfoFromDB[i].QtnForBuy;
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

    if (memberInfo.Points < total) {
        console.log('total', total);
        console.log('會員點數', memberInfo.Points);
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
                console.log('result', jsonResult);

                if (jsonResult) {

                    if (jsonResult[0].messageNo == 5) {
                        localStorage.clear();
                        $('#orderPriviewBlock').hide();
                        $('#orderCreated').show();
                        $('#messageForOrderCreated').text('訂單建立成功');
                    } else {
                        $('#messageForUser').text('');
                        var resultString = '';
                        var finalString = '';
                        var ItemForSaveArray = [];
                        for (var i = 0; i < jsonResult.length; i++) {
                            var ItemForSave = {};
                            //產生提示產品價格變動的字串
                            if (jsonResult[i].messageNo == 1)
                            {
                                resultString =
                                    '<tr>' +
                                    '<td class="productTitleInMessageBlock">' + jsonResult[i].productTitle + '</td>' +
                                    '<td>價格變動, 目前價格為</td >' +
                                    '<td>' + jsonResult[i].unitPrice + '</td>' +
                                    '</tr> ';
                            //產生提示產品庫存數量少於購買數量的字串及物件
                            } else if (jsonResult[i].messageNo == 2) {
                                //庫存數量 = 0的提示字串
                                if (jsonResult[i].productQtn == 0) {
                                    resultString =
                                        '<tr>' +
                                        '<td class="productTitleInMessageBlock">' + jsonResult[i].productTitle + '</td>' +
                                        '<td>剩餘數量為' + jsonResult[i].productQtn + '</td>' + 
                                        '<td>將從購物車上移除</td>' + 
                                        '</tr>';
                                //庫存數量大於零且少於購買數量的提示字串
                                } else {
                                    resultString =
                                        '<tr>' +
                                        '<td class="productTitleInMessageBlock">' + jsonResult[i].productTitle + '</td>' +
                                        '<td>數量不足，剩餘數量為</td>' +
                                        '<td>' + jsonResult[i].productQtn + '</td>' +
                                        '</tr>';
                                }
                                //將問題產品id跟庫存數量放到物件給localStorage更新用
                                ItemForSave['ProductId'] = jsonResult[i].productId;
                                ItemForSave['QtnForBuy'] = jsonResult[i].productQtn;
                                ItemForSaveArray.push(ItemForSave);
                            //產生提示產品數量少於購買數量且價格變動的字串及物件
                            } else if (jsonResult[i].messageNo == 3) {
                                //庫存數量 = 0的提示字串
                                if (jsonResult[i].productQtn == 0) {
                                    resultString =
                                        '<tr>' +
                                        '<td class="productTitleInMessageBlock">' + jsonResult[i].productTitle + '</td>' +
                                        '<td>剩餘數量為' + jsonResult[i].productQtn + '</td>' +
                                        '<td>將從購物車上移除</td>' +
                                        '</tr>';
                                //庫存數量大於零且少於購買數量 + 產品價格變動相關的提示字串
                                } else {
                                    resultString =
                                        '<tr>' +
                                        '<td class="productTitleInMessageBlock">' + jsonResult[i].productTitle + '</td>' +
                                        '<td>數量不足，剩餘數量為</td>' +
                                        '<td>' + jsonResult[i].productQtn + '</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                        '<td class="productTitleInMessageBlock">' + jsonResult[i].productTitle + '</td>' +
                                        '<td>價格變動,目前價格為</td>' +
                                        '<td>' + jsonResult[i].unitPrice + '</td>' +
                                        '</tr>';         
                                }
                                //將問題產品id跟庫存數量放到物件給localStorage更新用
                                ItemForSave['ProductId'] = jsonResult[i].productId;
                                ItemForSave['QtnForBuy'] = jsonResult[i].productQtn;
                                ItemForSaveArray.push(ItemForSave);
                            //產生會員點數不足的提示字串
                            } else if (jsonResult[i].messageNo == 4) {

                                resultString =
                                    '<tr>' +
                                    '<td colspan="3">點數不足，剩餘點數為' + jsonResult[i].points + '而總價為' + total + '</td>' +
                                    '</tr>';

                            } else {
                                alert('資料錯誤');
                                break;
                            }                            
                            finalString += resultString;
                        }
                        $('#orderPriviewBlock').hide();
                        $('#orderNotCreated').show();
                        $('#messageWhyCantAddOrderTable').append(finalString);

                        var cartItem = JSON.parse(localStorage.getItem('cartItem'));

                        //取代localStorage中價格或數量有問題的產品，這樣列印表格時購物車的表格數量顯示才會正確
                        for (var i = 0; i < ItemForSaveArray.length; i++) {
                            for (var j = 0; j < cartItem.length; j++) {

                                if (ItemForSaveArray[i].ProductId == cartItem[j].ProductId) {
                                    cartItem[j].QtnForBuy = ItemForSaveArray[i].QtnForBuy;
                                }
                            }
                        }

                        //移除localStorage中產品QtnForBuy = 0的項目
                        cartItem = cartItem.filter(function (item) {
                            return item.QtnForBuy != 0;
                        });

                        console.log('cartItem in orderpreview', cartItem);

                        //更新localStorage
                        localStorage.setItem('cartItem', JSON.stringify(cartItem));
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



//var resultString = '';
//var finalString = '';
//var ItemForSaveArray = [];
//for (var i = 0; i < jsonResult.length; i++) {
//    var ItemForSave = {};
////    //產生提示產品價格變動的字串
////    if (jsonResult[i].messageNo == 1) {
////        resultString = jsonResult[i].productTitle + '價格變動,目前價格為' + jsonResult[i].unitPrice + '<br>';
//        //產生提示產品庫存數量少於購買數量的字串及物件
//    } else if (jsonResult[i].messageNo == 2) {
//        //庫存數量 = 0的提示字串
//        if (jsonResult[i].productQtn == 0) {
//            resultString = jsonResult[i].productTitle + '剩餘數量為' + jsonResult[i].productQtn + '<br>' +
//                '將從購物車上移除' + '<br>';
//            //庫存數量大於零且少於購買數量的提示字串
//        } else {
//            resultString = jsonResult[i].productTitle + '數量不足，剩餘數量為' + jsonResult[i].productQtn + '<br>';
//        }
//        //將問題產品id跟庫存數量放到物件給localStorage更新用
//        ItemForSave['ProductId'] = jsonResult[i].productId;
//        ItemForSave['QtnForBuy'] = jsonResult[i].productQtn;
//        ItemForSaveArray.push(ItemForSave);
//        //產生提示產品數量少於購買數量且價格變動的字串及物件
//    } else if (jsonResult[i].messageNo == 3) {
//        //庫存數量 = 0的提示字串
//        if (jsonResult[i].productQtn == 0) {
//            resultString = jsonResult[i].productTitle + '剩餘數量為' + jsonResult[i].productQtn + '<br>' +
//                '將從購物車上移除' + '<br>';
//            //庫存數量大於零且少於購買數量 + 產品價格變動相關的提示字串
//        } else {
//            resultString = jsonResult[i].productTitle + '數量不足，剩餘數量為' +
//                jsonResult[i].productQtn + '<br>' + jsonResult[i].productTitle +
//                '價格變動,目前價格為' + jsonResult[i].unitPrice + '<br>';
//        }
//        //將問題產品id跟庫存數量放到物件給localStorage更新用
//        ItemForSave['ProductId'] = jsonResult[i].productId;
//        ItemForSave['QtnForBuy'] = jsonResult[i].productQtn;
//        ItemForSaveArray.push(ItemForSave);
//        //產生會員點數不足的提示字串
//    } else if (jsonResult[i].messageNo == 4) {

//        resultString = '點數不足，剩餘點數為' + jsonResult[i].points + '而總價為' + total + '<br>';

//    } else {
//        alert('資料錯誤');
//        break;
//    }
//    finalString += resultString;
//}
//$('#orderPriviewBlock').hide();
//$('#orderNotCreated').show();
//$('#messageForUser').html(finalString);