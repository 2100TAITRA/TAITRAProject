
<%@ Page language="c#" Codebehind="EAC002.aspx.cs" AutoEventWireup="false" Inherits="EA01.EAC002" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAC002 基準主題查詢子視窗</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<link rel="stylesheet" href="../EALIB/css/zTreeStyle/zTreeStyle.css" type="text/css">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EAC002" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericChild.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:textbox id="H_JsonData" runat="server" TextMode="MultiLine"></asp:textbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label1" runat="server">類別編號：</asp:label></DIV>
						<DIV class="dTD">
							<asp:textbox id="txType_No" tabIndex="0" runat="server" Width="1.5em" MaxLength="2"></asp:textbox>
							<asp:textbox id="txReadOnly" tabIndex="0" runat="server" Width="6.5em" CssClass="DisplayOnly"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label2" runat="server">主題編號：</asp:label></DIV>
						<DIV class="dTD">
							<asp:textbox id="txTheme_No" CssClass="InputFieldNumeric" tabIndex="0" runat="server" Width="2.5em" MaxLength="4"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label3" runat="server">主題名稱：</asp:label></DIV>
						<DIV class="dTD">
							<asp:textbox id="txTheme" tabIndex="0" runat="server" Width="20.5em" MaxLength="40"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label4" runat="server">顯示方式：</asp:label></DIV>
						<DIV class="dTD">
							<asp:RadioButton id="rbTreeView" runat="server" Checked="True" Text="樹狀顯示" GroupName="gp1"></asp:RadioButton>
							<asp:RadioButton id="rbDataGrid" runat="server" Text="表格顯示" GroupName="gp1"></asp:RadioButton></DIV>
					</DIV>
				</DIV>
				<DIV id="GridTable" class="DivTable">
					<DIV id="Data1" class="GridDiv" style="height:16em">
						<ul id="Classtree" class="ztree"></ul>
					</DIV>
					<DIV id="Data2" class="GridDiv" style="height:16em">
						<asp:datagrid id="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0" PageSize="1">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="類別">
									<ItemTemplate>
										<asp:Label id="lbTypes" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="主題編號">
									<ItemTemplate>
										<asp:HyperLink id="hlLink" tabIndex="0" runat="server"></asp:HyperLink>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="主題名稱">
									<ItemTemplate>
										<asp:Label id="lbTheme" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
	<script type="text/javascript" src="../EALIB/jquery.ztree.core-3.5.js"></script>
	<script type="text/javascript" src="../EALIB/jquery.ztree.exhide-3.5.js"></script>
</HTML>
