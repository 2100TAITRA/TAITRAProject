<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDR4311_VAC.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR4311_VAC" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR4311_VAC 稽催成果管制統計表</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDR4311_VAC" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:ListBox ID="ListBox1" runat="server" Width="80px"></asp:ListBox>
				<asp:TextBox id="h_MaxYearMonth" runat="server"></asp:TextBox>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<DIV id="BaseTable" class="DivBaseTable">
				<DIV id="MainTable" class="DivTable">
					<div class="dTR">
						<div class="dTDTitle" style="width: 8em">
							<asp:Label ID="lbYearmonth" runat="server" CssClass="RequireField">列印月份：</asp:Label>
						</div>
						<div class="dTD" style="width: 15em">
							<asp:TextBox ID="txYearmonthS" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:TextBox>
							<asp:Label ID="txYMSeparator" runat="server"> ~ </asp:Label>
							<asp:TextBox ID="txYearmonthE" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:TextBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em;">
							<asp:label id="lbDept" runat="server"  EnableViewState="False">承辦單位：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 15em;">
							<asp:dropdownlist id="dlDept" runat="server"></asp:dropdownlist>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="lbMax" runat="server" >最大統計年月：</asp:label>
						</div>
						<div class="dTD" style="width: 15em">
							<asp:label id="lbMaxYearMonth" tabIndex="60" runat="server" Width="7em"></asp:label>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="lbMethod" runat="server" >統計方式：</asp:label>
						</div>
						<div class="dTD" style="width: 15em">
							<asp:RadioButton id="rbMonth" tabIndex="60"  Checked="True" Text="依月份統計" GroupName="StatMethod" runat="server" Width="7em" ></asp:RadioButton>
							<asp:RadioButton id="rbDept" tabIndex="60" runat="server" Text="依單位統計" GroupName="StatMethod" Width="7em" ></asp:RadioButton>
						</div>
					</div>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出EXCEL" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btODS" runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:textbox style="Z-INDEX: 102; POSITION: absolute; TOP: 368px; LEFT: 488px" id="hMaxMonth" runat="server" CssClass="hide"></asp:textbox>
			<asp:dropdownlist style="Z-INDEX: 103; POSITION: absolute; TOP: 384px; LEFT: 616px" id="dlOuId" runat="server" CssClass="hide"></asp:dropdownlist>
		</FORM>
	</BODY>
</HTML>
