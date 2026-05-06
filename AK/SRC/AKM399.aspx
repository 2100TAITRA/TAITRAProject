<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="AKM399.aspx.cs" AutoEventWireup="false" Inherits="AK.AKM399" ValidateRequest="false" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKM399 櫥位管理維護作業</title>
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
		<form id="AKM399" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="BaseTable" id="BaseTable">
				<DIV id="MTable1" class="DivTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width : 5.5em"><asp:label id="Label1" runat="server" >櫥位號：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txStockNo1" runat="server" CssClass="InputFieldNumeric" Width="2em" MaxLength="3"></asp:textbox>&nbsp;─
								<asp:textbox CssClass="InputUpperFieldText" id="txStockNo2" runat="server"  Width="1.5em" MaxLength="2"></asp:textbox>&nbsp;─
								<asp:textbox id="txUsedStockNoS" runat="server" CssClass="DisplayOnly" Width="2.5em" ReadOnly="True"></asp:textbox>&nbsp;～
								<asp:textbox id="txUsedStockNoE" runat="server" CssClass="DisplayOnly" Width="2.5em" ReadOnly="True"></asp:textbox>
								<asp:TextBox id="txOrgNo" runat="server" Width="3em" CssClass="hide"></asp:TextBox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width : 5.5em"><asp:label id="Label2" runat="server" >分類：</asp:label></DIV>
						<DIV class="dTD" style="width : 12.5em"><asp:dropdownlist id="dlClsNoCls" runat="server"></asp:dropdownlist>
							<asp:TextBox id="txCls" runat="server" Width="2em" CssClass="hide"></asp:TextBox></DIV>
						<DIV class="dTDTitle" style="width : 5.5em"><asp:label id="Label5" runat="server" >編目人員：</asp:label></DIV>
						<DIV class="dTD"><asp:dropdownlist id="dlFileUsername" runat="server"></asp:dropdownlist>
							<asp:TextBox id="txUser" runat="server" Width="2em" CssClass="hide"></asp:TextBox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width : 5.5em"><asp:label id="Label3" runat="server" >使用格數：</asp:label></DIV>
						<DIV class="dTD" style="width : 12.5em"><asp:textbox id="txUsedStockNo" runat="server" CssClass="DisplayOnly" Width="2.5em" ReadOnly="True"></asp:textbox></DIV>
						<DIV class="dTDTitle" style="width : 5.5em"><asp:label id="Label6" runat="server" >使用狀態：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txStockState" runat="server" CssClass="DisplayOnly" Width="4em" ReadOnly="True"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width : 5.5em"><asp:label id="Label4" runat="server" >備註：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txRemark" runat="server"  Width="16.5em"></asp:textbox></DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
		<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: -5px; POSITION: absolute; TOP: 223px" runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
