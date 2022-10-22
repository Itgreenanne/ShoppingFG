<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ProductPage.aspx.cs" Inherits="ShoppingFG.view.ProductPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>產品資訊</title>
    <link rel="stylesheet" href="/css/ProductPage.css"/>
    <link rel="stylesheet" href="/css/HomePage.css" />
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
     
<body class="no-scroll">
    <div id="overlay"></div>
    <div id="overlay1"></div>
      <div class="productPageContainer" id="productPageContainer">
         <img src="/images/logo.png" class="homePageLogo" id="homePageLogo" onclick=" window.location.href = '/view/HomePage.aspx'"/>
<%--         <div class="pageHead" id="pageHeadBefore">
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
         </div>--%>     
        
        <div class="productMessage" id="productMessage"></div>
        <div class="productInfoBlock" id="productInfoBlock">
            <div class="productImgDiv" id="productImgDiv"></div>
            <div class="ProductInfoContainer" id="ProductInfoContainer">
                <div class="productTitleInProductPage" id="productTitleInProductPage"></div>
                <div class="productPriceInProductPage" id="productPriceInProductPage"></div>
                <div class="productQtnInProductPage" id="productQtnInProductPage"></div>
                <div class="productDetailInProductPage" id="productDetailInProductPage"></div>
                <button class="btnAddToCart" id="btnAddToCart" onclick="AddToCart()">加入購物車</button>
            </div>
        </div>

         <div class="loginBlock" id="loginBlock">
             <img src="/images/logo.png" class="shoppingLogo"/>
           <div class="inputBlock">
             <div class="inputBox">
                 <label for="inputIdNo">ID： </label>
                 <input type="text" class="inputIdNo" id="inputIdNo" autocomplete="off" placeholder="請輸入身份証字號" oninput="NoSpaceKey('inputIdNo')" value=""/><br/>
             </div>
             <div class="inputBox">
                 <label for="inputPwd">密碼： </label>
                 <input type="password" class="inputPwd" id="inputPwd" autocomplete="off" value=""/><br/>
             </div>

           </div>
           <button class="btnLogin" id="btnLogin" onclick ="LoginVerify()">登入</button>
           <button class="btnSignup" id="btnSignup" onclick="OpenSignUpBlock()">註冊</button>
           <button class="btnLoginBlockCancel" id="btnLoginBlockCancel" onclick="LeaveLoginBlock()">取消</button>
        </div>
      </div>
   
</body>
</html>
