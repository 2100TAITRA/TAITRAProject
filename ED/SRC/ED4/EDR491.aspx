<%@ Page language="c#" Codebehind="EDR491.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR491" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR491 衛生署格式公文線上簽核統計表列印</TITLE>
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
		<FORM id="EDR491" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label2" runat="server" CssClass="RequireField"  >統計月份：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txBeginDate" tabIndex="0" runat="server" Width="3em" CssClass="RequireFieldNumeric"
								   MaxLength="5"></asp:textbox>
							<asp:label id="Label4" runat="server" CssClass="RequireField">～</asp:label>
							<asp:textbox id="txEndDate" tabIndex="0" runat="server" Width="3em" CssClass="RequireFieldNumeric"
								   MaxLength="5"></asp:textbox>
							<asp:checkbox id="cbInterval" runat="server"  Checked="True" Text="區間列印"
								 ></asp:checkbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">&nbsp;</DIV>
						<DIV class="dTD">
							<asp:checkbox id="cbIncludeSect" runat="server"  Checked="True" Text="含二級單位"
								 ></asp:checkbox>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btAppLvl1" runat="server" AccessKey="M" ToolTip="創稿紙本一層決行清單(ALT+M)" Text="創稿紙本一層決行清單(M)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btAppLvl2" runat="server" AccessKey="S" ToolTip="創稿紙本一層決行清單(ALT+S)" Text="創稿紙本二層決行清單(S)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
