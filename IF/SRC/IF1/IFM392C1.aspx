<%@ Page language="c#" Codebehind="IFM392C1.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM392C1" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>IFM392C1 可用文別設定子視窗</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="/STDN/LIB/SYS.css">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="IFM392C1" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../IFLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px" id="hiddenDiv">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV id="BaseTable" class="DivBaseTable">
				<DIV id="MainTable" class="DivTable">
				</DIV>
				<DIV class="DivTable">
                <asp:Panel ID="tbSelect" CssClass="DgSelectToolBar" runat="server">
					<asp:Button ID="btSelectAll" runat="server" Text="全選" />
					<asp:Button ID="btSelectInverse" runat="server" Text="反選" />
					<asp:Button ID="btSelectClear" runat="server" Text="清除" />
				</asp:Panel>
					<DIV class="GridDiv" style="HEIGHT: 14.5em">
						<asp:datagrid id="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" CellPadding="4" GridLines="Vertical">
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
								<asp:TemplateColumn HeaderText="文別名稱">
									<ItemTemplate>
										<asp:Label Style="word-break:break-all" id="lbName" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
