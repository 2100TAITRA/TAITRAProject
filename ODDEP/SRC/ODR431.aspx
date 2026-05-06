<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="ODR431.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR431" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>ODR431 琩の疭ンる参璸穨</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio 8.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout" class="hidden">
		<form id="ODR431" method="post" runat="server" onkeyup="jf_CheckFull();">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px"
				runat="server" CssClass="hidden"></asp:listbox>
			<asp:textbox id="txYearMonth" runat="server" CssClass="hidden" Width="3em" MaxLength="5"></asp:textbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:9.5em">
							<asp:label id="Label1" runat="server" CssClass="RequireField">る</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txSMon" runat="server" CssClass="RequireFieldNumeric" Width="3em" MaxLength="5"></asp:textbox>⌒
							<asp:textbox id="txEMon" tabIndex="15" runat="server" CssClass="RequireFieldNumeric" Width="3em" MaxLength="5"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:9.5em"><asp:label id="Label2" runat="server" >厨Α</asp:label></DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbClose" tabIndex="35" runat="server"  Text="琩ン参璸る厨"
								GroupName="gn" Checked="True"></asp:radiobutton><BR>
							<asp:radiobutton id="rbSpecial" tabIndex="37" runat="server"  Text="疭ン参璸る厨"
								GroupName="gn"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:0.5em">&nbsp;</DIV>
						<DIV class="dTD">
							<asp:Label id="lbMaxYear" runat="server">ヘ玡参璸程る88888る</asp:Label>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btStatic" runat="server" Text="参璸" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="箇凝" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="" class="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px"
				runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px"
				runat="server" CssClass="hidden"></asp:validationsummary>
			</form>
	</body>
</HTML>
