<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="AKR893.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR893" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKR893 調案稽催歸還比率統計表</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body class="hidden" MS_POSITIONING="GridLayout">
		<form id="AKR893" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 101; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="Table1">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:6em"><asp:label class="RequireField" id="Label1" runat="server">統計年度 ：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox class="RequireFieldNumeric" id="txYear" tabIndex="10" runat="server" MaxLength="3" Width="2em"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR" ID="minStatistics">
						<FIELDSET  style="WIDTH: 13.5em; HEIGHT: 2em">
							<LEGEND>最小統計單位</LEGEND>
							<asp:radiobutton id="rb1" tabIndex="20" runat="server" Width="6em" Text="一級單位" GroupName="Grp" Checked="True"></asp:radiobutton>
							<asp:radiobutton id="rb2" tabIndex="30" runat="server" Width="6em" Text="二級單位" GroupName="Grp"></asp:radiobutton>
						</FIELDSET>	
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 103; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
