<%@ Page language="c#" Codebehind="EDR439.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR439" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR439 時效統計月報案件清單列印作業</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDR439" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute;VISIBILITY: hidden" id="hiddenDiv">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="5.5em"></asp:listbox>
				<asp:label id="H_StaticDate" runat="server"></asp:label>
			</DIV>
			<div id="BaseTable" class="DivBaseTable">
				<div id="MainTable" class="DivTable">
					<div class="dTR">
						<div class="dTDTitle">
							<asp:label id="Label2" runat="server" CssClass="RequireField">列印日期：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txDateS" tabIndex="0" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:textbox>
						</div>					
						<div class="dTD">
							<asp:label id="Label5" tabIndex="0" runat="server" CssClass="RequireFieldNumeric">&nbsp;－&nbsp;</asp:label>
						</div>				
						<div class="dTD">
							<asp:textbox id="txDateE" tabIndex="0" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle">
							<asp:label id="Label1" runat="server" CssClass="RequireField">公文性質：</asp:label>
						</div>
						<div class="dTD">
							<asp:dropdownlist id="dlProperty" tabIndex="0" runat="server" CssClass="RequireField">
								<asp:ListItem Value="1">一般公文</asp:ListItem>
								<asp:ListItem Value="5">人民申請</asp:ListItem>
							</asp:dropdownlist>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle">
							<asp:label id="Label3" runat="server" CssClass="RequireField">公文狀態：</asp:label>
						</div>
						<div class="dTD">
							<asp:dropdownlist id="dlState" tabIndex="0" runat="server" CssClass="RequireField">
								<asp:ListItem Value="3">逾限辦結</asp:ListItem>
								<asp:ListItem Value="6">逾期待辦</asp:ListItem>
							</asp:dropdownlist>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle">
							<asp:label id="lbStatic" runat="server"></asp:label>
						</div>
					</div>
				</div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btStatic" runat="server" Text="統計" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
