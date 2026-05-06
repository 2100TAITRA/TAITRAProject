<%@ Page language="c#" Codebehind="EDR4021_VAC.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR4021_VAC" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR4021_VAC 案件類別清單查詢作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="EDR4021_VAC" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv">
				<asp:customvalidator id="Customvalidator1" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="Validationsummary2" runat="server"></asp:validationsummary>
				<asp:ListBox ID="ListBox1" runat="server" Width="80px"></asp:ListBox>
				<asp:textbox id="H_Dept" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_Dept_Value" runat="server" CssClass="hide"></asp:textbox>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" ></asp:Button>
				<asp:Button ID="btODS" runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" ></asp:Button>
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 101; POSITION: absolute; TOP: 217px; LEFT: 12px"
				runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 102; POSITION: absolute; TOP: 251px; LEFT: 12px"
				runat="server" CssClass="hidden"></asp:validationsummary><br>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle">
							<asp:label id="lbOrg" runat="server" CssClass="hide" Width="114px" ForeColor="Red">所屬機關：</asp:label></div>
						<div class="dTD">
							<asp:dropdownlist id="dlOrg" runat="server" CssClass="hide" AutoPostBack="True"></asp:dropdownlist></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="lbDate" runat="server" CssClass="RequireField">收(創)文日期:：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 16em">
							<asp:textbox id="txRcvDateStart" runat="server" Width="4em" CssClass="DatePicker RequireField" MaxLength="7"></asp:textbox>
							~
							<asp:textbox id="txRcvDateEnd" runat="server" Width="4em" CssClass="DatePicker RequireField" MaxLength="7"></asp:textbox>
						</div>
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="lbDept" runat="server">承辦單位：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 16em">
							<asp:dropdownlist id="dlDept" runat="server"></asp:dropdownlist>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="lbPty" runat="server">公文性質：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 16em">
							<asp:dropdownlist id="ddlPty" TabIndex="80" runat="server" Width="9.5em"></asp:dropdownlist>
						</div>
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="lbBSType" runat="server">業務類別：</asp:label>
						</div>
						<div class="dTD">
							<asp:dropdownlist id="ddlBSType" TabIndex="80" runat="server" Width="9.5em"></asp:dropdownlist>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="lbProType" runat="server">專案別：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 16em">
							<asp:dropdownlist id="ddlProType" runat="server"></asp:dropdownlist>
						</div>
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="lbRCType" runat="server">收創別：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 16em">
							<asp:dropdownlist id="ddlRCType" runat="server"></asp:dropdownlist>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="lbCEType" runat="server">結案別：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 16em">
							<asp:dropdownlist id="ddlCEType" runat="server"></asp:dropdownlist>
						</div>
						<div class="dTDTitle" style="WIDTH: 8em">
						</div>
						<div class="dTD" style="WIDTH: 16em">
							<asp:DropDownList ID="ddlHidType" runat="server" style="display:none;" CssClass="hide"></asp:DropDownList>
							<asp:textbox ID="txBSTypeText" runat="server" style="display:none;" CssClass="hide"></asp:textbox>
						</div>
					</div>
				</DIV>
			</DIV>
		</form>
	</body>
</HTML>
