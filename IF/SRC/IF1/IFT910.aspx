<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="IFT910.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFT910" %>

<!DOCTYPE HTML >
<html>
<head>
	<title>IFT910 借卡設定作業</title>
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
	<span id="httpObject" ></span>
	<form id="IFT910" method="post" runat="server">
		<asp:TextBox Style="z-index: 108; position: absolute; top: 373px; left: 12px" ID="hFlag" runat="server" CssClass="hidden"></asp:TextBox>
		<!--Template V3 Generated WebForm-->
		<!--#include file="../IFLIB/GenericBanner.htm"-->
		<div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
			<asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
			<asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
			<asp:TextBox ID="hAccount" runat="server" CssClass="hidden">二一零零</asp:TextBox>
			<asp:TextBox ID="hDate" runat="server" CssClass="hidden"></asp:TextBox>
			<asp:TextBox ID="txActiveOrgNo" runat="server" CssClass="hidden"></asp:TextBox>
			<asp:TextBox ID="txCardInfo" runat="server" CssClass="hidden"></asp:TextBox>
			<asp:ListBox ID="lbReturnValue" runat="server" Width="80px" CssClass="hidden"></asp:ListBox>
		</div>
		<div class="DivBaseTable">
			<div class="DivTable" id="MainTable">
				<div class="dTR">
					<div class="dTDTitle" style="width: 6em;">
						<asp:Label ID="Label1" runat="server" CssClass="KeyField">借卡人：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em;">
						<asp:TextBox ID="txName" class="KeyUpperField" TabIndex="0" runat="server" CssClass="DisplayOnly" Width="65px" MaxLength="5"></asp:TextBox>
						<asp:Button ID="btHelp" runat="server" Text="..."></asp:Button>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 6em;">
						<asp:Label ID="lbbordate" runat="server">借卡日期：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em;">
						<asp:Label ID="lbDate" runat="server" Width="10em"></asp:Label>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 6em;">
						<asp:Label ID="lbborreson" runat="server">借卡原因：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em;">
						<asp:TextBox ID="txReason" TabIndex="0" runat="server" Width="10em" MaxLength="20" TextMode="MultiLine"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 6em;">
						<asp:Label ID="lbbordays" runat="server">借卡天數：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em;">
						<asp:DropDownList ID="ddlDays" runat="server">
							<asp:ListItem Value="1">1</asp:ListItem>
							<asp:ListItem Value="2">2</asp:ListItem>
							<asp:ListItem Value="3" Selected="True">3</asp:ListItem>
							<asp:ListItem Value="4">4</asp:ListItem>
							<asp:ListItem Value="5">5</asp:ListItem>
							<asp:ListItem Value="6">6</asp:ListItem>
							<asp:ListItem Value="7">7</asp:ListItem>
							<asp:ListItem Value="8">8</asp:ListItem>
							<asp:ListItem Value="9">9</asp:ListItem>
							<asp:ListItem Value="10">10</asp:ListItem>
							<asp:ListItem Value="11">11</asp:ListItem>
							<asp:ListItem Value="12">12</asp:ListItem>
							<asp:ListItem Value="13">13</asp:ListItem>
							<asp:ListItem Value="14">14</asp:ListItem>
							<asp:ListItem Value="15">15</asp:ListItem>
							<asp:ListItem Value="16">16</asp:ListItem>
							<asp:ListItem Value="17">17</asp:ListItem>
							<asp:ListItem Value="18">18</asp:ListItem>
							<asp:ListItem Value="19">19</asp:ListItem>
							<asp:ListItem Value="20">20</asp:ListItem>
							<asp:ListItem Value="21">21</asp:ListItem>
							<asp:ListItem Value="22">22</asp:ListItem>
							<asp:ListItem Value="23">23</asp:ListItem>
							<asp:ListItem Value="24">24</asp:ListItem>
							<asp:ListItem Value="25">25</asp:ListItem>
							<asp:ListItem Value="26">26</asp:ListItem>
							<asp:ListItem Value="27">27</asp:ListItem>
							<asp:ListItem Value="28">28</asp:ListItem>
							<asp:ListItem Value="29">29</asp:ListItem>
							<asp:ListItem Value="30">30</asp:ListItem>
						</asp:DropDownList>
						<asp:Label ID="Label7" runat="server">天</asp:Label>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 6em;">
						<asp:Label ID="lbcard" runat="server">卡片編號：</asp:Label>
					</div>
					<div class="dTD" style="width: 10em;">
						<asp:DropDownList ID="ddlCardId" runat="server" Width="10em">
							<asp:ListItem></asp:ListItem>
						</asp:DropDownList>
					</div>
					<div class="dTD" style="width: 5em;">
						<asp:Button Style="z-index: 0" ID="btReadCard" runat="server" Text="讀取卡片"></asp:Button>
					</div>
				</div>
				<div class="dTR">
					<div class="dTD" style="width: 21em;">
						<asp:Label ID="lbshow" runat="server" Width="16em" ForeColor="Red">※請於借卡完成後，利用外部工具進行</asp:Label>
					</div>
				</div>
				<div class="dTR">
					<div class="dTD" style="width: 21em;">
						<asp:Label ID="lbshow2" runat="server" Width="16em" ForeColor="Red">卡片PIN碼變更。(如：HiCOS卡片管理工具)</asp:Label>
					</div>
				</div>
			</div>
			<div class="DivTable">
				<asp:Panel ID="tbSelect" CssClass="DgSelectToolBar" runat="server">
					<asp:Button ID="btSelectAll" runat="server" Text="全選" />
					<asp:Button ID="btSelectInverse" runat="server" Text="反選" />
					<asp:Button ID="btSelectClear" runat="server" Text="清除" />
					<asp:DropDownList ID="ddlStatus" runat="server">
						<asp:ListItem Selected="True"></asp:ListItem>
						<asp:ListItem Value="0">啟用</asp:ListItem>
						<asp:ListItem Value="1">停用</asp:ListItem>
						<asp:ListItem Value="2">遺失</asp:ListItem>
					</asp:DropDownList>
					<asp:Button ID="btModifyStatus" runat="server" Text="更新" />
				</asp:Panel>
				<div class="GridDiv" style="height: 300px">
					<asp:DataGrid ID="dg1" runat="server" CellPadding="4" GridLines="Vertical" AutoGenerateColumns="False" PageSize="50">
						<Columns>
							<asp:TemplateColumn HeaderText="勾選">
								<ItemTemplate>
									<asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="序">
								<ItemTemplate>
									<asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
									<asp:TextBox ID="h_txSerialNo" runat="server" CssClass="hide"></asp:TextBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="卡號">
								<ItemTemplate>
									<asp:Label ID="lbCardID" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="憑證到期日">
								<ItemTemplate>
									<asp:Label ID="lbExpDate" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="登錄日期">
								<ItemTemplate>
									<asp:Label ID="lbEntryDate" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="登錄人員">
								<ItemTemplate>
									<asp:Label ID="lbEntryUser" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="狀態">
								<ItemTemplate>
									<asp:Label ID="lbStatus" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="借卡人員">
								<ItemTemplate>
									<asp:Label ID="lbBorrowUser" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
						</Columns>
					</asp:DataGrid>
				</div>
			</div>
		</div>
		<asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
			<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			<asp:Button ID="btRegistCert" runat="server" Text="憑證登錄(U)" title="確認還卡(U)" AccessKey="U" Style="display: none" DefaultStyle="newmode:block;modifymode:none;"/>
		</asp:Panel>
	</form>
</body>
</html>
