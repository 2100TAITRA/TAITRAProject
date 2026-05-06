<%@ Page language="c#" Codebehind="EDR489.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR489" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR489 線上簽核公文件數報表統計列印作業</TITLE>
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
		<FORM id="EDR489" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle">
							<asp:label id="Label1" runat="server" CssClass="RequireField"  >統計月份：</asp:label>
						</DIV>
						<DIV class="dTD">
							<DIV class="dTR">							
								<asp:textbox id="txBeginDate" tabIndex="0" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:textbox>
								<asp:label id="Label4" runat="server" Width="16px" CssClass="RequireField">～</asp:label>
								<asp:textbox id="txEndDate" tabIndex="0" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:textbox>
								<asp:checkbox id="cbInterval" runat="server"  Checked="True" Text="區間列印"></asp:checkbox>
							</DIV>
							<DIV class="dTR">							
								<asp:checkbox id="cbIncludeSect" runat="server" Checked="True" Text="含二級單位"></asp:checkbox>
							</DIV>
							<DIV class="dTR">
								<cc1:combobox id="dlDept" runat="server" Width="6em" Rows="8" Visible="False" CssClass="combobox"></cc1:combobox>
								<asp:TextBox id="h_txYM" runat="server" CssClass="hide"></asp:TextBox>
							</DIV>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<asp:label id="lbMaxYear" runat="server" Width="18em">目前統計最大年月：888年</asp:label>
					</DIV>
				</DIV>					
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
