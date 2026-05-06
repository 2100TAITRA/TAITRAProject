<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="AKR330C2.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR330C2" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKR330C2 點收批號查詢子視窗</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio 8.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="AKR330C2" method="post" runat="server" onkeyup="jf_CheckFull();">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
								<asp:label class="RequireField" id="Label2" runat="server">點收日期:</asp:label></DIV>
						<DIV class="dTD">
								<asp:textbox id="txDate1" tabIndex="10" runat="server"
									CssClass="RequireField DatePicker" MaxLength="7" Width="4em"></asp:textbox>－
								<asp:textbox id="txDate2" tabIndex="20" runat="server"
									CssClass="RequireField DatePicker" MaxLength="7" Width="4em"></asp:textbox></DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable">
					<DIV class="GridDiv" id="dgDIV" style="HEIGHT: 24em">
						<asp:datagrid id="dg1" runat="server" PageSize="50" CellPadding="4" GridLines="Vertical" AutoGenerateColumns="False">
							<Columns>
								<asp:HyperLinkColumn DataNavigateUrlField="ACP_NO" DataNavigateUrlFormatString="javascript:ReturnValue(&quot;{0}&quot;)"
									DataTextField="ACP_NO" HeaderText="點收批號">
								</asp:HyperLinkColumn>
								<asp:BoundColumn DataField="ACP_DATE" HeaderText="點收日期"></asp:BoundColumn>
								<asp:BoundColumn DataField="ACP_EMPNAME" HeaderText="點收人員"></asp:BoundColumn>
								<asp:BoundColumn DataField="ACP_NUM" HeaderText="點收數"></asp:BoundColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
				<DIV style="DISPLAY: none; OVERFLOW: auto; WIDTH: 406px; HEIGHT: 51px">
						<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
						<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
						<asp:listbox id="lbReturnValue" runat="server" Height="33px"></asp:listbox>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</form>
	</body>
</HTML>
