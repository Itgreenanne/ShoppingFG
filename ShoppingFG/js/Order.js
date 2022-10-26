
//顯示訂單內容
function PrintOrder() {
    var cartItem = JSON.parse(localStorage.getItem('cartItem'));
    productInfoInCart = cartItem;
    $('#orderTable').html('');    
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
            '<td class="">'+ p.ProductQtn + '" onblur="PriceCal()" value="1" /></td>' +
            '<td class="unitPriceInOrder" id="unitPriceInOrder">' + p.ProductUnitPrice + '</td>' +
            '<td id="subTotalInOrder">' + p.ProductUnitPrice + '</td>' +
            //'<td><img src="/images/trashcan.png" class="trashCanImg" onclick="DeleteProduct(\'' + p.ProductId + '\')" /><td>' +
            '</tr>';
        i++;
    });

    $('#orderTable').append(tableRow);
    $('#orderTable').show();
}

