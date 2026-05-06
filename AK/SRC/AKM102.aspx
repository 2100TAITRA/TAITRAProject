<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="AKM102.aspx.cs" AutoEventWireup="false" Inherits="AK.AKM102" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKM102 庫房維護作業</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body class="hidden" MS_POSITIONING="GridLayout">
		<form id="AKM102" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px"
				runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em"><asp:label class="KeyField" id="Label1" runat="server" Width="5.5em">庫房代號 ：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox class="KeyUpperField" id="txStoreNo" tabIndex="1" runat="server" Width="2em" MaxLength="3"> 13241</asp:textbox>
								<asp:textbox class="KeyUpperField" id="txStoreNo2" tabIndex="1" runat="server" CssClass="hidden"
									Width="2.5em" MaxLength="5" AutoPostBack="True"> 13241</asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em"><asp:label class="RequireField" id="Label2" runat="server" Width="5.5em">庫房名稱 ：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox class="RequireField" id="txStoreName" tabIndex="1" runat="server" Width="9.5em"
									MaxLength="20">01234567890123456789</asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label class="RequireField" id="Label3" runat="server" Width="5.5em">庫房類別 ：</asp:label></DIV>
						<DIV class="dTD">
							<asp:RadioButton id="rb1" class="RequireField" runat="server" Text="機關庫房" GroupName="rb"></asp:RadioButton>
							<asp:RadioButton id="rb2" class="RequireField" runat="server" Text="單位庫房" GroupName="rb"></asp:RadioButton></DIV>
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
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px"	runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
