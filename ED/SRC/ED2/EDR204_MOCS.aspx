<%@ Page language="c#" Codebehind="EDR204_MOCS.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDR204_MOCS" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR204_MOCS 逾期清單列印作業</TITLE>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDR204_MOCS" onkeyup="jf_CheckFull();" method="post" runat="server"> 
			<!--Template V3 Generated WebForm--> <!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
			<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7em;">
							<asp:label id="Label1" runat="server" CssClass="RequireField">收文日期：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txRcvDateS" runat="server" Width="4em" CssClass="DatePicker RequireField" MaxLength="7"></asp:textbox>
							<asp:label id="Label3" runat="server">-</asp:label>
							<asp:textbox id="txRcvDateE" runat="server" Width="4em" CssClass="DatePicker RequireField" MaxLength="7"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7em;">
							<asp:label id="Label2" runat="server" CssClass="RequireField">逾期日數：</asp:label>
						</div>
						<div class="dTD">
							<asp:dropdownlist id="dlOverdue" runat="server" CssClass="RequireField"></asp:dropdownlist>
						</div>
					</div>
					<div id="dTROverdue" class="hide">
						<div class="dTDTitle" style="WIDTH: 7em;">
							<asp:label id="Label5" runat="server" CssClass="RequireField">逾期天數：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txOverdueS" runat="server" Width="2em" CssClass="RequireField InputFieldNumeric" MaxLength="3"></asp:textbox>
							<asp:label id="Label6" runat="server">天以上未滿</asp:label>
							<asp:textbox id="txOverdueE" runat="server" Width="2em" CssClass="RequireField InputFieldNumeric" MaxLength="3"></asp:textbox>
							<asp:label id="Label7" runat="server">天</asp:label>
						</div>
					</div>
					<div class="hide">
						<div class="dTDTitle" style="WIDTH: 7em;">
							<asp:label id="Label4" runat="server" >承辦單位：</asp:label>
						</div>
						<div class="dTD">
							<asp:dropdownlist id="dlDept" runat="server" ></asp:dropdownlist>
						</div>
					</div>
				</div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
