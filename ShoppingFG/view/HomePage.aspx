<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="HomePage.aspx.cs" Inherits="ShoppingFG.view.HomePage" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
 <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
 <meta name="browsermode" content="application" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>歡迎來到Shopping</title>
    <link rel="stylesheet" href="/css/HomePage.css"/>
    <link rel="stylesheet" href="/css/Login.css"/>
    <link rel="stylesheet" href="/css/SignUp.css"/>
    <link rel="stylesheet" href="/css/MemberCenter.css"/>
    <link rel="stylesheet" href="/css/Order.css"/>



</head>
    <script src="/js/jquery-2.1.4.js"></script>
    <script type="text/javascript" src="/js/StartHomePage.js"> </script>
    <script type="text/javascript" src="/js/HomePage.js"> </script>
    <script type="text/javascript" src="/js/Login.js"> </script>
    <script type="text/javascript" src="/js/SignUp.js"> </script>
    <script type="text/javascript" src="/js/MemberCenter.js"> </script>
    <script type="text/javascript" src="/js/Cart.js"> </script>
    <script type="text/javascript" src="/js/Order.js"> </script>

<body class="no-scroll">
    <div id="overlay"></div>
    <div id="overlay1"></div>
    <div class="content" id="content">
        <img src="/images/logo.png" class="homePageLogo" id="homePageLogo" onclick="GetAllProduct()"/>
        <div class="pageHead" id="pageHeadBefore">
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
        
        <div class="productMessage" id="productMessage"></div>
        <div class="productContainer" id="productContainer"></div>    
        

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
        
        <div class="signUpBlock" id="signUpBlock">
            <img src="/images/logo.png" class="shoppingLogo"/>
            <div class="regIdInputBox">
               <div class="regBox">
                <label for="signUpIdNo" class="labelSignUpIdNo">ID： </label>
                <input type="text" class="signUpInputIdNo" id="signUpIdNo" autocomplete="off" onchange="IdNoVerify(this)" oninput="NoSpaceKey('signUpIdNo')" placeholder="請輸入身份証字號"value=""/><br/>
               </div>
               <div class="regBox">
                <label for="signUpInputTel" class="labelSignUpTelNo">聯絡電話： </label>
                <input type="text" class="signUpInputTel" id="signUpInputTel" autocomplete="off" onchange="TelVerify(this)" oninput="NoSpaceKey('signUpInputTel')" value=""/><br/>
               </div>
               <div class="regBox">
                <label for="signUpInputPwd" class="labelSignUpPwd">密碼： </label>
                <input type="password" class="signUpInputPwd" id="signUpInputPwd" placeholder="8-20字元" autocomplete="off" onchange="PwdVerify(this)" oninput="NoSpaceKey('signUpInputPwd')" value=""/><br/>
               </div>
               <div class="regBox">
                <label for="pwdConfirm" class="labelSignUpPwd">密碼確認： </label>
                <input type="password" class="signUpInputPwd" id="pwdConfirm" placeholder="8-20字元" autocomplete="off" onchange="PwdConfirmVerify(this)" oninput="NoSpaceKey('signUpInputPwd')" value=""/><br/>
               </div>
               <div class="regBox">
                  <label for="signUpLastName" class="labelSignUpLastName">姓： </label>
                  <input type="text" class="signUpInputLastName" id="signUpLastName" autocomplete="off" oninput="NoSpaceKey('signUpLastName')" value=""/>
               </div>
               <div class="regBox">
                  <label for="signUpFirstName" class="labelSignUpFirstName">名： </label>
                  <input type="text" class="signUpInputFirstName" id="signUpFirstName" autocomplete="off" oninput="NoSpaceKey('signUpFirstName')" value=""/><br/>
               </div>
               <div class="regGenderBox">
                  <span class="chkGender">性別：</span>
                  <div class="regGenderInput">
                    <span>女</span>
                    <input name="chkGender"type="radio" class="chkFemale" id="chkFemale" value="2"/>
                    <span>男</span>
                    <input name="chkGender"type="radio" class="chkMale" id="chkMale" value="1"/>
                    <span>其他</span>
                    <input name="chkGender"type="radio" class="chkOther" id="chkOther" value="3"/><br/>
                  </div>
               </div>
               <div class="regBox">
                   <label for="signUpBirth" class="labelSignUpBirth">生日： </label>
                   <input type="date" class="signUpInputBirth" id="signUpInputBirth"/><br/>
               </div>
               <div class="regBox">
                   <label for="signUpMail" class="labelSignUpMail">E-Mail： </label>
                   <input type="text" class="signUpInputMail" id="signUpInputMail" autocomplete="off" onchange="EmailVerify(this)" oninput="NoSpaceKey('signUpInputMail')" value=""/><br/>
                </div>
               <div class="regBox">
                    <label for="signUpAddress" class="labelSignUpAddress">住址： </label>
                    <input type="text" class="signUpInputAddress" id="signUpInputAddress" autocomplete="off" oninput="NoSpaceKey('signUpInputAddress')" value=""/><br/>
                </div>
               <div class="btnSignUpBox">
                    <button class="btnSignup" id="btnSignUpConfirm" onclick="SignUp()">確定</button>
                    <button class="btnLoginBlockCancel" id="btnCancel" onclick="LeaveSignUpBlock()">取消</button>
                </div>
            </div>
        </div>
        


        <div class="memberCenter" id="memberCenter">
            <img src="/images/leave.png" class="leaveMemberCenter" id="leaveMemberCenter" onclick="LeaveMemberCenter()"/>
            <span class="memberCenterTitle">會員中心</span>
            <div class="btnMemberBox">
                <button class="btnMemberGroup" id="setting" onclick="OpenSettingBlock()">帳號設定</button>
                <button class="btnMemberGroup" id="cart" onclick="OpenCartBlock()">購物車</button>
                <button class="btnMemberGroup" id="myOrder" onclick="OpenMyOrder()">訂單</button>
                <button class="btnMemberGroup" id="logout" onclick="Logout()">登出</button>            
            </div>
            <div class="memberCenterlogo" id="memberCenterlogo">
                <img src="/images/logo.png" class="memberCenterlogoPic"/>  
            </div>
        
            <div class="functionContent" id="functionContent">

                <div class="settingBlock" id="settingBlock">
                    <span class="accountSetting">帳戶設定</span>
                    <div class="setBox">
                        <label for="setInputTel" class="labelsetTelNo">聯絡電話： </label>
                        <input type="text" class="setInputTel" id="setInputTel" autocomplete="off" onchange="MemberCenterTelVerify(this)" oninput="NoSpaceKey('setInputTel')" value=""/><br/>
                    </div>
                    <div class="setBox">
                        <label for="setInputPwd" class="labelSetPwd">密碼： </label>
                        <div class="btnModifyPwd" id="btnModifyPwd" onclick="ModifyPwdBlock()">修改密碼請按這裡</div>               
                    </div>              
                    <div class="setBox">
                        <label for="setLastName" class="labelSetLastName">姓：</label>
                        <input type="text" class="setInputLastName" id="setLastName" autocomplete="off" oninput="NoSpaceKey('setLastName')" value=""/>
                    </div>               
                    <div class="setBox">
                        <label for="setFirstName" class="labelSetFirstName">名：</label>
                        <input type="text" class="setInputFirstName" id="setFirstName" autocomplete="off" oninput="NoSpaceKey('setFirstName')" value=""/>
                    </div>
                    <div class="setGenderBox">
                        <label class="chkSetGender">性別：</label>
                        <div class="setGenderInput">
                            <span class="genderLabel">女</span>
                            <input name="chkSetGender"type="radio" class="SetGender" id="chkSetFemale" value="2"/>
                            <span class="genderLabel">男</span>
                            <input name="chkSetGender"type="radio" class="SetGender" id="chkSetMale" value="1"/>
                            <span class="genderLabel">其他</span>
                            <input name="chkSetGender"type="radio" class="SetGender" id="chkSetOther" value="3"/><br/>
                        </div>
                    </div>
                    <div class="setBox">
                        <label for="setInputMail" class="labelSetMail">E-Mail： </label>
                        <input type="text" class="setInputMail" id="setInputMail" autocomplete="off"  onchange="MemberCenterEmailVerify(this)" oninput="NoSpaceKey('setInputMail')" value=""/><br/>
                    </div>
                    <div class="setBox">
                        <label for="setInputAddress" class="labelSetAddress">住址： </label>
                        <input type="text" class="setInputAddress" id="setInputAddress" autocomplete="off" oninput="NoSpaceKey('setInputAddress')" value=""/><br/>
                    </div>
                    <div class="setBox">
                        <label for="setInputBirth" class="labelSetBirth">生日： </label>
                        <input type="date" class="signUpInputBirth" id="setInputBirth"/><br/>
                    </div>          
                    <div class="memberLevel">
                        <label for="memberlevel" class="labelMemberLevel">會員等級： </label>
                        <span class="MemberLevelNo" id="MemberLevelNo"></span><br/>
                    </div>
                    <div class="memberPoints">
                        <label for="memberPoints" class="labelMemberPoints">會員點數： </label>
                        <span class="MemberPoints" id="MemberPoints"></span><br/>
                    </div>                   
                    <div class="btnSettingGroup">
                        <button class="btnsettingConfirm" id="btnsettingConfirm" onclick="SettingConfirm()">確定</button>
                        <button class="btnCancelContent" id="btnCancelContent" onclick="CancelContent()">取消</button>
                    </div>
                </div>  
         
                <div class="cartBlock" id="cartBlock">
                 <span class="myCartTitle">購物車</span>
                 <span class="myCartTitle" id="cartMessage"></span>
                 <div class="productList" id="productList">
                    <table class="productTable" id="productTable"></table>
                    <div class="balanceBlock">
                        <div class="totalBlock">
                            <div class="labelInCart">總額：</div>
                            <div class="labelInCartShown" id="totalInCart"></div><br/>
                        </div>
                    <div class="pointInputBlock">
                        <label for="inputPoint" class="labelInCart">請輸入折抵點數： </label>
                        <input type="number" class="inputPoint" id="inputPoint" autocomplete="off" onchange="PointVerify(this)" value=""/><br/>
                    </div>
                    <div class="pointsBlock">
                        <div  class="labelInCart">目前擁有點數：</div>
                        <div class="labelInCartShown" id="pointOwned"></div>     
                    </div>
                    </div>
                 <button class="btnCart" id="btnCheckOut" onclick ="OrderPreview()">結帳</button>
                 </div>
                 <button class="btnCart" id="btnKeepShopping" onclick="CancelContent()">確定</button>
              </div>

                <div class="myOrderBlock" id="myOrderBlock">
                 <span class="myCartTitle">訂單</span>
                 <div class="productList" id="orderCreatedList">
                    <table class="productTable" id="orderCreatedTable"></table>                            
                 <button class="btnCart" id="btnBackToMemberCenter" onclick="CancelContent()">確定</button>               
                 </div>

              </div>
            </div>
        </div>

        <div class="pwdModify" id="pwdModify">
              <span class="pwdSetting">修改密碼</span>
               <div class="pwdModifyBlock">
                 <div class="pwdModifyBox">
                    <label for="inputOldPwd">請輸入舊密碼： </label>
                    <input type="password" class="inputOldPwd" id="inputOldPwd" autocomplete="off" onchange="PwdVerify(this)" value=""/><br/>
                 </div>
                <div class="pwdModifyBox">
                    <label for="inputNewPwd">請輸入新密碼： </label>
                    <input type="password" class="inputNewPwd" id="inputNewPwd" autocomplete="off" onchange="PwdVerify(this)" value=""/><br/>
                </div>
                <div class="pwdModifyBox">
                    <label for="newPwdConfirm">請再重覆一次： </label>
                    <input type="password" class="newPwdConfirm" id="newPwdConfirm" autocomplete="off" onchange="PwdVerify(this)" value=""/><br/>
                </div>
               </div>
                <div class="btnSettingGroup">
                  <button class="btnsettingConfirm" id="btnPwdConfirm" onclick="SetModifiedPwd()">確定</button>
                  <button class="btnCancelContent" id="btnleavePwdBlock" onclick="LeavePwdBlock()">取消</button>
                </div>
           </div>

        <div class="orderBlock" id="orderItemBlock">
                <span class="myOrderTitle">訂單細項</span>
                <div class="productList" id="orderItemList">
                    <table class="productTable" id="orderItemTable"></table>                
                </div>
                <div class="balanceBlock">
                        <div class="totalBlock">
                            <div class="labelInPreviewOrder">總額：</div>
                            <div class="resultInPreviewOrder" id="totalInOrderItem"></div><br/>
                        </div>
                </div>          
                <button class="btnCart" id="btnBackToAllOrder" onclick ="CloseOrderItem()">確定</button>                
          </div>

        <div class="orderBlock" id="orderPriviewBlock">
                <span class="myOrderTitle">訂單</span>
                <div class="productList" id="orderList">
                    <table class="productTable" id="orderTable"></table>                
                </div>
                <span class="messageInPreviewOrder" id="messageInPreviewOrder"></span>
                <div class="balanceBlock">
                        <div class="totalBlock">
                            <div class="labelInPreviewOrder">總額：</div>
                            <div class="resultInPreviewOrder" id="totalInOrderPreview"></div><br/>
                        </div>
                </div>
                <div class="pointsBlock">
                        <div  class="labelInPreviewOrder">目前擁有點數：</div>
                        <div class="resultInPreviewOrder" id="pointInPreviewOrder"></div>     
                </div>
                <button class="btnCart" id="btnOrderComfirm" onclick ="OrderConfirm()">確定</button>
                <button class="btnCart" id="btnBacktoCart" onclick="OpenCart()">回購物車</button>
            </div>

        <div class="orderMessage" id="orderCreated">               
                <span class="messageInPreviewOrder" id="messageForOrderCreated"></span>           
                <button class="btnCart" id="btnBacktoHome" onclick="window.location.href = '/view/HomePage.aspx'">確定</button>
            </div>

        <div class="orderMessage" id="orderNotCreated">               
                <span class="messageInPreviewOrder" id="messageForUser"></span>           
                <button class="btnCart" id="btnBacktoCartFromMessageBox" onclick="OpenCart()">回購物車</button>
            </div>

            
       

    </div>


  
</body>
</html>