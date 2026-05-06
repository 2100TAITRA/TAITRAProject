<%@ Page language="c#" Codebehind="EDM112C1.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDM112C1" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDM112C1</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY>
		<FORM id="EDM112C1" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<div id="BaseTable" class="DivBaseTable">
                <div id="MainTable" class="DivTable">
					<div class="dTR">
						<div class="dTDTitle" style="width: 7.5em">
							<asp:label id="Label1" runat="server" CssClass="KeyField" >流程資訊代碼：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txFlowNo" tabIndex="0" runat="server" Width="1.5em" CssClass="KeyUpperField" MaxLength="2"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 7.5em">
							<asp:label id="Label2" runat="server" CssClass="RequireField" >流程資訊說明：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txFlowDesc" tabIndex="0" runat="server" Width="20.5em" CssClass="RequireField" MaxLength="100"></asp:textbox>
						</div>
					</div>
				</div>
                <div id="GridTable" class="DivTable">
                    <div class="GridDiv">
						<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30" Width="29.5em">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server" ></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="流程資訊代碼">
									<ItemTemplate>
										<asp:HyperLink id="hlFlowNo" tabIndex="0" runat="server" ></asp:HyperLink>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="流程資訊名稱">
									<ItemTemplate>
										<asp:Label id="lbFlowName" runat="server" ></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</div>
				</div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
                <asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            </asp:Panel>
		</FORM>
	</BODY>
</HTML>
