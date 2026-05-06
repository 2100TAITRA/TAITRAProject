<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="IFM305.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM305" %>

<!DOCTYPE HTML >
<html>
<head>
	<title>IFM305 代理人維護作業</title>
	<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
	<meta content="C#" name="CODE_LANGUAGE">
	<meta content="JavaScript" name="vs_defaultClientScript">
	<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
	<link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="format-detection" content="telephone=no">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
	<form id="IFM304" onkeyup="jf_CheckFull();" method="post" runat="server">
		<!--Template V3 Generated WebForm-->
		<!--#include file="../IFLIB/GenericBanner.htm"-->
		<div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
			<asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
			<asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
			<asp:ListBox ID="lbReturnValue" runat="server"></asp:ListBox>
			<asp:TextBox ID="txUserIdentity" runat="server"></asp:TextBox>
			<asp:TextBox ID="txDelAgentIdentity" runat="server"></asp:TextBox>
			<asp:TextBox ID="txDelDesc" runat="server"></asp:TextBox>
		</div>
		<div id="BaseTable" class="DivBaseTable">
			<div class="DivTable" id="MainTable">
				<div class="dTR">
					<div class="dTDTitle" style="width: 7em;">
						<asp:Label ID="Label1" runat="server" ForeColor="Red">帳　　號：</asp:Label>
					</div>
					<div class="dTD" style="width: 13em;">
						<asp:TextBox ID="txAccount" onkeypress="jf_UPPERCASE()" runat="server" Width="10em" CssClass="KeyUpperField" MaxLength="20"></asp:TextBox>
					</div>
					<div class="dTDTitle" style="width: 7em;">
						<asp:Label ID="Label2" runat="server">名　　稱：</asp:Label>
					</div>
					<div class="dTD">
						<asp:TextBox ID="txEmpName" runat="server" Width="7em" MaxLength="20"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 7em;">
						<asp:Label ID="Label6" runat="server" ForeColor="Red">角　　色：</asp:Label>
					</div>
					<div class="dTD">
						<asp:DropDownList ID="ddlAgentRole" runat="server"></asp:DropDownList>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 7em;">
						<asp:Label ID="Label3" runat="server">代理事由：</asp:Label>
					</div>
					<div class="dTD" style="width: 20em;">
						<asp:TextBox ID="txAgentDesc" runat="server" Width="10em" MaxLength="200"></asp:TextBox>
						<asp:DropDownList ID="ddlAgentDesc" runat="server"></asp:DropDownList>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 7em;">
						<asp:Label ID="Label4" runat="server">代理期間：</asp:Label>
					</div>
					<div class="dTD" style="width: 13em;">
					</div>
					<asp:TextBox onkeypress="jf_InpNumOnly()" ID="txBegDate" runat="server" Width="4.5em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>年
                                            <asp:DropDownList ID="ddlBegh" runat="server"></asp:DropDownList>時
                                            <asp:DropDownList ID="ddlBegm" runat="server"></asp:DropDownList>分
                    —
                    <asp:TextBox onkeypress="jf_InpNumOnly()" ID="txEndDate" runat="server" Width="4.5em" MaxLength="7" CssClass="DatePicker"></asp:TextBox>年
                                            <asp:DropDownList ID="ddlEndh" runat="server"></asp:DropDownList>時
                                            <asp:DropDownList ID="ddlEndm" runat="server"></asp:DropDownList>分
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 7em;">
						<asp:Label ID="Label5" runat="server">代理人：</asp:Label>
					</div>
					<div class="dTD" style="width: 16em;">
						<asp:TextBox ID="txProxyUser" onkeypress="jf_UPPERCASE()" runat="server" Width="5em" MaxLength="20"></asp:TextBox>
						<asp:TextBox ID="txProxyName" runat="server" Width="5em" MaxLength="20"></asp:TextBox>
						<asp:Button ID="btProxyUser" runat="server" Text="設定"></asp:Button>
					</div>
					<div class="dTDTitle" style="width: 9em;">
						<asp:CheckBox ID="cbAgentAll" runat="server" Text="一併代理個人訊息" Width="9em"></asp:CheckBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 7em;">
						<asp:Button ID="btAdd" runat="server" Text="加入" />
					</div>
				</div>
			</div>
			<div class="DivTable">
				<asp:Panel ID="tbSelect" CssClass="DgSelectToolBar" runat="server">
					<asp:Button ID="btDeleteSelected" runat="server" Text="刪除選取" />
					<asp:Button ID="btSelectInverse" runat="server" Text="未過期代理" Style="display: none" />
					<asp:Button ID="btSelectClear" runat="server" Text="歷史代理" Style="display: none" />
				</asp:Panel>
				<div class="GridDiv" style="height: 384px; overflow: auto">
					<asp:DataGrid ID="dgData" runat="server" AutoGenerateColumns="False" Height="6px" GridLines="Vertical" CellPadding="4" PageSize="50">
						<Columns>
							<asp:TemplateColumn HeaderText="序">
								<ItemTemplate>
									<asp:Label ID="lbSeq" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="勾選">
								<ItemTemplate>
									<asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="代理期間">
								<ItemTemplate>
									<asp:Label ID="lbBegAgentDate" runat="server"></asp:Label>
									<asp:Label ID="Label7" runat="server" Text="-"></asp:Label>
									<asp:Label ID="lbEndAgentDate" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="代理事由">
								<ItemTemplate>
									<asp:Label ID="lbAgentDesc" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="代理角色">
								<ItemTemplate>
									<asp:Label ID="lbAgentRole" runat="server"></asp:Label>
									<asp:Label ID="lbRoleIdentity" runat="server" CssClass="hide"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="代理人">
								<ItemTemplate>
									<asp:Label ID="lbAgentName" runat="server"></asp:Label>
									<asp:Label ID="lbProxyIdentity" runat="server" CssClass="hide"> </asp:Label>
									<asp:Label ID="lbAgentIdentity" runat="server" CssClass="hide"> </asp:Label>
									<asp:Label ID="lbFromIdentity" runat="server" CssClass="hide"> </asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="個人<br>訊息">
								<ItemTemplate>
									<asp:Label ID="lbAgentAll" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="代理<br>權利">
								<ItemTemplate>
									<asp:Button ID="btSetPriv" runat="server" Text="設定"></asp:Button>
								</ItemTemplate>
							</asp:TemplateColumn>
						</Columns>
					</asp:DataGrid>
				</div>
			</div>
		</div>
		<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
			<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btPreview" runat="server" Text="取得最新代理資料(N)" AccessKey="N" title="取得最新代理資料(ALT+N)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
		</asp:Panel>
	</form>
</body>
</html>
