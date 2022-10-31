
//顯示訂單內容
function PrintOrder() {
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

    console.log('全域變數在order頁', productInfoFromDB);    
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
        alert('點數不夠');
        OpenCart();
    } else {
        console.log('要打ajax的資料', orderItemArray);

        $.ajax({
            url: '/ajax/AjaxProductPage.aspx?fn=AddOrder',
            type: 'POST',
            data: {
                getMemberIdNo: memberInfo.IdNo,
                getItemArray: JSON.stringify(orderItemArray)
            },
            success: function (data) {
                console.log(data);
                if (data) {
                } else if (data == 6) {
                    alert('訂單建立成功');
                } else if (data == 7) {
                    openCart();
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
