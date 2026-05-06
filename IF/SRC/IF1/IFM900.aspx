<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="IFM900.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM900" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<TITLE>IFM900 個人憑證管理</TITLE>
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
		<span id="httpObject" ></span>
		<FORM id="IFM900" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../IFLIB/GenericBanner.htm"-->
			<input type="hidden" name="nLinkCert" id="nLinkCert">
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server"></asp:listbox>
			</DIV>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7.5em"><asp:label id="Label21" runat="server" class="KeyField">說　　明：</asp:label></DIV>
						<DIV class="dTD KeyField">1. 在插入智慧卡或磁片後，再按下"鏈結"鍵。<br/>2. 新增憑證後請重新登入公文系統。</DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable">
					<DIV class="dTR">
						<DIV class="dTD">
							<DIV class="GridDiv" style="HEIGHT: 218px;">
								<asp:datagrid id="dg1" runat="server" AutoGenerateColumns="False" CellPadding="4" GridLines="Vertical" PageSize="10">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSeq" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="持有人">
											<ItemTemplate>
												<asp:Label id="lbSubject" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="發行機構">
											<ItemTemplate>
												<asp:Label id="lbOrg" runat="server">lbOrg</asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="異動">
											<ItemTemplate>
												<asp:Button id="btCancelLink" runat="server" Width="6em" Text="取消鏈結"></asp:Button>
												<asp:Label id="lbCancelName" runat="server" CssClass="hide"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
									<PagerStyle HorizontalAlign="Right" ForeColor="Black" BackColor="#F7F7DE" Mode="NumericPages"></PagerStyle>
								</asp:datagrid>
							</DIV>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
				<asp:Button ID="btLink" runat="server" Text="鏈結" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
