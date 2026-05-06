<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="AKP210.aspx.cs" AutoEventWireup="false" Inherits="AK.AKP210" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKP210 歸檔統計分析作業</title>
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
		<form id="AKP210" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px"
				runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" ><asp:label class="RequireField" id="Label2" runat="server">本次統計月份：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox class="RequireFieldNumeric" id="txDate" tabIndex="10" runat="server" Width="3em" MaxLength="5"></asp:textbox>
						<asp:label class="RequireField" id="lbYearMonth" runat="server">(格式：YYYMM)</asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle"><asp:textbox id="MaxUseDate" tabIndex="-1" runat="server" CssClass="TextLabel" Width="18em"></asp:textbox></DIV>
					</DIV>
				</DIV>
				<asp:textbox id="txMaxFILECALC" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="txMode" runat="server" CssClass="hide"></asp:textbox>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSave" runat="server" Text="統計" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px"
				runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px"
				runat="server" CssClass="hidden"></asp:validationsummary></form>
	</body>
</HTML>
