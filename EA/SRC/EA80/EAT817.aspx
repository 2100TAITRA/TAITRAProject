<%@ Page language="c#" Codebehind="EAT817.aspx.cs" AutoEventWireup="false" Inherits="EA80.EAT817" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAT817 暫借歸還入卷註記列印作業</TITLE>
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
		<FORM id="EAT817" onkeyup="jf_CheckFull();" method="post" runat="server"> <!--Template V3 Generated WebForm--> <!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label1" runat="server">案卷類型：</asp:label></div>
						<div class="dTD">
                            <asp:radiobutton id="rbFileCaseA" runat="server" Text="專案卷" GroupName="rbFileCase"></asp:radiobutton>
							<asp:radiobutton id="rbFileCaseB" runat="server" Text="列管卷" GroupName="rbFileCase"></asp:radiobutton>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6.5em">
							<asp:label id="Label2" runat="server" CssClass="RequireField">歸還日期：</asp:label></div>
						<div class="dTD">
							<asp:textbox id="txRetDateS" runat="server" Width="4em" CssClass="DatePicker RequireField" MaxLength="7"></asp:textbox> - 
							<asp:textbox id="txRetDateE" runat="server" Width="4em" CssClass="DatePicker RequireField" MaxLength="7"></asp:textbox>
						</div>
					</div>
				</div>
				<div class="DivTable">
					<div class="dTR">
						<asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
							<asp:Button ID="btSelectClear" runat="server" Text="清除(C)" AccessKey="C" ToolTip="清除(ALT+C)" />
							<asp:Button ID="btSelectAll" runat="server" Text="全選(A)" AccessKey="A" ToolTip="清除(ALT+A)" />
							<asp:Button ID="btSelectInverse" runat="server" Text="反向(N)" AccessKey="N" ToolTip="清除(ALT+N)"/>
						</asp:Panel>
					</div>
					<div class="dTR">
						<div class="GridDiv">
							<asp:DataGrid ID="dg1" runat="server" PageSize="50" CellPadding="2" GridLines="Vertical" AutoGenerateColumns="False">
								<Columns>
									<asp:TemplateColumn HeaderText="入卷">
										<ItemTemplate>
											<asp:CheckBox ID="cbEntry" runat="server"></asp:CheckBox>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="序">
										<ItemTemplate>
											<asp:Label ID="lbSeq" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="類別">
										<ItemTemplate>
											<asp:Label ID="lbFileCls" runat="server" ></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="卡號/編號">
										<ItemTemplate>
											<asp:Label ID="lbFileCase" runat="server"></asp:Label>
											<asp:Label ID="H_lbDocNo" runat="server" CssClass ="hide"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="卷號">
										<ItemTemplate>
											<asp:Label ID="lbFileVol" runat="server" ></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="目次號">
										<ItemTemplate>
											<asp:Label ID="lbFileSeq" runat="server" ></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="公司名稱">
										<ItemTemplate>
											<asp:Label ID="lbTaxIDName" runat="server" ></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="歸還日期">
										<ItemTemplate>
											<asp:Label ID="lbRetDate" runat="server" ></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="註記">
										<ItemTemplate>
											<asp:Label ID="lbRemark" runat="server" ></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
								</Columns>
							</asp:DataGrid>
						</div>
					</div>
				</div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btSave" runat="server" Text="註記(S)" AccessKey="S" ToolTip="註記(ALT+S)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
