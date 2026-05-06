<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Page language="c#" Codebehind="WEM060C1.aspx.cs" AutoEventWireup="false" Inherits="WebEditWs.WEM060C1" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>WEM060C1 機關檔更新紀錄預覽列印作業</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
		<meta name="format - detection" content="telephone = no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="WEM060C1" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<DIV class="hide">
				<asp:listbox id="lbReturnValue" style="Z-INDEX: 101; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
				<asp:customvalidator id="Validator" style="Z-INDEX: 103; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary>
			</DIV>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; ">
							<asp:Label id="lbDate" runat="server" CssClass="KeyField">更新日期：</asp:Label></DIV>
						<DIV class="dTD" style="width: 14em; ">
							<asp:TextBox id="txUpdDateS" runat="server" Width="4.5em" MaxLength="7" CssClass="KeyField DatePicker" onkeypress="jf_InpNumOnly()" style="IME-MODE: disabled">0960101</asp:TextBox>
							<asp:Label id="lbUpd" runat="server">～</asp:Label>
							<asp:TextBox id="txUpdDateE" runat="server" Width="4.5em" MaxLength="7" CssClass="KeyField DatePicker" onkeypress="jf_InpNumOnly()" style="IME-MODE: disabled"></asp:TextBox>
						</DIV>
						<DIV class="dTD" style="width: 14em; ">
							<asp:Label id="lbKeyIn" runat="server" CssClass="KeyField">(日期格式：YYYMMDD)</asp:Label></DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button CssClass= 'hide' ID="btPrint" runat="server" Text="列印" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</form>
	</body>
</HTML>
