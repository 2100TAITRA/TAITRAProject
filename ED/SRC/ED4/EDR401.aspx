<%@ Page language="c#" Codebehind="EDR401.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR401" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<TITLE>EDR401 展期件數統計作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDR401" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<DIV class="DivBaseTable" id="BaseTable" >
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label1" runat="server" Width="5em" CssClass="RequireField">列印區間：</asp:label>
						</DIV>
						<DIV class="dTD">&nbsp;
							<asp:textbox id="txDateS" tabIndex="0" runat="server" Width="3em" 
								CssClass="RequireFieldNumeric" MaxLength="5" ></asp:textbox>－
							<asp:textbox id="txDateE" tabIndex="0" runat="server" Width="3em" 
								CssClass="RequireFieldNumeric" MaxLength="5" ></asp:textbox>
							<asp:label id="Label2" runat="server" Width="4.5em" CssClass="RequireField">（09401）</asp:label>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">&nbsp;</DIV>
						<DIV class="dTD">
							<asp:CheckBox id="cbPrintLv2" runat="server" Text="列印二級單位" ForeColor="Navy"></asp:CheckBox>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
