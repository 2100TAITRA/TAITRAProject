<%@ Page Language="c#" CodeBehind="ODR472.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR472" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
	<title>ODR472 續辦公文查詢作業</title>
	<meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
	<meta name="CODE_LANGUAGE" content="C#">
	<meta name="vs_defaultClientScript" content="JavaScript">
	<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
	<link rel="stylesheet" type="text/css" href="Template/LIB/SYS.css">
	<link rel="stylesheet" type="text/css" href="LIB/AK.css">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="format-detection" content="telephone=no">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
	<form id="ODR472" onkeyup="jf_CheckFull();" method="post" runat="server">
		<!--Template V2 Generated WebForm-->
		<!--#include file="Template/Res/GenericSearch.htm"-->
		<asp:ListBox Style="z-index: 102; position: absolute; top: 102px; left: 10px" ID="lbReturnValue" runat="server" CssClass="hidden"></asp:ListBox>
		<div id="BaseTable" class="DivBaseTable">
			<div id="MainTable" class="DivTable">
				<div class="dTR">
					<div class="dTDTitle" style="width: 5.5em">
						<asp:Label ID="Label7" runat="server">結案日期：</asp:Label>
					</div>
					<div style="width: 17.5em" class="dTD">
						<asp:TextBox ID="txSDate" TabIndex="20" CssClass="DatePicker" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
						<asp:Label Style="z-index: 0" ID="Label10" runat="server" Width="1em">－</asp:Label>
						<asp:TextBox ID="txEDate" TabIndex="25" CssClass="DatePicker" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
					</div>
					<div style="width: 6em" class="dTDTitle">
						<asp:Label ID="Label3" runat="server">收創文日：</asp:Label>
					</div>
					<div class="dTD">
						<asp:TextBox ID="txRcvDateS" TabIndex="30" CssClass="DatePicker" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
						<asp:Label Style="z-index: 0" ID="Label11" runat="server" Width="1em">－</asp:Label>
						<asp:TextBox ID="txRcvDateE" TabIndex="35" CssClass="DatePicker" runat="server" Width="4em" MaxLength="7"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 5.5em">
						<asp:Label ID="Label4" runat="server">承辦單位：</asp:Label>
					</div>
					<div style="width: 17.5em" class="dTD">
						<cc1:ComboBox ID="dlDept" TabIndex="40" runat="server" CssClass="comboBox"></cc1:ComboBox>
						<asp:ListBox ID="lbDept" runat="server" CssClass="hide" Width="6em"></asp:ListBox>
						<asp:TextBox ID="H_Value" runat="server" CssClass="hide"></asp:TextBox>
						<asp:TextBox ID="H_Change" runat="server" CssClass="hide"></asp:TextBox>
					</div>
					<div style="width: 6em" class="dTDTitle">
						<asp:Label ID="Label5" runat="server">承辦人：</asp:Label>
					</div>
					<div class="dTD">
						<cc1:ComboBox ID="dlUser" TabIndex="45" runat="server" CssClass="comboBox"></cc1:ComboBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 5.5em">
						<asp:Label ID="Label8" runat="server">公文性質：</asp:Label>
					</div>
					<div style="width: 17.5em" class="dTD">
						<asp:DropDownList ID="ddlDocType" runat="server"></asp:DropDownList>
					</div>
					<div style="width: 6em" class="dTDTitle">
						<asp:Label ID="Label9" runat="server">業務類別：</asp:Label>
					</div>
					<div class="dTD">
						<asp:DropDownList ID="ddlWorkType" runat="server"></asp:DropDownList>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 5.5em">
						<asp:Label ID="Label2" runat="server">排序：</asp:Label>
					</div>
					<div style="width: 23.5em; height: 3.5em" class="dTD">
						<asp:RadioButtonList ID="rbSort" runat="server" RepeatColumns="3">
							<asp:ListItem Value="1">公文文號</asp:ListItem>
							<asp:ListItem Value="4">承辦單位</asp:ListItem>
							<asp:ListItem Value="3">收創文日</asp:ListItem>
							<asp:ListItem Value="5">承辦人</asp:ListItem>
							<asp:ListItem Value="2">結案日期</asp:ListItem>
						</asp:RadioButtonList>
					</div>
					<div class="dTD">
						<asp:CheckBox Style="z-index: 0" ID="cbPageDecide" runat="server" Text="報表依承辦單位分頁"></asp:CheckBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 5.5em">
						<asp:Label ID="Label1" runat="server">發文性質：</asp:Label>
					</div>
					<div class="dTD">
						<div class="DivTable" style="margin:auto;">
							<div class="GridDiv" style="height: 9.5em;" id="ck" data-fixed="true">
								<asp:DataGrid ID="dg2" runat="server" PageSize="2" CellPadding="1" GridLines="Vertical" AutoGenerateColumns="False">
									<Columns>
										<asp:TemplateColumn HeaderText="選">
											<ItemTemplate>
												<asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="發文性質">
											<ItemTemplate>
												<asp:Label ID="lbIssueCode" runat="server" CssClass="hide"></asp:Label>
												<asp:Label ID="lbIssueName" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:DataGrid>
							</div>
						</div>
					</div>
					<div style="width: 14.2em" class="dTDTitle">
						<asp:Label ID="Label6" runat="server">歸檔狀態：</asp:Label>
					</div>
					<div class="dTD">
						<div>
							<asp:CheckBox ID="cbCLOSE" runat="server" Text="已歸檔"></asp:CheckBox>
							<asp:CheckBox ID="cbUNCLOSE" runat="server" Text="未歸檔"></asp:CheckBox>
						</div>
					</div>
				</div>
			</div>
		<div class="DivTable">
			<div class="GridDiv" style="height: 20em">
				<asp:DataGrid ID="dg1" runat="server" PageSize="30" CellPadding="1" GridLines="Vertical" AutoGenerateColumns="False">
					<Columns>
						<asp:TemplateColumn HeaderText="序">
							<ItemTemplate>
								<asp:Label ID="lbNo" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="公文文號">
							<ItemTemplate>
								<asp:Label ID="lbDocNo" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="結案日期">
							<ItemTemplate>
								<asp:Label ID="lbCloseDate" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="收創文日">
							<ItemTemplate>
								<asp:Label ID="lbRcvDate" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="公文性質">
							<ItemTemplate>
								<asp:Label ID="lbDocType" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="業務類別">
							<ItemTemplate>
								<asp:Label ID="lbWorkType" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="承辦單位">
							<ItemTemplate>
								<asp:Label ID="lbDeptName" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="承辦人">
							<ItemTemplate>
								<asp:Label ID="lbUserName" runat="server"></asp:Label>
							</ItemTemplate>
						</asp:TemplateColumn>
						<asp:TemplateColumn HeaderText="主旨">
							<ItemTemplate>
								<asp:TextBox ID="txSubject" TabIndex="-1" runat="server" CssClass="PopUp" ReadOnly="True"></asp:TextBox>
							</ItemTemplate>
						</asp:TemplateColumn>
					</Columns>
				</asp:DataGrid>
			</div>
		</div>
		</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		<asp:CustomValidator Style="z-index: 104; position: absolute; top: 218px; left: 12px" ID="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
		<asp:ValidationSummary Style="z-index: 105; position: absolute; top: 252px; left: 12px" ID="ValidationSummary1" runat="server" CssClass="hidden"></asp:ValidationSummary>
	</form>
</body>
</html>
