<%@ Page language="c#" Codebehind="IIM300C5.aspx.cs" AutoEventWireup="false" Inherits="ii.IIM300C5" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>IIM300C5 密碼設定子視窗</title>
		<meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<meta name="CODE_LANGUAGE" content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
        <!--#include file="/STDN/Lib/Script.shtml"-->
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="IIM300C5" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="../IFLIB/GenericChild.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 84px;">
                            <asp:label id="Label1" runat="server" Width="100px">使用者帳號：</asp:label></div>
                        <div class="dTD">
                            <asp:label id="lbAccount" runat="server" Width="144px"></asp:label></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 84px;">
                            <asp:radiobutton style="Z-INDEX: 0" id="rbSetPassWD" runat="server" Width="100px" Text="輸入密碼：" GroupName="PassWD"></asp:radiobutton></div>
                        <div class="dTD">
                            <asp:textbox style="Z-INDEX: 0" id="txMima" runat="server" TextMode="Password"></asp:textbox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 84px;">
                            <asp:label id="Label2" runat="server" Width="100px">確認密碼：</asp:label></div>
                        <div class="dTD">
                            <asp:textbox style="Z-INDEX: 0" id="txReCheckPW" runat="server" TextMode="Password"></asp:textbox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 32px; "></div>
                        <div class="dTD">
                            <asp:radiobutton style="Z-INDEX: 0" id="rbDefaultPW" runat="server" Text="預設密碼" GroupName="PassWD"></asp:radiobutton></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 32px;"></div>
                        <div class="dTD">
                            <asp:checkbox id="cbChangPW" runat="server" Width="264px" Text="使用者必須在下次登入時變更密碼"></asp:checkbox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 32px;"></div>
                        <div class="dTD">
                            <asp:checkbox style="Z-INDEX: 0" id="cbPWEnableF" runat="server" Width="249px" Text="密碼永久有效"></asp:checkbox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTDTitle" style="WIDTH: 32px;"></div>
                        <div class="dTD">
                            <asp:checkbox style="Z-INDEX: 0" id="cbSyncPW" runat="server" Width="249px" Text="同步外網密碼"></asp:checkbox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTD" class="LeftCol" colSpan="3" align="center">
                            <asp:button id="btSave" runat="server" Text="確定"></asp:button></div>
                    </div>
                </div>
                <asp:textbox id="DGINDEX" runat="server" Width="1px" Height="1px"></asp:textbox>
			</div>
        </form>
	</body>
</HTML>
