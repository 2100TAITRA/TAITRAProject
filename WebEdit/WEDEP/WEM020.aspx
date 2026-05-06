<%@ Page language="c#" Codebehind="WEM020.aspx.cs" AutoEventWireup="false" Inherits="WebEditWs.WEM020" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<title>WEM020 群組維護作業</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="WEM020" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox><asp:textbox id="H_IISystemMode" runat="server"  CssClass="hidden"></asp:textbox>
			<asp:textbox id="H_UserInfoOrg" runat="server" Width="8px" CssClass="hide"></asp:textbox>
			<asp:textbox id="H_WEM010C1OWNER" runat="server" Width="8px" CssClass="hide"></asp:textbox>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label id="Label16" class="KeyField" runat="server">編修權擁有者：</asp:label></div>
						<div class="dTD">
							<asp:RadioButton ID="rbOrg" TabIndex="30" runat="server" Text="機關共用" GroupName="rbOwner" ></asp:RadioButton>
							<asp:RadioButton ID="rbUser" TabIndex="30" runat="server" Text="個人" GroupName="rbOwner" ></asp:RadioButton>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 8em">
							<asp:label class="KeyField" id="Label1" runat="server">系統識別碼：</asp:label></div>
						<div class="dTD">
							<asp:textbox class="KeyUpperField" id="txSYSID" tabIndex="1" runat="server" Width="5.5em" MaxLength="10"></asp:textbox>
							<asp:textbox id="H_Orgno" runat="server" CssClass="hide" Width="8px" ></asp:textbox>
							<asp:textbox id="H_Dept" runat="server" CssClass="hide" Width="8px" ReadOnly="True"></asp:textbox>
							<asp:textbox id="H_User" runat="server" CssClass="hide" Width="8px" ReadOnly="True"></asp:textbox>
						</div>
						<div class="dTDTitle" style="WIDTH: 6em">
							<asp:textbox id="H_ReturnOwner" runat="server" CssClass="hide" Width="8px" ></asp:textbox>
							<asp:label class="RequireField" id="Label2" runat="server">群組名稱：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox class="RequireField" id="txOrgName" tabIndex="1" runat="server" Width="17em" MaxLength="60"></asp:textbox>
							<asp:textbox id="H_Owner" runat="server" CssClass="hide" Width="8px" ></asp:textbox>
							<asp:textbox id="H_Answer" runat="server" CssClass="hide" Width="8px" ></asp:textbox>
						</div>
					</div>
				</div>
				<div class="DivTable">
					<div class="GridDiv" style="HEIGHT: 299px">
						<asp:datagrid id="dg2" runat="server" BackColor="White" BorderStyle="None" BorderColor="#DEDFDE" ForeColor="Black" 
							BorderWidth="1px" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="50">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbNo" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="機關代號">
									<ItemTemplate>
										<asp:TextBox id="txOrgno" onblur="CheckOrgInfo()" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
										<asp:ImageButton id="btHelp" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="機關名稱">
									<ItemTemplate>
										<asp:TextBox id="txOrgSYSID" tabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
										<asp:Label id="lbName" tabIndex="-1" runat="server" CssClass="TextLabel"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</div>
				</div>
				<asp:TextBox id="H_txExportRange" runat="server" CssClass="hide"></asp:TextBox>
				<div class="DivTable">
					<div class="dTR">
						<div class="dTD">
							<DIV class="GridDiv" style="HEIGHT: 145px">
								<asp:datagrid id="dg1" runat="server" BackColor="White" BorderStyle="None" BorderColor="#DEDFDE" 
									ForeColor="Black" BorderWidth="1px" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbNo" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="簡稱／別名">
											<ItemTemplate>
												<asp:TextBox id="txNickName" runat="server" Width="24em"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</div>
					</div>
				</div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btRpt" runat="server" Text="報表" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:DropDownList ID="ddRptName" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:none;">
					<asp:ListItem Value="人員薪資單" Selected="True">人員薪資單</asp:ListItem>
					<asp:ListItem Value="中檢資訊">中檢資訊</asp:ListItem>
					<asp:ListItem Value="預設">預設</asp:ListItem>
				</asp:DropDownList>
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btImport" runat="server" Text="批次匯入" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExport" runat="server" Text="批次匯出" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btHelp" runat="server" Text="操作說明" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary></form>
	</body>
</HTML>
