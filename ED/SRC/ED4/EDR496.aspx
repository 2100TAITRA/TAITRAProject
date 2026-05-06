<%@ Page language="c#" Codebehind="EDR496.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR496" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR496 逾期公文展期與未展期明細列印作業</TITLE>
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
		<FORM id="EDR496" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 105px; POSITION: absolute; TOP: 0px; HEIGHT: 232px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:textbox id="H_MaxYearMonth" runat="server" Width="16px"></asp:textbox>
				<asp:dropdownlist id="H_ddlDeptSort" runat="server"></asp:dropdownlist>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label1" runat="server" CssClass="RequireField">列印月份：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="tbSMonth" tabIndex="0" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:textbox>
							<asp:label id="Label5" runat="server">－</asp:label>
							<asp:textbox id="tbEMonth" tabIndex="0" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label2" runat="server">承辦單位：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:dropdownlist id="ddlDept" runat="server" Width="11em"></asp:dropdownlist>
							</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label3" runat="server">排序：</asp:label>
						</DIV>
						<DIV class="dTD">								
							<DIV class="dTR">
								<asp:radiobuttonlist id="rbSorting" runat="server" Width="16.5em" RepeatDirection="Horizontal">
									<asp:ListItem Value="0">承辦人</asp:ListItem>
									<asp:ListItem Value="1">公文文號</asp:ListItem>
									<asp:ListItem Value="2">展期次數</asp:ListItem>
								</asp:radiobuttonlist>
							</DIV>
							<DIV class="dTR">
								<asp:checkbox id="cbDept" runat="server" Text="依承辦單位換頁"></asp:checkbox>
							</DIV>
							<DIV class="dTR">
								<asp:label id="Label4" runat="server">目前統計最大年月：</asp:label>
								<asp:label id="lbMaxYearMonth" runat="server"></asp:label>
							</DIV>	
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
