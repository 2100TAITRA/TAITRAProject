<%@ Page language="c#" Codebehind="DFR200.aspx.cs" AutoEventWireup="false" Inherits="AK.DFR200" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>DFR200 掃描工作量統計表列印</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout" class="hidden">
		<form id="DFR200" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 101; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<asp:customvalidator id="CustomValidatorCommon" style="Z-INDEX: 104; LEFT: 497px; POSITION: absolute; TOP: 311px" runat="server" Display="None"></asp:customvalidator>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle"    style="WIDTH: 7em">
								<asp:label id="Label4" runat="server" CssClass="RequireField">掃描期間：</asp:label></DIV>
						<DIV class="dTD">
								<asp:textbox id="tbSCN_DATE1" tabIndex="1" runat="server" MaxLength="7" Width="4em" CssClass="RequireField DatePicker"></asp:textbox>
								<asp:label id="Label5" runat="server" CssClass="RequireField">至</asp:label>
								<asp:textbox id="tbSCN_DATE2" tabIndex="2" runat="server" Width="4em" MaxLength="7" CssClass="RequireField DatePicker"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle"  style="WIDTH: 7em">
								<asp:label id="Label2" runat="server" >掃描人員：</asp:label></DIV>
						<DIV class="dTD">
								<asp:dropdownlist id="dlUSERNAME" tabIndex="3" runat="server" ></asp:dropdownlist></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle"  style="WIDTH: 7em">
							<asp:label id="Label3" runat="server" >報表種類：</asp:label></DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbPage" tabIndex="4" runat="server"  Text="掃描頁數統計表" GroupName="Report" Checked="True"></asp:radiobutton>
							<asp:radiobutton id="rbCount" tabIndex="5" runat="server"  Text="掃描件數統計表" GroupName="Report"></asp:radiobutton></DIV>
					</DIV>
				</DIV>
			</DIV>			
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽列印" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 102; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 103; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary></form>
	</body>
</HTML>
