<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="IFR011.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFR011" validateRequest="False" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>IFR011 組織人員之環境設定查詢作業</TITLE>
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
		<FORM id="IFR011" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../IFLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px" id="hiddenDiv">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV id="BaseTable" class="DivBaseTable">
				<DIV id="MainTable" class="DivTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="lbOrg" class="KeyField" runat="server">所屬機關：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:dropdownlist id="dlOrg" runat="server"></asp:dropdownlist>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 5.5em" class="dTDTitle">
							<asp:label id="Label1" runat="server" CssClass="RequireField">查詢對象：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txTarget" tabIndex="-1" runat="server" Width="12.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:textbox>
							<asp:button id="btSelect" runat="server" Text="選擇"></asp:button>
						</DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable">
					<DIV style="HEIGHT: 24.5em" class="GridDiv">
						<asp:datagrid id="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" CellPadding="2" GridLines="Vertical">
							<Columns>
								<asp:BoundColumn DataField="SEQ_NO" HeaderText="序"></asp:BoundColumn>
								<asp:TemplateColumn HeaderText="變數名稱">
									<ItemTemplate>
										<asp:TextBox id=txEnvNm tabIndex=-1 runat="server" CssClass="TextLabel" Text='<%# DataBinder.Eval(Container,"DataItem.ENV_NM") %>'></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="變數值">
									<ItemTemplate>
										<asp:TextBox id=txEnvVal tabIndex=-1 runat="server" CssClass="TextLabel" Text='<%# DataBinder.Eval(Container, "DataItem.ENV_VAL") %>'></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:BoundColumn DataField="ENV_DESC" HeaderText="說明">
								</asp:BoundColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
					<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
					<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
					<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:textbox style="Z-INDEX: 102; POSITION: absolute; TOP: 648px; LEFT: 280px" id="txOrgNo" tabIndex="-1" runat="server" Width="152px" CssClass="hide"></asp:textbox>
			<asp:textbox style="Z-INDEX: 103; POSITION: absolute; TOP: 648px; LEFT: 504px" id="txPath" tabIndex="-1" runat="server" Width="160px" CssClass="hide"></asp:textbox>
		</FORM>
	</BODY>
</HTML>
