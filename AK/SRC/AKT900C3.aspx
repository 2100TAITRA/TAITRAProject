<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="AKT900C3.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT900C3" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKT900C3 鑑定報告查詢子視窗</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio 8.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="AKT900C3" method="post" runat="server" onkeyup="jf_CheckFull();">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">
								<asp:Label id="Label1" runat="server" >報告編號：</asp:Label></DIV>
						<DIV class="dTD">
								<asp:TextBox id="txSNo" runat="server" CssClass="InputFieldNumeirc" Width="4em" tabIndex="10" MaxLength="7"></asp:TextBox>
								<asp:Label id="Label3" runat="server" >－</asp:Label>
								<asp:TextBox id="txENo" runat="server" CssClass="InputFieldNumeirc" Width="4em" tabIndex="15" MaxLength="7"></asp:TextBox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">
								<asp:Label id="Label2" runat="server" >登入日期：</asp:Label></DIV>
						<DIV class="dTD">
								<asp:TextBox id="txSDate" runat="server" CssClass="DatePicker" Width="4em" tabIndex="20" MaxLength="7"></asp:TextBox>
								<asp:Label id="Label4" runat="server" >－</asp:Label>
								<asp:TextBox id="txEDate" runat="server" CssClass="DatePicker" Width="4em" tabIndex="25" MaxLength="7"></asp:TextBox></DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable">
					<DIV class="GridDiv" style="HEIGHT: 15.5em">
						<asp:datagrid id="dg1" runat="server" Width="38.5em" GridLines="Vertical" CellPadding="2" PageSize="50" AutoGenerateColumns="False">
							<Columns>
								<asp:TemplateColumn HeaderText="報告編號">
									<ItemTemplate>
										<asp:HyperLink id="hlNo" runat="server"></asp:HyperLink>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="登入日期">
									<ItemTemplate>
										<asp:Label id="lbDate" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="檔號範圍">
									<ItemTemplate>
										<asp:Label id="lbFileNo" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
		<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary></form>
	</body>
</HTML>
