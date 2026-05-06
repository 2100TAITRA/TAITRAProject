<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="WEM040.aspx.cs" AutoEventWireup="false" Inherits="T2100.WebEditWs.WEM040" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>WEM040 符號表維護作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
		<!--#include file="/STDN/Lib/Script.shtml"-->
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="WEM040" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:textbox id="txNlbServer" runat="server"></asp:textbox>
			</DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle">
							<asp:label id="Label3" runat="server">符號：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txSign" tabIndex="0" runat="server" Width="1.5em" MaxLength="1"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle">
							<asp:label id="Label1" runat="server">說明：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txDesc" tabIndex="0" runat="server" Width="12em" MaxLength="20"></asp:textbox>
						</div>
					</div>
				</div>
				<div class="DivTable" id="GridTable">
					<div class="dTR">
						<asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
							<asp:Button ID="btSelectAll" runat="server" Text="全選" />
							<asp:Button ID="btSelectInverse" runat="server" Text="反向" />
							<asp:Button ID="btSelectClear" runat="server" Text="清除" />
							<asp:Button ID="btAddSelected" runat="server" Text="新增" />
							<asp:Button ID="btDeleteSelected" runat="server" Text="刪除" />
						</asp:Panel>
					</div>
					<DIV class="GridDiv" style="HEIGHT: 240px">
						<asp:datagrid id="dg1" runat="server" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="選">
									<ItemTemplate>
										<asp:CheckBox id="cbSelect" tabIndex="0" runat="server"></asp:CheckBox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="符號">
									<ItemTemplate>
										<asp:HyperLink id="lbSign" runat="server"></asp:HyperLink>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="說明">
									<ItemTemplate>
										<asp:Label id="lbDesc" runat="server" Width="261px"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btCancel" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
			<asp:TextBox id="H_txSeq" runat="server" CssClass="hide"></asp:TextBox>
		</FORM>
	</BODY>
</HTML>
