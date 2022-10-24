

function PrintOrder() {
    var cartItem = JSON.parse(localStorage.getItem('cartItem'));
    productInfoInCart = cartItem;
    $('#orderTable').html('');
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
    cartItem.forEach(p => {
        tableRow +=
            '<tr>' +
            '<td>' + i + '</td>' +
            //'<td><img src="/images/' + p.ProductPic + '" class="productPicInCart" width="20%"></td>' +
            '<td class="productTitleInOrder">' + p.ProductTitle + '</td>' +
            '<td><input type="number" class="itemQtnInOrder" id="itemQtnInOrder" min="1" max="' + p.ProductQtn + '" onblur="PriceCal()" value="1" /></td>' +
            '<td class="unitPriceInOrder" id="unitPriceInOrder">' + p.ProductUnitPrice + '</td>' +
            '<td id="subTotalInOrder">' + p.ProductUnitPrice + '</td>' +
            //'<td><img src="/images/trashcan.png" class="trashCanImg" onclick="DeleteProduct(\'' + p.ProductId + '\')" /><td>' +
            '</tr>';
        i++;
    });

    $('#productTable').append(tableRow);
    $('#productTable').show();
}

