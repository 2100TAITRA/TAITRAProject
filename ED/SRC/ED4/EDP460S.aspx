<%@ Page language="c#" Codebehind="EDP460S.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDP460S" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDP460S 母文號文號查詢子視窗</TITLE>
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
		<FORM id="EDP460S" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="BEHAVIOR: url(../../../STD/LIB/webservice.htc)" id="service"></DIV>
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px" id="hiddenDiv">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<div id="BaseTable" class="DivBaseTable">
				<div style="VISIBILITY: hidden" id="MainTable" class="DivTable">
					<div class="dTR">
						<div class="dTD">
							<asp:label id="Label1" runat="server" Width="16em">請點選欲進行彙併辦之公文文號</asp:label>
						</div>
					</div>
				</div>
				<div class="DivTable" id="GridTable">
					<DIV style="HEIGHT: 16em" class="GridDiv">
						<asp:datagrid id="dg1" runat="server" PageSize="1" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="公文文號">
									<ItemTemplate>
										<asp:HyperLink id="hlDOC_NO" tabIndex="0" runat="server"></asp:HyperLink>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="收(創)文日">
									<ItemTemplate>
										<asp:Label id="lbRCV_DATE" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="承辦單位">
									<ItemTemplate>
										<asp:Label id="lbDEPT" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="承辦人">
									<ItemTemplate>
										<asp:Label id="lbUSER" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="主旨">
									<ItemTemplate>
										<asp:Label id="lbSUBJECT" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</div>
			</div>
			<DIV style="VISIBILITY: hidden">
				<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
					<asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
					<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
					<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				</asp:Panel>
			</DIV>
		</FORM>
	</BODY>
</HTML>
