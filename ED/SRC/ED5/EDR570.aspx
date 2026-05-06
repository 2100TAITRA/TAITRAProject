<%@ Page language="c#" Codebehind="EDR570.aspx.cs" AutoEventWireup="false" Inherits="ED5.ODR570" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR570 郵寄標籤單筆列印作業</TITLE>
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
		<FORM id="ODR570" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV  class="DivBaseTable" id="BaseTable">
				<DIV  class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label1" runat="server" CssClass="RequireField">受文機關：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txOrgNo" tabIndex="0" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="15"></asp:textbox>
							<asp:ImageButton id="btHelp" tabIndex="50" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
							<asp:textbox id="txOrgName" tabIndex="-1" runat="server" Width="15em" CssClass="TextLabel" MaxLength="5"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label2" runat="server">郵遞區號：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txPostCode" CssClass="InputFieldNumeric" tabIndex="0" runat="server" Width="3.5em" MaxLength="6"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label3" runat="server">住址：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txAddress" tabIndex="0" runat="server" Width="22em" MaxLength="60"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label4" runat="server">受文者：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txUsername" tabIndex="0" runat="server" Width="5em" MaxLength="20"></asp:textbox>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:TextBox id="h_DeptNo" runat="server" Width="20px" CssClass="hide"></asp:TextBox>
			<asp:TextBox id="h_UserId" runat="server" Width="20px" CssClass="hide"></asp:TextBox>
			<asp:TextBox id="h_OrgNo" runat="server" Width="20px" CssClass="hide"></asp:TextBox>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
