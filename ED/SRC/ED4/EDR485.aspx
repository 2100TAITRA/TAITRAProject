<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDR485.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR485" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR485 線上簽核件數統計表列印作業</TITLE>
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
		<FORM id="EDR485" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 6.5em; POSITION: absolute; TOP: 0px; HEIGHT: 6.5em">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR" id="trformat">
						<DIV class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label1" runat="server" CssClass="RequireField">報表格式：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbYear" runat="server" CssClass="RequireField" GroupName="ReportType" Text="年報表"></asp:radiobutton>
							<asp:radiobutton id="rbMonth" runat="server" CssClass="RequireField" GroupName="ReportType" Text="月報表" Checked="True"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR" id="trYearMonth">
						<DIV class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label2" runat="server" CssClass="RequireField">統計月份：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txYearMonth" tabIndex="0" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:textbox>
							<asp:label id="Label3" runat="server" CssClass="RequireField">YYYMM</asp:label>
						</DIV>
					</DIV>
					<DIV class="dTR" id="trVGHYearMonth" style="display:none">
						<DIV class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label4" runat="server" CssClass="RequireField">統計月份：</asp:label>
						</DIV>
						<DIV class="dTD">
							<div class="dTR">
								<asp:textbox id="txYearMonthS" tabIndex="0" runat="server" Width="3em" CssClass="RequireField" MaxLength="5"></asp:textbox>～
								<asp:textbox id="txYearMonthE" tabIndex="0" runat="server" Width="3em" CssClass="RequireField" MaxLength="5"></asp:textbox>
								<asp:label id="Label5" runat="server" CssClass="RequireField">YYYMM</asp:label>
							</div>
							<DIV class="dTR" id="trInterval" style="display:none">
								<asp:checkbox id="cbInterval" runat="server" Text="區間列印" Checked="True"></asp:checkbox>							
							</DIV>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em">&nbsp;</DIV>
						<DIV class="dTD">
							<asp:checkbox id="CheckBox1" runat="server" Text="含二級單位" Checked="True"></asp:checkbox>
						</DIV>
					</DIV>
				</DIV>
				<asp:DropDownList id="dlOuId" runat="server" Visible="False"></asp:DropDownList>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
