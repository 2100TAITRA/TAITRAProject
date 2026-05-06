<%@ Page language="c#" Codebehind="ODM070.aspx.cs" AutoEventWireup="false" Inherits="OD.ODM070" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>ODM070 代碼維護作業</title>
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
		<form id="ODM070" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="5.5em"></asp:listbox>
			</DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 7em">
							<asp:label id="Label3" runat="server">代碼類別：</asp:label>
						</div>
						<div class="dTD">
							<asp:dropdownlist id="dlType" runat="server" >
								<asp:ListItem Value="15,CODE_MAIN">退文原因註記</asp:ListItem>
								<asp:ListItem Value="16,CODE_MAIN">人工傳遞清單受文者選項</asp:ListItem>
								<asp:ListItem Value="A3,CODE_MAIN">檔案銷毀原因</asp:ListItem>
								<asp:ListItem Value="A5,CODE_MAIN">檔案解密條件</asp:ListItem>
								<asp:ListItem Value="F1,CODE_MAIN">主題項</asp:ListItem>
								<asp:ListItem Value="F2,CODE_MAIN">附註項</asp:ListItem>
								<asp:ListItem Value="B3,CODE_MAIN">檔案調檔展期原因</asp:ListItem>
								<asp:ListItem Value="E3,CODE_MAIN">延後歸檔說明</asp:ListItem>	
								<asp:ListItem Value="E2,CODE_MAIN">檔案調檔審核意見</asp:ListItem>											
								<asp:ListItem Value="E1,CODE_MAIN">檔案調檔審核意見</asp:ListItem>
								<asp:ListItem Value="C2,CODE_MAIN">檔案計量單位</asp:ListItem>
								<asp:ListItem Value="M1,CODE_MAIN">郵件收件地區</asp:ListItem>
								<asp:ListItem Value="D1,PHRASE">公文展期申請原因</asp:ListItem>
								<asp:ListItem Value="D2,PHRASE">公文專案申請原因</asp:ListItem>
								<asp:ListItem Value="D3,PHRASE">公文銷號原因</asp:ListItem>
								<asp:ListItem Value="D4,PHRASE">檔案鑑定單元</asp:ListItem>
							</asp:dropdownlist>
						</div>
					</div>
				</div>
				<div class="DivTable">
					<DIV class="GridDiv" style="HEIGHT: 22em">
						<asp:datagrid id="dg1" runat="server" PageSize="30" CellPadding="4" GridLines="Vertical" AutoGenerateColumns="False">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSeq" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="編號">
									<ItemTemplate>
										<asp:TextBox id="txNo" runat="server" Width="1.5em" MaxLength="2" CssClass="RequireField"></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="描述">
									<ItemTemplate>
										<asp:TextBox id="txDesc" runat="server" Width="20em" MaxLength="40"></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="對照">
									<ItemTemplate>
										<asp:TextBox id="txMap" runat="server" Width="1.5em" MaxLength="2" ></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
		</form>
	</body>
</HTML>
