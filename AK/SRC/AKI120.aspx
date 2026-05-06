<%@ Page language="c#" Codebehind="AKI120.aspx.cs" AutoEventWireup="false" Inherits="AK.AKI120" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKI120 公文承辦單位人員異動查詢作業</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body class="" MS_POSITIONING="GridLayout">
		<form id="AKI120" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label1" runat="server" CssClass="RequireField">異動日期：</asp:label></DIV>
						<DIV class="dTD">
							<asp:textbox id="txEntryDateS" tabIndex="10" runat="server" CssClass="DatePicker" Width="4em" MaxLength="7"></asp:textbox>－
							<asp:textbox id="txEntryDateE" tabIndex="20" runat="server" CssClass="DatePicker" Width="4em" MaxLength="7"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label4" runat="server">承辦單位：</asp:label>
						</DIV>
						<DIV class="dTD">
							<cc1:ComboBox CssClass="comboBox" id="dlDEPT" tabIndex="30" runat="server" Width="7.5em"></cc1:ComboBox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em"><asp:label id="Label2" runat="server"> 異動項目：</asp:label></DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rb1" runat="server" Text="全部" GroupName="grp1" tabIndex="40"></asp:radiobutton>
							<asp:radiobutton id="rb2" runat="server" Text="承辦單位" GroupName="grp1"></asp:radiobutton>
							<asp:radiobutton id="rb3" runat="server" Text="承辦人" GroupName="grp1"></asp:radiobutton>
						</DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable">
					<DIV style="HEIGHT: 20em" class="GridDiv">
						<asp:datagrid id="dg1" runat="server" GridLines="Vertical" CellPadding="4" PageSize="50" AutoGenerateColumns="False">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSeq" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="異動日期">
									<ItemTemplate>
										<asp:Label id="lbEntryDate" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="原承辦單位">
									<ItemTemplate>
										<asp:Label id="lbOldDept" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="原承辦人">
									<ItemTemplate>
										<asp:Label id="lbOldEmpName" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="異動方式">
									<ItemTemplate>
										<asp:Label id="lbEntryMode" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="新承辦單位">
									<ItemTemplate>
										<asp:Label id="lbDept" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="新承辦人">
									<ItemTemplate>
										<asp:Label id="lbEmpName" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary></form>
	</body>
</HTML>
