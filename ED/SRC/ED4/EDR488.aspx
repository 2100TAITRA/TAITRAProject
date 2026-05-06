<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDR488.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR488" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR488 線上簽核件數明細列印作業</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDR488" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px" id="hiddenDiv">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:textbox style="Z-INDEX: 0" id="H_dlDept_Value" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox style="Z-INDEX: 0" id="H_Dept" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox style="Z-INDEX: 0" id="H_Dept_Value" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox style="Z-INDEX: 0" id="H_dlSect_Value" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox style="Z-INDEX: 0" id="H_Sect" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox style="Z-INDEX: 0" id="H_Sect_Value" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox style="Z-INDEX: 0" id="H_dlUser_Value" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox style="Z-INDEX: 0" id="H_User" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox style="Z-INDEX: 0" id="H_User_Value" runat="server" CssClass="hide"></asp:textbox>
			</DIV>
			<DIV id="BaseTable" class="DivBaseTable">
				<DIV id="MainTable" class="DivTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width : 5.5em">
							<asp:label id="Label1" runat="server" CssClass="RequireField">列印月份：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txMonth" tabIndex="0" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:textbox>－
							<asp:textbox id="txMonthEnd" tabIndex="0" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width : 5.5em">
							<asp:label id="Label2" runat="server">公文性質：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:dropdownlist id="dlProperty" runat="server" Width="10.5em"></asp:dropdownlist>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width : 5.5em">
							<asp:label id="Label3" runat="server">承辦單位：</asp:label>
						</DIV>
						<DIV class="dTD">	
							<cc1:combobox style="Z-INDEX: 0" id="dlDept" tabIndex="40" runat="server" Width="9.5em" CssClass="comboBox"></cc1:combobox>&nbsp;&nbsp;
							<cc1:combobox style="Z-INDEX: 0" id="dlSect" tabIndex="40" runat="server" Width="9.5em" CssClass="comboBox"></cc1:combobox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width : 5.5em">
							<asp:label id="Label4" runat="server">承辦人：</asp:label>
						</DIV>
						<DIV class="dTD">
							<cc1:combobox style="Z-INDEX: 0" id="dlUser" tabIndex="40" runat="server" Width="9.5em" CssClass="comboBox"></cc1:combobox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width : 5.5em">
							<asp:label style="Z-INDEX: 0" id="Label5" runat="server">簽核類型：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbType1" runat="server" Checked="True" Text="線上" GroupName="layer"></asp:radiobutton>
							<asp:radiobutton id="rbType2" runat="server" Text="紙本" GroupName="layer"></asp:radiobutton>
							<asp:radiobutton id="rbType3" runat="server" Text="密件" GroupName="layer"></asp:radiobutton>
							<asp:radiobutton id="rbType4" runat="server" Text="全部" GroupName="layer"></asp:radiobutton>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button runat="server" Style="display: none" Text="匯出Excel(O)" Accesskey = "O" Title = "匯出excel(ALT+O)" ID="btExcel" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
