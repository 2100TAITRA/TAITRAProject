
<%@ Page language="c#" Codebehind="EAC203.aspx.cs" AutoEventWireup="false" Inherits="EA22.EAC203" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAC203 主題項維護視窗</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EAC203" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericChild.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:TextBox id="H_CaseKey" tabIndex="-1" runat="server" Width="20px"></asp:TextBox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="GridTable">
					<DIV style="HEIGHT: 18.5em" class="GridDiv">
						<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="類別">
									<ItemTemplate>
										<asp:DropDownList id="dlThemeType" runat="server"></asp:DropDownList>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="主題內容">
									<ItemTemplate>
										<asp:TextBox id="txTheme" runat="server" Width="24.5em" MaxLength="50"></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExit" runat="server" Text="關閉(X)" accesskey="X" title="關閉(Alt+X)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
