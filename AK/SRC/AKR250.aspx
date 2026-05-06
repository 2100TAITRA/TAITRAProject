<%@ Page language="c#" Codebehind="AKR250.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR250" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title>AKR250 そゅ癶ン参璸穨</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="AKR250" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="Table1">
					<DIV class="dTR">
						<FIELDSET style="WIDTH: 25.5em; HEIGHT: 7em"><LEGEND>厨</LEGEND>
							<DIV class="dTR">
								<DIV class="dTDTitle" style="WIDTH: 7.5em"><asp:radiobutton id="rbMonth" tabIndex="5" runat="server" Width="6em" Text="る厨" GroupName="GN"></asp:radiobutton></DIV>
							</DIV>
							<DIV class="dTR">
								<DIV class="dTDTitle" style="WIDTH: 7.5em"><asp:label id="Label1" runat="server" Width="6em">る</asp:label></DIV>
								<DIV class="dTD"><asp:textbox id="txSDate" tabIndex="10" runat="server" Width="3em" MaxLength="5" CssClass="InputFieldNumeric"></asp:textbox>⌒
										<asp:textbox id="txEDate" tabIndex="20" runat="server" Width="3em" MaxLength="5" CssClass="InputFieldNumeric"></asp:textbox>(ΑYYYMM)</DIV>
							</DIV>
							<DIV class="dTR">
								<DIV class="dTDTitle" style="WIDTH: 7.5em"><asp:radiobutton id="rbYear" tabIndex="25" runat="server" Width="6em" Text="厨" GroupName="GN"></asp:radiobutton></DIV>
							</DIV>
							<DIV class="dTR">
								<DIV class="dTDTitle" style="WIDTH: 7.5em"><asp:label id="Label2" runat="server" Width="6em"></asp:label></DIV>
								<DIV class="dTD"><asp:textbox id="txYear" tabIndex="30" runat="server" Width="2em" MaxLength="3" CssClass="InputFieldNumeric"></asp:textbox></DIV>
							</DIV>
						</FIELDSET>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 8.5em"><asp:label id="Label3" runat="server" Width="6em">┯快虫</asp:label></DIV>
						<DIV class="dTD"><cc1:combobox id="dlUnit" runat="server" Width="6.5em" CssClass="comboBox"></cc1:combobox></DIV>
					</DIV>
					<DIV class="dTR" id="drPrintLv">
						<DIV class="dTDTitle" style="WIDTH: 8.5em"><asp:label id="Label4" runat="server" Width="6em">よΑ</asp:label></DIV>
						<DIV class="dTD"><asp:radiobutton id="rbDept" tabIndex="50" runat="server" Text="" GroupName="gp"></asp:radiobutton>
						<asp:radiobutton id="rbSect" tabIndex="53" runat="server" Text="" GroupName="gp"></asp:radiobutton></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 14.5em"><asp:label id="lbMaxYear" runat="server">ヘ玡程参璸る88888る</asp:label></DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btStatic" runat="server" Text="参璸" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPreview" runat="server" Text="箇凝" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
