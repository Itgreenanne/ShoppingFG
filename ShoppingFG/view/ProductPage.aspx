<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ProductPage.aspx.cs" Inherits="ShoppingFG.view.ProductPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>產品資訊</title>
    <link rel="stylesheet" href="/css/ProductPage.css"/>
    <link rel="stylesheet" href="/css/Login.css"/>
    <link rel="stylesheet" href="/css/SignUp.css"/>
    <link rel="stylesheet" href="/css/MemberCenter.css"/>

</head>
     <script src="/js/jquery-2.1.4.js"></script>
     <script type="text/javascript" src="/js/HomePage.js"> </script>
     <script type="text/javascript" src="/js/ProductPage.js"> </script>
     <script type="text/javascript" src="/js/Login.js"> </script>
     <script type="text/javascript" src="/js/SignUp.js"> </script>
     <script type="text/javascript" src="/js/MemberCenter.js"> </script>
     
<body>
      <div class="productPageContainer" id="productPageContainer">
         <img src="/images/logo.png" class="homePageLogo" id="homePageLogo" onclick=" window.location.href = '/view/HomePage.aspx'"/>
       <%--  <div class="pageHead" id="pageHeadBefore">
          <div class="searchBlock">
            <input type="text" class="searchBar" id="searchBar" oninput="NoSpaceKey('searchBar')" value=""/>
            <img src="/images/graysearch.png" class="homePageSearch" onclick = "SortProduct()"/>
          </div>
          <div class="memberName">
            <span class="lastNameShown" id="lastNameShown"></span>
            <span class="firstNameShown" id="firstNameShown"></span>
          </div>
          <div class="cartAndUserPic">
            <img src="/images/graycart.png" class="homePageCart" onclick="OpenCart()"/>           
            <img src="/images/grayuser.png"  class="homePageUser" onclick="LoginOrSignUp()"/>
          </div>
         </div>     
        
        <div class="noProductMessage" id="noProductMessage"></div>--%>
        <div class="productInfoBlock">
            <div class="productImgDiv" id="productImgDiv"></div>
            <div class="ProductInfoContainer" id="ProductInfoContainer">
                <div class="productTitleInProductPage" id="productTitleInProductPage"></div>
                <div class="productPriceInProductPage" id="productPriceInProductPage"></div>
                <div class="productQtnInProductPage" id="productQtnInProductPage"></div>
                <div class="productDetailInProductPage" id="productDetailInProductPage"></div>
                <button class="btnAddToCart" id="btnAddToCart" onclick="LoginVerify()">加入購物車</button>
            </div>
        </div>
      </div>
   
</body>
</html>
