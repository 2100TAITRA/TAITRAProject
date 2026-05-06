<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDR444_VAC.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR444_VAC" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR444_VAC 承辦公文會辦案件明細表作業</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDR444" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:ListBox ID="ListBox1" runat="server" Width="80px"></asp:ListBox>
				<asp:textbox id="H_Dept" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_Dept_Value" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_User" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_User_Value" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_dlUser_Value" runat="server" CssClass="hide"></asp:textbox>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<DIV id="BaseTable" class="DivBaseTable">
				<DIV id="MainTable" class="DivTable">
					<div class="dTR">
						<div class="dTDTitle" style="width: 6em">
							<asp:Label ID="lbDate" runat="server" CssClass="RequireField">簽收日期：</asp:Label>
						</div>
						<div class="dTD" style="width: 15em">
							<asp:TextBox ID="txCoRcvDateS" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>～
							<asp:TextBox ID="txCoRcvDateE" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
						</div>
						<div class="dTDTitle" style="WIDTH: 6em;">
							<asp:label id="lbDept" runat="server"  EnableViewState="False">承辦單位：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 10em;">
							<cc1:combobox id="dlDept" runat="server" Width="8em" CssClass="comboBox"></cc1:combobox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em;">
							<asp:label id="lbCoDept" runat="server"  EnableViewState="False">會辦單位：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 15em;">
							<cc1:combobox id="dlCoDept" runat="server" Width="8em" CssClass="comboBox"></cc1:combobox>
						</div>
						<div class="dTDTitle" style="WIDTH: 6em;">
							<asp:label id="lbUserName" runat="server"  EnableViewState="False">會辦人：</asp:label>
						</div>
						<div class="dTD" style="width: 15em">
							<cc1:combobox id="dlUser" runat="server" Width="6em" CssClass="comboBox"></cc1:combobox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="lbMainCloseStatus" runat="server" >逾期別：</asp:label>
						</div>
						<div class="dTD" style="width: 15em">
							<asp:dropdownlist id="dlOverStatus" runat="server" Width="7em"></asp:dropdownlist>
						</div>
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="lbOverdue" runat="server" >逾期天數：</asp:label>
						</div>
						<div class="dTD" style="width: 15em">
							<asp:dropdownlist id="dlOverdue" runat="server" Width="7em"></asp:dropdownlist>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="lbCoCloseStatus" runat="server" >完成別：</asp:label>
						</div>
						<div class="dTD" style="width: 15em">
							<asp:dropdownlist id="dlCoCloseStatus" runat="server" Width="7em"></asp:dropdownlist>
						</div>
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label1" runat="server" >辦理天數：</asp:label>
						</div>
						<div class="dTD" style="width: 15em">
							<asp:dropdownlist id="dlUDIssue" runat="server" Width="7em"></asp:dropdownlist>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="lbCombType" runat="server" >併文別：</asp:label>
						</div>
						<div class="dTD" style="width: 15em">
							<asp:dropdownlist id="dlCombType" runat="server" Width="7em"></asp:dropdownlist>
						</div>
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label2" runat="server" >辦畢方式：</asp:label>
						</div>
						<div class="dTD" style="width: 15em">
							<asp:dropdownlist id="dlCloseType" runat="server" Width="7em"></asp:dropdownlist>
						</div>
					</div>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出EXCEL" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btODS" runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:textbox style="Z-INDEX: 102; POSITION: absolute; TOP: 368px; LEFT: 488px" id="hMaxMonth" runat="server" CssClass="hide"></asp:textbox>
			<asp:dropdownlist style="Z-INDEX: 103; POSITION: absolute; TOP: 384px; LEFT: 616px" id="dlOuId" runat="server" CssClass="hide"></asp:dropdownlist>
		</FORM>
	</BODY>
</HTML>
