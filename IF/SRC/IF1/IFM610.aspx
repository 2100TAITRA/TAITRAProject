<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="IFM610.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM610" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<TITLE>IFM610 桌面捷徑維護程式</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="IFM610" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../IFLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<div class="DivBaseTable">
				<div class="DivTable">
					<div class="dTR">
						<asp:Panel ID="tbSelect" CssClass="DgSelectToolBar" runat="server">
							<asp:Button ID="btUp" runat="server" Text="上移"/>
							<asp:Button ID="btDown" runat="server" Text="下移"/>
						</asp:Panel>
					</div>
					<div class="dTR">
						<div class="dTD">
							<div class="GridDiv" style="HEIGHT: 360px;">
								<asp:datagrid id="dg1" runat="server" PageSize="6" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="4">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSeq" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="選">
											<ItemTemplate>
												<asp:CheckBox id="cbSelect" runat="server"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="捷徑名稱">
											<ItemTemplate>
												<asp:HyperLink id="hlKey" runat="server"></asp:HyperLink>
												<asp:Textbox id="h_KeyName" runat="server" CssClass="hide"></asp:Textbox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="程式來源">
											<ItemTemplate>
												<asp:Label id="lbType" runat="server" Width="6em"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="程式路徑">
											<ItemTemplate>
												<asp:Label id="lbPath" runat="server" Width="14.5em"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn>
											<ItemTemplate>
												<asp:HyperLink id="hlOpenUrl" runat="server" Width="6em"></asp:HyperLink>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
				<asp:Button ID="btOpen" runat="server" Text="新增" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="排序更新" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
