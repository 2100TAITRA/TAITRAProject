<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDT520.aspx.cs" AutoEventWireup="false" Inherits="ED5.EDT520" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDT520 非發文郵件登錄作業</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
		<meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
		<meta name="format - detection" content="telephone = no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDT520" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox><asp:textbox id="H_Dept" runat="server" CssClass="hide"></asp:textbox><asp:textbox id="H_Dept_Value" runat="server" CssClass="hide"></asp:textbox><asp:textbox id="H_Sect" runat="server" CssClass="hide"></asp:textbox><asp:textbox id="H_Sect_Value" runat="server" CssClass="hide"></asp:textbox><asp:textbox id="H_dlSect_Value" runat="server" CssClass="hide"></asp:textbox><asp:dropdownlist id="H_dlSubclassNo" runat="server"></asp:dropdownlist><asp:textbox id="H_SubNo" runat="server"></asp:textbox><asp:textbox id="H_OuIdInit" runat="server"></asp:textbox></DIV>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label1" runat="server" CssClass="KeyField" >識別碼：</asp:label></DIV>
						<DIV class="dTD" style="width: 19em; "><asp:textbox style="Z-INDEX: 0" id="txSeqNo" tabIndex="0" runat="server" Width="4.5em" CssClass="KeyFieldNumeric" MaxLength="8"></asp:textbox></DIV>
						<DIV class="dTDTitle" style="width: 6em; "><asp:label style="Z-INDEX: 0" id="Label10" runat="server" CssClass="RequireField">公文文號：</asp:label></DIV>
						<DIV class="dTD" style="width: 8em; "><asp:textbox style="Z-INDEX: 0" id="txDocNo" tabIndex="0" runat="server" Width="5.5em" CssClass="RequireFieldNumeric" MaxLength="10"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label2" runat="server" CssClass="RequireField" >寄送單位：</asp:label></DIV>
						<DIV class="dTD" style="width: 19em; "><cc1:combobox style="Z-INDEX: 0" id="dlDept" runat="server" Width="7em" CssClass="comboBox RequireField"></cc1:combobox><cc1:combobox style="Z-INDEX: 0" id="dlSect" runat="server" Width="7em" CssClass="comboBox RequireField"></cc1:combobox></DIV>
						<DIV class="dTDTitle" style="width: 6em; "><asp:label style="Z-INDEX: 0" id="Label5" runat="server" CssClass="RequireField">郵寄日期：</asp:label></DIV>
						<DIV class="dTD" style="width: 9em; "><asp:textbox style="Z-INDEX: 0" id="txSendDate" tabIndex="0" runat="server" Width="4em" CssClass="RequireFieldNumeric DatePicker" MaxLength="7"></asp:textbox><asp:textbox style="Z-INDEX: 0" id="txSendTime" tabIndex="0" runat="server" Width="2.5em" CssClass="RequireFieldNumeric" MaxLength="4"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label3" runat="server" CssClass="RequireField" >內容物：</asp:label></DIV>
						<DIV class="dTD" style="width: 34em; "><asp:textbox style="Z-INDEX: 0" id="txContent" tabIndex="0" runat="server" Width="33em" CssClass="RequireField" MaxLength="40"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label id="Label4" runat="server" CssClass="RequireField" >受文者：</asp:label></DIV>
						<DIV class="dTD" style="width: 34em; "><asp:textbox style="Z-INDEX: 0" id="txOrgId" tabIndex="0" runat="server" Width="6.5em" MaxLength="17"></asp:textbox><asp:imagebutton style="Z-INDEX: 0" id="btOrgHelp" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:imagebutton><asp:textbox style="Z-INDEX: 0" id="txOrgName" tabIndex="0" runat="server" Width="25em" CssClass="RequireField" MaxLength="40"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; ">&nbsp;</DIV>
						<DIV class="dTD" style="width: 34em; "><asp:textbox style="Z-INDEX: 0" id="txCode" tabIndex="0" runat="server" Width="3.5em" CssClass="RequireField" MaxLength="6"></asp:textbox><asp:textbox id="txAdd" runat="server" Width="30em" CssClass="RequireField" MaxLength="60"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label style="Z-INDEX: 0" id="Label6" runat="server" CssClass="RequireField">國別：</asp:label></DIV>
						<DIV class="dTD" style="width: 19em; "><asp:dropdownlist style="Z-INDEX: 0" id="dlCountryType" runat="server" Width="8.5em" CssClass="RequireField">
							<asp:ListItem Value="0">國內</asp:ListItem>
							<asp:ListItem Value="1">國外</asp:ListItem>
						</asp:dropdownlist></DIV>
						<DIV class="dTDTitle" style="width: 6em; "><asp:label style="Z-INDEX: 0" id="Label8" runat="server" CssClass="RequireField">郵寄地區：</asp:label></DIV>
						<DIV class="dTD" style="width: 9em; "><asp:dropdownlist style="Z-INDEX: 0" id="dlRegionNo" runat="server" Width="8.5em" CssClass="RequireField"></asp:dropdownlist></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; "><asp:label style="Z-INDEX: 0" id="Label7" runat="server" CssClass="RequireField">郵寄大類：</asp:label></DIV>
						<DIV class="dTD" style="width: 19em; "><asp:dropdownlist style="Z-INDEX: 0" id="dlClassNo" runat="server" Width="8.5em" CssClass="RequireField"></asp:dropdownlist></DIV>
						<DIV class="dTDTitle" style="width: 6em; "><asp:label style="Z-INDEX: 0" id="Label9" runat="server" CssClass="RequireField">郵寄小類：</asp:label></DIV>
						<DIV class="dTD" style="width: 9em; "><asp:dropdownlist style="Z-INDEX: 0" id="dlSubclassNo" runat="server" Width="8.5em" CssClass="RequireField"></asp:dropdownlist></DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
