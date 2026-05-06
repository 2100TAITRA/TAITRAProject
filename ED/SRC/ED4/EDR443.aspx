<%@ Page language="c#" Codebehind="EDR443.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR443" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR443</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDR443" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV id="BaseTable" class="DivBaseTable">
				<DIV id="MainTable" class="DivTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 11em">
							<asp:label id="Label1" runat="server" CssClass="KeyField">隸屬機關：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:DropDownList id="dlOrg" runat="server" Width="13.5em"></asp:DropDownList>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 11em">
							<asp:RadioButton id="rbYearMon" runat="server" GroupName="SearchType"></asp:RadioButton>
							<asp:label id="Label3" runat="server">月份：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txYearMon" tabIndex="0" runat="server" Width="3em" MaxLength="5" CssClass="InputFieldNumeric"></asp:textbox>
							<asp:Label id="lbMaxYM" runat="server" Width="14.5em"></asp:Label>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 11em">
							<asp:RadioButton style="Z-INDEX: 0" id="rbYear" runat="server" GroupName="SearchType"></asp:RadioButton>
							<asp:label id="Label4" runat="server">年度：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txYear" tabIndex="0" runat="server" Width="2em" CssClass="DisplayOnly InputFieldNumeric" MaxLength="3"></asp:textbox>
							<asp:Label style="Z-INDEX: 0" id="lbMaxY" runat="server" Width="15em"></asp:Label>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
			<asp:TextBox style="Z-INDEX: 101; POSITION: absolute; TOP: 344px; LEFT: 400px" id="hMaxMonth" runat="server" CssClass="hide"></asp:TextBox>
		</FORM>
	</BODY>
</HTML>
