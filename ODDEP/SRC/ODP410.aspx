<%@ Page Language="c#" CodeBehind="ODP410.aspx.cs" AutoEventWireup="false" Inherits="OD.ODP410" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
	<title>ODP410 逾期公文稽催作業</title>
	<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
	<meta content="C#" name="CODE_LANGUAGE">
	<meta content="JavaScript" name="vs_defaultClientScript">
	<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
	<link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="format-detection" content="telephone=no">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
	<form id="ODP410" onkeyup="jf_CheckFull();" method="post" runat="server">
		<!--Template V2 Generated WebForm-->
		<!--#include file="Template/Res/GenericChild.htm"-->
		<div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
			<asp:TextBox ID="h_category" runat="server"></asp:TextBox>
			<asp:TextBox ID="h_category2" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_Sect" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_User" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_Sect_Value" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_User_Value" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_dlSect_Value" runat="server"></asp:TextBox>
			<asp:TextBox ID="H_dlUser_Value" runat="server"></asp:TextBox>
		</div>
		<asp:ListBox ID="lbReturnValue" Style="z-index: 102; position: absolute; top: 102px; left: 10px" runat="server" CssClass="hidden"></asp:ListBox>
		<div class="DivBaseTable" id="BaseTable">
			<div class="DivTable" id="MainTable">
				<div class="dTR">
					<div style="width: 10em" class="dTDTitle">
						<asp:Label ID="Label4" runat="server" Width="7.5em">承辦單位：</asp:Label>
					</div>
					<div class="dTD">
						<asp:TextBox ID="H_Value" TabIndex="-1" runat="server" CssClass="hide" Width="10.5em"></asp:TextBox>
						<cc1:ComboBox ID="dlDept" TabIndex="5" runat="server" Width="7em" Rows="8" class="comboBox"></cc1:ComboBox>
						<cc1:ComboBox ID="dlSect" TabIndex="5" runat="server" Width="7em" class="comboBox"></cc1:ComboBox>
					</div>
				</div>
				<div class="dTR">
					<div style="width: 10em" class="dTDTitle">
						<asp:Label ID="Label5" runat="server">承辦人：</asp:Label>
					</div>
					<div class="dTD">
						<div class="dTR">
							<cc1:ComboBox ID="dlUser" TabIndex="5" runat="server" Width="7em" Rows="10" class="comboBox"></cc1:ComboBox>
						</div>
						<div class="dTR" id="tr1">
							<asp:Label ID="Label1" runat="server" Width="6em">逾期天數自</asp:Label>
							<asp:TextBox ID="txCount" TabIndex="-1" runat="server" Width="2em" ReadOnly="false" MaxLength="3" CssClass="InputFieldNumeric"></asp:TextBox>
							<asp:Label ID="Label3" runat="server">天起</asp:Label>
						</div>
					</div>
				</div>
				<div class="dTR">
					<div style="width: 10em" class="dTDTitle">
						<asp:Label ID="Label2" runat="server" Width="7.5em">稽催公文來源：</asp:Label>
					</div>
					<div class="dTD">
						<asp:CheckBox ID="cbRcv" runat="server" Text="來文" Checked="True"></asp:CheckBox>
						<asp:CheckBox ID="cbDraft" runat="server" Text="創稿" Checked="True"></asp:CheckBox>
					</div>
				</div>
				<div class="dTR">
					<div style="width: 10em" class="dTDTitle">
						<asp:Label ID="lbCoworkType" runat="server" Width="7.5em">稽催公文類型：</asp:Label>
					</div>
					<div class="dTD">
						<asp:CheckBox ID="cbCoworkMain" runat="server" Text="主辦" Checked="True"></asp:CheckBox>
						<asp:CheckBox ID="cbCoworkHelp" runat="server" Text="會辦" Checked="True"></asp:CheckBox>
					</div>
				</div>
				<div class="dTR hide">
					<div style="width: 10em" class="dTDTitle">
						<asp:Label ID="Label10" runat="server" Width="9em">依稽催日期查詢：</asp:Label>
					</div>
					<div class="dTD">
						<div class="dTR">
							<asp:TextBox ID="txSDate" TabIndex="20" runat="server" Width="4em" MaxLength="7" class="DatePicker"></asp:TextBox>－
								<asp:TextBox ID="txEDate" TabIndex="25" runat="server" Width="4em" MaxLength="7" class="DatePicker"></asp:TextBox>
							<asp:TextBox ID="Textbox1" TabIndex="-1" runat="server" CssClass="hide" Width="10.5em"></asp:TextBox>
						</div>
						<div class="dTR">
							<div style="width: 10em" class="dTDTitle"></div>
							<div>
								<asp:Label ID="Label11" runat="server" Width="15em">(配合預覽稽催鈕使用,若不輸入<br/>此欄位則產生最後一次的清單)</asp:Label>
							</div>
						</div>
					</div>
				</div>
				<div class="dTR">
					<div style="width: 10em" class="dTDTitle">&nbsp;</div>
					<div class="dTD">
						<div class="dTR">
							<div>
								<asp:CheckBox ID="cbDirectPrint" runat="server" Text="直接列印"></asp:CheckBox>
								<asp:CheckBox Style="z-index: 0" ID="cbODR410addline" runat="server" Text="通知單列印隔線"></asp:CheckBox>
							</div>
						</div>
						<div class="dTR">
							<div>
								<asp:Label ID="Label6" runat="server" Visible="False">會辦公文逾期天數一律以逾期1天起算</asp:Label>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="DivTable">
				<div class="GridDiv" style="height: 16em">
					<asp:DataGrid ID="dg2" runat="server" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="2" PageSize="50">
						<Columns>
							<asp:TemplateColumn HeaderText="文別">
								<HeaderTemplate>
									稽催公文文別：
								</HeaderTemplate>
								<ItemTemplate>
									<asp:CheckBox ID="cbcategory" runat="server" Checked="True"></asp:CheckBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderStyle-CssClass="hide" ItemStyle-CssClass="hide">
								<ItemTemplate>
									<asp:Label ID="lbtypeno" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
						</Columns>
					</asp:DataGrid>
				</div>
			</div>
			<div class="GridDiv">
				<asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" CellPadding="4" PageSize="50"></asp:DataGrid>
			</div>
		</div>
		<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
			<asp:Button ID="btPush" runat="server" Text="稽催" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btPreview" runat="server" Text="預覽待稽催公文清單" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btPrintNotify" runat="server" Text="預覽稽催通知單" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btPrintList" runat="server" Text="預覽稽催公文清單" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
		</asp:Panel>
		<asp:CustomValidator ID="Validator" Style="z-index: 104; position: absolute; top: 218px; left: 12px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
		<asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; position: absolute; top: 16em; left: 12px" runat="server" CssClass="hidden"></asp:ValidationSummary>
	</form>
</body>
</html>
