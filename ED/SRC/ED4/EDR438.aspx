<%@ Page language="c#" Codebehind="EDR438.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR438" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR438 創簽公文統計作業</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDR438" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px" id="hiddenDiv">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox><asp:textbox id="H_dlSect_Value" runat="server" Width="19px" CssClass="hidden"></asp:textbox><asp:textbox id="H_dlSect_Text" runat="server" Width="19px" CssClass="hidden"></asp:textbox><asp:label id="lbDocProperty" Width="19px" CssClass="hidden" Runat="server"></asp:label><asp:dropdownlist id="dlOuId" runat="server" Width="19px" CssClass="hodden"></asp:dropdownlist><asp:textbox id="H_Dept" runat="server" CssClass="hide"></asp:textbox><asp:textbox id="H_Dept_Value" runat="server" CssClass="Hide"></asp:textbox><asp:textbox id="H_Sect" runat="server" CssClass="Hide"></asp:textbox><asp:textbox id="H_Sect_Value" runat="server" CssClass="Hide"></asp:textbox>
			</DIV>
			<DIV id="BaseTable" class="DivBaseTable">
				<DIV id="MainTable" class="DivTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em"><asp:label id="lbYearMonth" runat="server" CssClass="RequireField">列印月份：</asp:label></DIV>
						<DIV class="dTD">
							<asp:textbox id="txYearMonthS" tabIndex="0" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:textbox>～
							<asp:textbox id="txYearMonthE" tabIndex="0" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em"><asp:label id="lbPrintItem" runat="server" CssClass="RequireField">列印項目：</asp:label></DIV>
						<DIV class="dTD"><asp:dropdownlist id="dlPrintItem" runat="server" CssClass="RequireField"></asp:dropdownlist></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em"><asp:label id="lbPrintUnit" runat="server">列印單位：</asp:label></DIV>
						<DIV class="dTD" style="width:12.5em">
							<cc1:combobox id="dlDept" tabIndex="30" runat="server" Width="9.5em" CssClass="comboBox"></cc1:combobox>
						</DIV>
						<DIV class="dTD">
							<cc1:combobox id="dlSect" tabIndex="40" runat="server" Width="9.5em" CssClass="comboBox"></cc1:combobox>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出統計Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
