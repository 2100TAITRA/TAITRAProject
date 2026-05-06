<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="IFM915.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM915" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<TITLE>IFM915 機關憑證鏈結作業</TITLE>
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
		<span id="httpObject" ></span>
		<FORM id="IFM915" onkeyup="jf_CheckFull();" method="post" runat="server">
			<input type="hidden" name="nLinkCert"> 
			<!--Template V3 Generated WebForm-->
			<!--#include file="../IFLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server"></asp:listbox></DIV>
			<div class="DivBaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle"><asp:label id="Label2" runat="server" CssClass="RequireField">機關：</asp:label></div>
						<div class="dTD"><asp:dropdownlist id="ddlOrg" runat="server" CssClass="RequireField"></asp:dropdownlist></div>
					</div>
				</div>
				<div class="DivTable">
					<div class="dTR">
						<div class="dTD">
							<div class="GridDiv" style="HEIGHT: 250px;">
								<asp:datagrid id="dg1" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="機關">
											<ItemTemplate>
												<asp:Label id="lbOrg" runat="server"></asp:Label>
												<asp:TextBox id="txOrgCode" runat="server" CssClass="hide"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="憑證代碼">
											<ItemTemplate>
												<asp:Label id="lbCer" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn>
											<ItemTemplate>
												<asp:Button id="btCancel" runat="server" Text="取消鏈結"></asp:Button>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
							<asp:textbox id="txissuer" runat="server" CssClass="hide"></asp:textbox><asp:textbox id="txOrg" runat="server" CssClass="hide"></asp:textbox>
						</div>
					</div>
				</div>
			</div>
			<asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
				<asp:Button ID="btSearch" runat="server" Text="鏈結" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
