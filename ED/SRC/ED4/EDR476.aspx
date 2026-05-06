<%@ Page Language="c#" CodeBehind="EDR476.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR476" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
	<title>EDR476 未線上簽核公文清單查詢列印作業</title>
	<meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
	<meta name="CODE_LANGUAGE" content="C#">
	<meta name="vs_defaultClientScript" content="JavaScript">
	<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
	<link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
	<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
	<meta name="format-detection" content="telephone=no">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
	<form id="EDR476" onkeyup="jf_CheckFull();" method="post" runat="server">
		<!--Template V3 Generated WebForm-->
		<!--#include file="../EDLIB/GenericBanner.htm"-->
		<div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
			<asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
			<asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
			<asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
			<asp:TextBox ID="H_Dept" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_Sect" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_User" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_Dept_Value" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_Sect_Value" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_User_Value" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_dlSect_Value" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_dlUser_Value" runat="server"></asp:TextBox>
		</div>
		<div id="BaseTable" class="DivBaseTable">
			<div id="MainTable" class="DivTable">
				<div class="dTR">
					<div style="width: 8em" class="dTDTitle">
						<asp:Label ID="Label2" runat="server" CssClass="RequireField">收文日期：</asp:Label>
					</div>
					<div class="dTD">
						<asp:TextBox Style="z-index: 0" ID="txRcvDateS" TabIndex="10" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
						<asp:Label Style="z-index: 0" ID="Label5" runat="server">－</asp:Label>
						<asp:TextBox Style="z-index: 0" ID="txRcvDateE" TabIndex="20" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div style="width: 8em" class="dTDTitle">
						<asp:Label ID="Label3" runat="server">公文文號：</asp:Label>
					</div>
					<div class="dTD">
						<asp:TextBox ID="txDocNoS" TabIndex="30" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
						<asp:Label Style="z-index: 0" ID="Label1" runat="server">－</asp:Label>
						<asp:TextBox Style="z-index: 0" ID="txDocNoE" TabIndex="40" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div style="width: 8em" class="dTDTitle">
						<asp:Label ID="Label4" runat="server">承辦單位：</asp:Label>
					</div>
					<div class="dTD">
						<cc1:ComboBox ID="dlDept" TabIndex="6" runat="server" Width="7em" CssClass="comboBox"></cc1:ComboBox>
						<cc1:ComboBox ID="dlSect" TabIndex="7" runat="server" Width="7em" CssClass="comboBox"></cc1:ComboBox>
					</div>
				</div>
				<div class="dTR">
					<div style="width: 8em" class="dTDTitle">
						<asp:Label ID="Label6" runat="server">承辦人：</asp:Label>
					</div>
					<div class="dTD">
						<cc1:ComboBox ID="dlUser" TabIndex="6" runat="server" Width="7em" CssClass="comboBox"></cc1:ComboBox>
					</div>
				</div>
				<div class="dTR">
					<div style="width: 8em" class="dTDTitle">
						<br>
						<asp:Label Style="z-index: 0" ID="Label8" runat="server">未線上簽核原因：</asp:Label>
					</div>
					<div class="dTD">
						<div class="GridDiv" style="height: 6.5em" id="div1" data-fixed="true">
							<asp:DataGrid ID="dgCRule" runat="server" PageSize="1" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0" ShowHeader="False">
								<Columns>
									<asp:TemplateColumn Visible="False" HeaderText="序">
										<ItemTemplate>
											<asp:Label ID="Label14" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="選">
										<ItemTemplate>
											<asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="原則說明">
										<ItemTemplate>
											<asp:Label ID="lbCRuleNo" Style="display: none" runat="server"></asp:Label>
											<asp:Label ID="lbCRuleExplain" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
								</Columns>
							</asp:DataGrid>
						</div>
					</div>
				</div>
			</div>
			<div id="GridTable" class="DivTable">
				<div class="GridDiv" style="height: 14em">
					<asp:DataGrid ID="dg1" runat="server" PageSize="1" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
						<Columns>
							<asp:TemplateColumn HeaderText="序">
								<ItemTemplate>
									<asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="公文文號">
								<ItemTemplate>
									<asp:Label ID="lbDocNo" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="主旨">
								<ItemTemplate>
									<asp:Label ID="lbSubject" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="承辦單位">
								<ItemTemplate>
									<asp:Label ID="lbOuName" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="承辦人">
								<ItemTemplate>
									<asp:Label ID="lbEmpName" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="未線上簽核原因">
								<ItemTemplate>
									<asp:Label ID="lbExplain" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="說明">
								<ItemTemplate>
									<asp:Label ID="lbReason" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
						</Columns>
					</asp:DataGrid>
				</div>
			</div>
		</div>
		<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
			<asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
		</asp:Panel>
	</form>
</body>
</html>
