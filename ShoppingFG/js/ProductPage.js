$(document).ready(function () {
    PrintProductDiv();
})



function PrintProductDiv() {
    console.log('globaldata=', productInfoGlobal);
    $('#productImgDiv').html('');
    var img = $('<img class="productImgInProductPage" id="productImgInProductPage">');
    img.attr('src', '/images/' + 'womenClothes.png');
    img.appendTo('#productImgDiv');
    $('#productTitleInProductPage').html('標題'+'<div class="titleContent">kaunisvaatejakaunisnaisenmekko ja soposopojjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjkjkjlkjkjlk</div>');
    $('#productPriceInProductPage').html('<img src="/images/unitPrice.png" class="unitPricePic" /><div class="unitPriceNo">111</div>');
    $('#productQtnInProductPage').html('<img src="/images/Qtn1.png" class="qtnPic" /><div class="qtnNo">111</div>');
    $('#productDetailInProductPage').html('詳情' +'<div class="detailContent">abcdefghijklmnopqrstuv pysikjkglk adkfkadflajdk kdafjkdslf adkfjladfk</div>');
}

