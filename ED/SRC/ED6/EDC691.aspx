<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDC691.aspx.cs" AutoEventWireup="false" Inherits="ED6.EDC691" %>

<!DOCTYPE HTML>
<html>
<head>
	<title>EDC691 辦理情形代碼查詢作業</title>
	<meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
	<meta name="CODE_LANGUAGE" content="C#">
	<meta name="vs_defaultClientScript" content="JavaScript">
	<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
	<link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="format-detection" content="telephone=no">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
	<form id="EDC691" onkeyup="jf_CheckFull();" method="post" runat="server">
		<!--Template V3 Generated WebForm-->
		<!--#include file="../EDLIB/GenericBanner.htm"-->
		<div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
			id="hiddenDiv">
			<asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
			<asp:ListBox ID="lbReturnValue" runat="server" Width="80px" CssClass="hidden"></asp:ListBox>
		</div>
		<div style="z-index: 101" id="BaseTable" class="DivBaseTable">
			<div class="DivTable" style="height: 23px" id="MainTable">
				<div class="dTR">
					<div class="dTDTitle" style="width: 7.5em">
						<asp:Label Style="z-index: 0" ID="Label1" runat="server" Width="7em">辦理情形代碼：</asp:Label>
					</div>
					<div class="dTD">
						<asp:TextBox Style="z-index: 0" ID="txFlowCodes" TabIndex="0" runat="server" Width="1.5em"
							CssClass="InputFieldNumeric" MaxLength="2"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 7.5em">
						<asp:Label Style="z-index: 0" ID="Label5" runat="server" Width="7em">辦理情形名稱：</asp:Label>
					</div>
					<div class="dTD">
						<asp:TextBox Style="z-index: 0" ID="txFlowName" TabIndex="0" runat="server" Width="10.5em"
							MaxLength="20"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 7.5em">
						<asp:Label Style="z-index: 0" ID="Label2" runat="server" Width="4em">結案別：</asp:Label>
					</div>
					<div class="dTD">
						<asp:DropDownList Style="z-index: 0" ID="dlCloseType" runat="server" Width="10.5em"></asp:DropDownList>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 7.5em">
						<asp:Label Style="z-index: 0" ID="Label3" runat="server" Width="7em">時效計算性質：</asp:Label>
					</div>
					<div class="dTD">
						<asp:DropDownList Style="z-index: 0" ID="dlTimeCount" runat="server" Width="10.5em"></asp:DropDownList>
					</div>
				</div>
			</div>

			<div class="DivTable">
				<div class="GridDiv" style="height: 210px">
					<asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0" Style="z-index: 0">
						<Columns>
							<asp:TemplateColumn HeaderText="序">
								<ItemTemplate>
									<asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="辦理情形<br>代碼">
								<ItemTemplate>
									<asp:HyperLink ID="hlFlowCode" runat="server"></asp:HyperLink>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="辦理情形名稱">
								<ItemTemplate>
									<asp:Label ID="lbFlowName" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="結案別">
								<ItemTemplate>
									<asp:Label ID="lbCloseType" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="時效統計性質">
								<ItemTemplate>
									<asp:Label ID="lbTimeCount" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
						</Columns>
					</asp:DataGrid>
				</div>
			</div>
		</div>
		<asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
			<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
		</asp:Panel>
	</form>
</body>
</html>
