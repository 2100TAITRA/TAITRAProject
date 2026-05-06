<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="AKR111.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR111" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKR111 歸檔清單列印作業</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="AKR111" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
                    <div class="dTR">
                        <div class="dTD" style="WIDTH: 6em">
                            <asp:label  id="Label1" tabIndex="-1" runat="server">作業日期：</asp:label></div>
                        <div class="dTD">
                            <asp:textbox  id="txSDate" tabIndex="5" runat="server" MaxLength="7" Width="4em"></asp:textbox>－
                            <asp:textbox  id="txEDate" tabIndex="8" runat="server" MaxLength="7" Width="4em"></asp:textbox></div>
                    </div>
                    <div class="dTR">
                        <div class="dTD" style="WIDTH: 6em">
                            <asp:label id="Label4" tabIndex="-1" runat="server">點收批號：</asp:label></div>
                        <div class="dTD">
                            <asp:textbox  id="txAcpNo1" tabIndex="10" runat="server" MaxLength="10" Width="5.5em"></asp:textbox>
                            <asp:imagebutton id="btAcpNo1" tabIndex="15" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:imagebutton>－
                            <asp:textbox  id="txAcpNo2" tabIndex="20" runat="server" MaxLength="10" Width="5.5em"></asp:textbox>
                            <asp:imagebutton id="btAcpNo2" tabIndex="25" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:imagebutton></div>
                    </div>
                    <div class="dTR">
                        <div class="dTD" style="WIDTH: 6em">
                            <asp:label id="Label2" runat="server">排列方式：</asp:label></div>
                        <div class="dTD">
                            <asp:RadioButton id="rb1" runat="server" Text="承辦單位+公文文號" GroupName="gn"></asp:RadioButton><br>
                            <asp:RadioButton id="rb2" runat="server" Text="承辦單位+作業時間" GroupName="gn"></asp:RadioButton></div>
                    </div>
                </div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
            <asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary></form>
	</body>
</HTML>
