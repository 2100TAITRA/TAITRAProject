<%@ Page language="c#" Codebehind="AKM339.aspx.cs" AutoEventWireup="false" Inherits="AK.AKM339" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKM339 ªþµù¶µºûÅ@</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio 8.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout" class="hidden">
		<form id="AKM339" method="post" runat="server" onkeyup="jf_CheckFull();">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable">
					<DIV class="GridDiv">
						<asp:datagrid id="dg1" runat="server" CellPadding="4" GridLines="Vertical" AutoGenerateColumns="False">
							<Columns>
								<asp:TemplateColumn HeaderText="§Ç">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="ªþµù¶µ">
									<ItemTemplate>
										<cc1:ComboBox id="dlREM" runat="server" CssClass="comboBox" width="8em"></cc1:ComboBox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="ªþµù¤º®e">
									<ItemTemplate>
										<asp:TextBox id="tbDESC" runat="server" Width="23.5em" MaxLength="100"></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
					<DIV style="Z-INDEX: 103; LEFT: 168px; OVERFLOW: auto; WIDTH: 506px; TOP: 202px; HEIGHT: 195px" class="hidden">
						<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
						<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
						<asp:listbox id="lbReturnValue" runat="server"></asp:listbox>
						<asp:TextBox id="tbInpFileDate" runat="server" Width="1.5em"></asp:TextBox>
						<asp:TextBox id="tbDocNo" runat="server" Width="1.5em"></asp:TextBox>
						<asp:TextBox id="tbOrgNo" runat="server" Width="1.5em"></asp:TextBox>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSave" runat="server" Text="Àx¦s" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</form>
	</body>
</HTML>
