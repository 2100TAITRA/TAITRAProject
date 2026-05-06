<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EAC206.aspx.cs" AutoEventWireup="false" Inherits="EA22.EAC206" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAC206 案情摘要明細維護作業</TITLE>
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
		<FORM id="EAC206" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV id="GridTable" class="DivTable">
					<DIV class="dTR">
						<DIV class="dTD">
							<asp:label id="Label3" runat="server">預設捲動區筆數：</asp:label>
							<asp:textbox id="txRecordCount" tabIndex="0" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="20"></asp:textbox>
							<asp:button id="btSetGrid" runat="server" Text="變更"></asp:button>
							<asp:textbox id="H_txCaseKey" runat="server" Width="6em" CssClass="hide"></asp:textbox>
						</DIV>
					</DIV>
					<DIV style="HEIGHT: 24.5em">
						<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="5">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="案情摘要">
									<ItemTemplate>
										<asp:textbox id="txSummary" tabIndex="0" runat="server" Width="46.5em" 
											 height="7em" TextMode="MultiLine" onkeypress="fnHandleTextarea();"
											onpaste="fnCheckTextarea()"></asp:textbox>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClose" runat="server" Text="離開(X)" accesskey="X" title="關閉(Alt+X)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
