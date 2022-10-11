<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="HomePage.aspx.cs" Inherits="ShoppingFG.view.HomePage" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
 <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>歡迎來到Shopping</title>
    <link rel="stylesheet" href="/css/HomePage.css"/>
    <link rel="stylesheet" href="/css/Login.css"/>
    <link rel="stylesheet" href="/css/SignUp.css"/>


</head>
    <script src="/js/jquery-2.1.4.js"></script>
    <script type="text/javascript" src="/js/HomePage.js"> </script>
    <script type="text/javascript" src="/js/Login.js"> </script>
    <script type="text/javascript" src="/js/SignUp.js"> </script>



<body>
    <div id="overlay"></div>
    <div id="content">
        <div class="pageHead" id="pageHeadBefore">
          <div class="searchBlock">
            <input type="text" class="searchBar" id="searchBarBefore"oninput="NoSpaceKey()" value=""/>
            <img src="/images/graysearch.png" class="homePageSearch" onclick = "SortProduct()"/>
          </div>
          <div class="cartAndUserPic">
            <img src="/images/graycart.png" class="homePageCart" onclick="OpenCart()"/>           
            <img src="/images/grayuser.png"  class="homePageUser" onclick="OpenLoginBlock()"/>
          </div>
        </div>

        <div class="pageHead" id="pageHeadAfter">
          <div class="searchBlock">
            <input type="text" class="searchBar" id="searchBarAfter"oninput="NoSpaceKey()" value=""/>
            <img src="/images/graysearch.png" class="homePageSearch" onclick = "SortProduct()"/>
          </div>
            <img src="/images/graycart.png" class="homePageCart" onclick="OpenCart()"/>           
            <img src="/images/grayuser.png"  class="homePageUser" onclick="OpenMemberCenterBlock()"/>
            <span class="lastNameShown" id="lastNameShown"></span>
            <span class="firstNameShown" id="firstNameShown"></span>             
          </div>
        
        
        <div class="productContainer" id="productContainer"></div>

        <div class="loginBlock" id="loginBlock">
             <img src="/images/logo.png" class="shoppingLogo"/>
            <div class="inputBlock">
             <div class="idInputBlock">
                 <label for="inputIdNo" class="labelInputIdNo">身份証字號： </label>
                 <input type="text" class="inputIdNo" id="inputIdNo" autocomplete="off" oninput="NoSpaceKey('inputIdNo')" value=""/><br/>
             </div>
             <div class="pwdInputBlock">
                 <label for="inputPwd" class="labelInputPwd">密碼： </label>
                 <input type="text" class="inputPwd" id="inputPwd" autocomplete="off" value=""/><br/>
            </div>
           </div>
            <button class="btnLogin" id="btnLogin" onclick ="LoginVerify()">登入</button>
            <button class="btnSignup" id="btnSignup" onclick="OpenSignUpBlock()">註冊</button>
            <button class="btnLoginBlockCancel" id="btnLoginBlockCancel" onclick="LeaveLoginBlock()">取消</button>
        </div>
        
        <div class="signUpBlock" id="signUpBlock">
            <img src="/images/logo.png" class="shoppingLogo"/>
            <div class="regIdInputBox">
               <div class="idBox">
                <label for="signUpIdNo" class="labelSignUpIdNo">身份証字號： </label>
                <input type="text" class="signUpInputIdNo" id="signUpIdNo" autocomplete="off" oninput="NoSpaceKey('signUpIdNo')" value=""/><br/>
               </div>
               <div class="telBox">
                <label for="signUpTelNo" class="labelSignUpTelNo">聯絡電話： </label>
                <input type="text" class="signUpInputTel" id="signUpInputTel" autocomplete="off" oninput="NoSpaceKey('signUpInputTel')" value=""/><br/>
               </div>
               <div class="pwdBox">
                <label for="signUpPwd" class="labelSignUpPwd">密碼： </label>
                <input type="text" class="signUpInputPwd" id="signUpInputPwd" placeholder="8-20字元" autocomplete="off" oninput="NoSpaceKey('signUpInputPwd')" value=""/><br/>
               </div>
               <div class="nameBox">
                <div class="lastNameBox">
                  <label for="signUpIdNo" class="labelSignUpLastName">姓： </label>
                  <input type="text" class="signUpInputLastName" id="signUpLastName" autocomplete="off" oninput="NoSpaceKey('signUpLastName')" value=""/>
                </div>
                <div class="firstNameBox">
                  <label for="signUpIdNo" class="labelSignUpFirstName">名： </label>
                  <input type="text" class="signUpInputFirstName" id="signUpFirstName" autocomplete="off" oninput="NoSpaceKey('signUpFirstName')" value=""/><br/>
                </div>
               </div>
                <span class="chkGender">性別：<//span>
                <label for="female" class="labFemale">女</label>
                <input name="chkGender"type="radio" class="chkFemale" id="chkFemale" value="2"/>
                <label for="male">男</label>
                <input name="chkGender"type="radio" class="chkMale" id="chkMale" value="1"/>
                <label for="other">其他</label>
                <input name="chkGender"type="radio" class="chkOther" id="chkOther" value="3"/><br/>
                <label for="signUpBirth" class="labelSignUpBirth">生日： </label>
<%--                <input type="text" class="signUpInputBirth" id="signUpInputBirth" placeholder="ex:19900110" autocomplete="off" oninput="NoSpaceKey('signUpInputBirth')" value=""/><br/>--%>
                <input type="date" class="signUpInputBirth" id="signUpInputBirth"/><br/>
                <label for="signUpMail" class="labelSignUpMail">E-Mail： </label>
                <input type="text" class="signUpInputMail" id="signUpInputMail" autocomplete="off" oninput="NoSpaceKey('signUpInputMail')" value=""/><br/>
                <label for="signUpAddress" class="labelSignUpAddress">住址： </label>
                <input type="text" class="signUpInputAddress" id="signUpInputAddress" autocomplete="off" oninput="NoSpaceKey('signUpInputAddress')" value=""/><br/>
                <div class="btnSignUpBox">
                    <button class="btnSignup" id="btnSignUpConfirm" onclick="SignUp()">確定</button>
                    <button class="btnLoginBlockCancel" id="btnCancel" onclick="LeaveSingUpBlock()">取消</button>
                </div>
            </div>
        </div>
        <div class="memberCenter" id="memberCenter">
         <span class="memberCenterTitle">會員中心</span><br/>
           <div class="btnMemberBox">
            <button class="btnMemberGroup" id="setting" onclick="OpenSettingBlock()">帳號設定</button>
            <button class="btnMemberGroup" id="cart" onclick="OpenCartBlock()">購物車</button>
            <button class="btnMemberGroup" id="myOrder" onclick="OpenMyOrder()">我的訂單</button>
            <button class="btnMemberGroup" id="logout" onclick="Logout()">登出</button>
           </div>
           <div class="memberCenterlogo" id="memberCenterlogo">
                <img src="/images/logo.png" class="memberCenterlogoPic"/>  
           </div>
        
        <div class="functionContent" id="functionContent">
          <span class="accountSetting">帳戶設定</span>
          <div class="settingBlock" id="settingBlock">
            <div class="setTelBox">
                <label for="setTelNo" class="labelsetTelNo">聯絡電話： </label>
                <input type="text" class="setInputTel" id="setInputTel" autocomplete="off" oninput="NoSpaceKey('setInputTel')" value=""/><br/>
            </div>
            <div class="setPwdBox">
                <label for="setPwd" class="labelSetPwd">密碼： </label>
                <input type="text" class="setInputPwd" id="setInputPwd" placeholder="8-20字元" autocomplete="off" oninput="NoSpaceKey('setInputPwd')" value=""/>
            </div>
<%--                <div class="setNameBox">--%>
            <div class="setLastNameBox">
                <label for="setIdNo" class="labelSetLastName">姓：</label>
                <input type="text" class="setInputLastName" id="setLastName" autocomplete="off" oninput="NoSpaceKey('setLastName')" value=""/>
            </div>
<%--                 </div>--%>
            <div class="setFirstNameBox">
                <label for="setIdNo" class="labelSetFirstName">名：</label>
                <input type="text" class="setInputFirstName" id="setFirstName" autocomplete="off" oninput="NoSpaceKey('setFirstName')" value=""/>
            </div>
            <div class="emailBox">
                <label for="setMail" class="labelSetMail">E-Mail： </label>
                <input type="text" class="setInputMail" id="setInputMail" autocomplete="off" oninput="NoSpaceKey('setInputMail')" value=""/><br/>
            </div>
            <div class="setAddressBox">
                <label for="setAddress" class="labelSetAddress">住址： </label>
                <input type="text" class="setInputAddress" id="setInputAddress" autocomplete="off" oninput="NoSpaceKey('setInputAddress')" value=""/><br/>
            </div>
            <div class="setBirthBox">
                <label for="setBirth" class="labelSetBirth">生日： </label>
                <input type="text" class="setInputBirth" id="setInputBirth" autocomplete="off" oninput="NoSpaceKey('setInputBirth')" value=""/><br/>
            </div>
            <div class="setGender">
              <span class="chkSetGender">性別：<//span>
                <label for="setFemale" class="labSetFemale">女</label>
                <input name="chkSetGender"type="radio" class="chkSetFemale" id="chkSetFemale" value="2"/>
                <label for="setMale">男</label>
                <input name="chkSetGender"type="radio" class="chkSetMale" id="chkSetMale" value="1"/>
                <label for="setOther">其他</label>
                <input name="chkSetGender"type="radio" class="chkSetOther" id="chkSetOther" value="3"/><br/>
            </div>
            <div class="memberLevel">
                <label for="memberlevel" class="labelMemberLevel">會員等級： </label>
                <span class="MemberLevelNo" id="MemberLevelNo"></span><br/>
            </div>
            <div class="memberPoints">
                <label for="memberPoints" class="labelMemberPoints">會員點數： </label>
                <span class="MemberPoints" id="MemberPoints"></span><br/>
            </div>
            </div>         
            <div class="btnSettingGroup">
                <button class="btnsettingConfirm" id="btnsettingConfirm" onclick="SettingConfirm()">確定</button>
                <button class="btnCancelContent" id="btnCancelContent" onclick="CancelContent()">取消</button>
            </div>
          </div>
       

            <div class="cartBlock" id="cartBlock">
            </div>
            <div class="myOrderBlock" id="myOrderBlock">
            </div>
        
        </div>
     </div>
         
</body>
</html>
