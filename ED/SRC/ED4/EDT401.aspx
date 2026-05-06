<%@ Page language="c#" Codebehind="EDT401.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDT401" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDT401 公文時效處理檢查表列印作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDT401" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label1" runat="server">機　　關：</asp:label></DIV>
						<DIV class="dTD">
								<asp:dropdownlist id="dlOrg" runat="server" AutoPostBack="True"></asp:dropdownlist></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label2" runat="server">承辦單位：</asp:label></DIV>
						<DIV class="dTD">
							<asp:dropdownlist id="dlDept" runat="server"></asp:dropdownlist></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label3" runat="server">抽調月份：</asp:label></DIV>
						<DIV class="dTD">
							<asp:textbox id="txSelectDateS" tabIndex="0" runat="server" Width="3em" MaxLength="5"></asp:textbox>－
								<asp:textbox id="txSelectDateE" tabIndex="0" runat="server" Width="3em" MaxLength="5"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label4" runat="server">檢查日期：</asp:label></DIV>
						<DIV class="dTD">
							<asp:textbox id="txCheckDateS" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>－
								<asp:textbox id="txCheckDateE" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox></DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable" id="Table1">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label7" runat="server">公文文號１：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 6em">
							<asp:textbox id="txDocNo1" tabIndex="0" runat="server" Width="5.5em" class="InputFieldNumeric" MaxLength="10"></asp:textbox></DIV>
						<DIV class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label5" runat="server">公文文號２：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 6em">
								<asp:textbox id="txDocNo2" tabIndex="0" runat="server" Width="5.5em" class="InputFieldNumeric" MaxLength="10"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label8" runat="server">公文文號３：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 6em">
							<asp:textbox id="txDocNo3" tabIndex="0" runat="server" Width="5.5em" class="InputFieldNumeric" MaxLength="10"></asp:textbox></DIV>
						<DIV class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label9" runat="server">公文文號４：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 6em">
							<asp:textbox id="txDocNo4" tabIndex="0" runat="server" Width="5.5em" class="InputFieldNumeric" MaxLength="10"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label6" runat="server">公文文號５：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 6em">
							<asp:textbox id="txDocNo5" tabIndex="0" runat="server" Width="5.5em" class="InputFieldNumeric" MaxLength="10"></asp:textbox></DIV>
						<DIV class="dTDTitle" style="WIDTH: 6.5em">
								<asp:label id="Label10" runat="server">公文文號６：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 6em">
							<asp:textbox id="txDocNo6" tabIndex="0" runat="server" Width="5.5em" class="InputFieldNumeric" MaxLength="10"></asp:textbox></DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
