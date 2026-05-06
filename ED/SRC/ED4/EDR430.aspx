<%@ Page language="c#" Codebehind="EDR430.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR430" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR430 時效統計公文清單列印作業</TITLE>
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
		<FORM id="EDR430" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; VISIBILITY: hidden">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="5.5em"></asp:listbox>
				<asp:textbox id="H_Dept" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_Dept_Value" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_Sect" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_User" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_Sect_Value" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_User_Value" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_dlSect_Value" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_OD_FLOW_TYPE" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_ddlPrintFLD_Text" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_ddlPrintFLD_Value" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_YearMonth" runat="server" CssClass="hide"></asp:textbox>
				<asp:DropDownList style="Z-INDEX: 0" id="H_PrintFLD" runat="server" CssClass="hide"></asp:DropDownList>
				<asp:DropDownList style="Z-INDEX: 0" id="H_AllDept" runat="server" CssClass="hide"></asp:DropDownList>
			</DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable" >
					<div class="dTR">
						<div class="dTDTitle">
							<asp:label id="Label1" runat="server" CssClass="RequireField">列印月份：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txDateS" tabIndex="0" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:textbox>
							<asp:Label id="Label6" runat="server" CssClass="RequireField">～</asp:Label>
							<asp:textbox style="Z-INDEX: 0" id="txDateE" tabIndex="0" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5" ></asp:textbox>
							<asp:label style="Z-INDEX: 0" id="lbMaxYear" runat="server">目前統計最大年月：888年88月</asp:label>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle">
							<asp:label id="Label2" runat="server" CssClass="RequireField">公文性質：</asp:label>
						</div>
						<div class="dTD">
							<asp:DropDownList id="ddlDocProperty" runat="server" CssClass="RequireField"></asp:DropDownList>
							<asp:CheckBox id="cbFromUpOrg" runat="server" Text="上級機關來文"></asp:CheckBox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle">
							<asp:label id="Label3" runat="server" CssClass="RequireField">列印項目：</asp:label>
						</div>
						<div class="dTD">
							<asp:DropDownList style="Z-INDEX: 0" id="ddlPrintItem" runat="server" CssClass="RequireField"></asp:DropDownList>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle">
								<asp:label style="Z-INDEX: 0" id="Label5" runat="server" CssClass="RequireField">列印欄位：</asp:label>
						</div>
						<div class="dTD">
							<asp:DropDownList style="Z-INDEX: 0" id="ddlPrintFLD" runat="server" CssClass="RequireField" Width="15em"></asp:DropDownList>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle">
							<asp:label id="Label4" runat="server">列印單位：</asp:label>
						</div>
						<div class="dTD" style="width:11.5em">
							<cc1:combobox style="Z-INDEX: 0" id="dlDept" tabIndex="30" runat="server" Width="9em" CssClass="comboBox"></cc1:combobox>
						</div>
						<div class="dTD" style="width:9em">
							<cc1:combobox style="Z-INDEX: 0" id="dlSect" tabIndex="40" runat="server" Width="9em" CssClass="comboBox"></cc1:combobox>
						</div>
					</div>
				</div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
