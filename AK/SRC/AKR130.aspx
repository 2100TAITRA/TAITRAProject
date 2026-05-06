<%@ Page language="c#" Codebehind="AKR130.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR130" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKR130 待點收清單列印作業</title>
		<meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<meta name="CODE_LANGUAGE" content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body onload="ClientOnLoad()" MS_POSITIONING="GridLayout">
		<form id="AKR130" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<asp:listbox style="Z-INDEX: 102; POSITION: absolute; TOP: 102px; LEFT: 10px" id="lbReturnValue" runat="server" CssClass="hidden"></asp:listbox>
			<DIV id="BaseTable" class="DivBaseTable">
				<DIV id="MainTable"	class="DivTable">
					<DIV class="dTR">
						<DIV style="WIDTH: 6em" class="dTDTitle"><asp:label id="Label2" class="RequireField" tabIndex="-1" runat="server">歸檔日期：</asp:label></DIV>
						<DIV class="dTD">
							<asp:textbox id="txSDate" class="RequireField DatePicker" tabIndex="10" runat="server" Width="4em" MaxLength="7"></asp:textbox>
							<asp:textbox id="txSHour" class="RequireField" tabIndex="15" runat="server" Width="1.5em" MaxLength="2"></asp:textbox>－
							<asp:textbox id="txEDate" class="RequireField DatePicker" tabIndex="20" runat="server" Width="4em" MaxLength="7"></asp:textbox>
							<asp:textbox id="txEHour" class="RequireField" tabIndex="25" runat="server" Width="1.5em" MaxLength="2"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 6em" class="dTDTitle"><asp:label id="Label1" runat="server">歸檔單位：</asp:label></DIV>
						<DIV class="dTD"><cc1:combobox CssClass="comboBox" id="dlOrgno" tabIndex="30" runat="server" Width="10.5em"></cc1:combobox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 6em" class="dTDTitle"><asp:label id="Label3" runat="server">承辦單位：</asp:label></DIV>
						<DIV class="dTD">
							<cc1:combobox CssClass="comboBox" id="dlUnit" tabIndex="35" runat="server" Width="10.5em"></cc1:combobox>
							<cc1:combobox CssClass="comboBox" style="Z-INDEX: 0" id="dlUnit_Sect" tabIndex="35" runat="server" Width="7.5em"></cc1:combobox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 6em" class="dTDTitle"><asp:label id="Label4" runat="server">簽核類型：</asp:label></DIV>
						<DIV class="dTD"><asp:dropdownlist id="ddlSignType" tabIndex="-1" runat="server" Width="5.5em">
								<asp:ListItem></asp:ListItem>
								<asp:ListItem Value="P">紙本簽核</asp:ListItem>
								<asp:ListItem Value="E">線上簽核</asp:ListItem>
							</asp:dropdownlist></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 6em" class="dTDTitle"><asp:label id="Label6" runat="server">庫房別：</asp:label></DIV>
						<DIV class="dTD"><asp:dropdownlist id="dlStoreNo" runat="server"></asp:dropdownlist></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 6em" class="dTDTitle">&nbsp;</DIV>
						<DIV class="dTD"><asp:radiobutton id="rbReportList" runat="server" Text="待點收公文清單" GroupName="rbReport" Checked="True"></asp:radiobutton><br>
							<asp:radiobutton id="rbReportCount" runat="server" Text="待點收公文統計表" GroupName="rbReport"></asp:radiobutton></DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出EXCEL" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator style="Z-INDEX: 104; POSITION: absolute; TOP: 218px; LEFT: 12px" id="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary style="Z-INDEX: 105; POSITION: absolute; TOP: 252px; LEFT: 12px" id="ValidationSummary1"	runat="server" CssClass="hidden"></asp:validationsummary>
			<asp:textbox style="Z-INDEX: 108; POSITION: absolute; TOP: 432px; LEFT: 8px" id="H_Sect_Value" runat="server" CssClass="hidden"></asp:textbox>
			<asp:textbox style="Z-INDEX: 110; POSITION: absolute; TOP: 488px; LEFT: 8px" id="H_dlSect_Value" runat="server" CssClass="hidden"></asp:textbox>
			<asp:textbox style="Z-INDEX: 111; POSITION: absolute; TOP: 360px; LEFT: 8px" id="H_Sect" runat="server"	CssClass="hidden"></asp:textbox>
			<asp:textbox style="Z-INDEX: 111; POSITION: absolute; TOP: 360px; LEFT: 8px" id="H_Dept" runat="server" CssClass="hidden"></asp:textbox>
			<asp:textbox style="Z-INDEX: 111; POSITION: absolute; TOP: 360px; LEFT: 8px" id="H_Dept_Value" runat="server" CssClass="hidden"></asp:textbox>
		</form>
	</body>
</HTML>
