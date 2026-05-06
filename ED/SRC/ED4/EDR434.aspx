<%@ Page language="c#" Codebehind="EDR434.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR434" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR434 瞶穦絑キАぱ计睲虫穨</TITLE>
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
		<FORM id="EDR434" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px" id="hiddenDiv">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV id="BaseTable" class="DivBaseTable">
				<DIV id="MainTable" class="DivTable">
					<DIV class="dTR">
						<DIV style="width:5.5em" class="dTDTitle"><asp:label id="Label2" runat="server" CssClass="RequireField">る</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txMonth" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="width:5.5em" class="dTDTitle"><asp:label id="Label3" runat="server">┯快虫</asp:label></DIV>
						<DIV style="width:13.5em" class="dTD">
							<cc1:combobox style="Z-INDEX: 0" id="dlDept" runat="server" CssClass="comboBox"></cc1:combobox>
							<asp:textbox id="H_Dept_Value" runat="server" CssClass="hide"></asp:textbox>
							<asp:textbox id="H_Dept" runat="server" CssClass="hide"></asp:textbox>
						</DIV>
						<DIV class="dTDTitle" style="width:8.5em"><asp:label id="Label1" runat="server">┯快</asp:label></DIV>
						<DIV class="dTD">
							<cc1:combobox style="Z-INDEX: 0" id="dlUser" runat="server" Width="6em" CssClass="comboBox"></cc1:combobox>
							<asp:textbox id="H_User_Value" runat="server" CssClass="hide"></asp:textbox>
							<asp:textbox id="H_User" runat="server" CssClass="hide"></asp:textbox>
							<asp:textbox id="H_dlUser_Value" runat="server" CssClass="hide"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="width:5.5em" class="dTDTitle"><asp:label id="Label4" runat="server">ず甧</asp:label></DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbType1" runat="server" Text="ㄌ┯快跋だ传" GroupName="Type"></asp:radiobutton><BR>
							<asp:radiobutton id="rbType2" runat="server" Text="ㄌ┯快跋だぃ传" GroupName="Type"></asp:radiobutton><BR>
							<asp:radiobutton id="rbType3" runat="server" Text="诀闽瞶穦絑キАぱ计参璸" GroupName="Type"></asp:radiobutton>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="箇凝" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPrint" runat="server" Text="" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
