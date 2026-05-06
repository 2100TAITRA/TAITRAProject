<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="ODR473.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR473" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>ODR473 未分辦公文查詢作業</title>
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
		<form id="ODR473" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericSearch.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:textbox id="h_searchtype" runat="server"></asp:textbox>
			</DIV>
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV id="TDMon" class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label7" runat="server" CssClass="RequireField">列印月份：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txMonth" runat="server" CssClass="RequireFieldNumeric" Width="3em" MaxLength="5"></asp:textbox>
						</DIV>
					</DIV>
					<DIV id="TDDate" class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label1" runat="server" CssClass="RequireField">列印日期：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txDateS" runat="server" Width="4em" MaxLength="7" CssClass="RequireFieldNumeric DatePicker"></asp:textbox>
							<asp:label id="lbxx" runat="server" CssClass="RequireField">─</asp:label>
							<asp:textbox id="txDateE" runat="server" Width="4em" MaxLength="7" CssClass="RequireFieldNumeric DatePicker"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label2" runat="server">排序：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:radiobuttonlist id="rbSort" runat="server" RepeatDirection="Horizontal">
								<asp:ListItem Value="1">組室及公文文號</asp:ListItem>
								<asp:ListItem Value="2">公文文號</asp:ListItem>
							</asp:radiobuttonlist>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px"	runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
