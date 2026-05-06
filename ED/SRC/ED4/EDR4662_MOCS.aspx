<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDR4662_MOCS.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR4662_MOCS" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR4662_MOCS 單位承/會辦公文統計表列印作業</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDR4662_MOCS" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px" id="hiddenDiv">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:TextBox ID="H_Dept" runat="server" Width="80px"></asp:TextBox>
				<asp:TextBox ID="H_Dept_Value" runat="server"></asp:TextBox>
				<asp:TextBox ID="H_Sect_Value" runat="server"></asp:TextBox>
				<asp:TextBox ID="H_dlSect_Value" runat="server"></asp:TextBox>
				<asp:TextBox ID="H_Sect" runat="server"></asp:TextBox>
			</DIV>
			<DIV id="BaseTable" class="DivBaseTable">
				<DIV id="MainTable" class="DivTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width : 5.5em">
							<asp:label id="Label1" runat="server" CssClass="RequireField">結案日期：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txDateS" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>~
							<asp:textbox id="txDateE" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width : 5.5em">
							<asp:label id="Label2" runat="server">承辦單位：</asp:label>
						</DIV>
						<DIV class="dTD">
						<div class="dTD" style="width: 9.5em">
							<cc1:ComboBox ID="dlDept" runat="server" CssClass="comboBox" Width="7.5em"></cc1:ComboBox>
						</div>
						<div class="dTD" style="width: 9.5em">
							<cc1:ComboBox ID="dlSect" runat="server" CssClass="comboBox" Width="7.5em"></cc1:ComboBox>
						</div>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
