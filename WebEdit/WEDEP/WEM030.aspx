<%@ Page language="c#" Codebehind="WEM030.aspx.cs" AutoEventWireup="false" Inherits="WebEditWs.WEM030" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<title>WEM030 個人詞庫維護作業</title>
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
		<form id="WEM030" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px"><asp:textbox id="txLocalPath" runat="server" ></asp:textbox>
				<asp:textbox id="H_UserName" runat="server"></asp:textbox>
				<asp:textbox id="H_SourceOrgNo" runat="server"></asp:textbox>
				<asp:textbox id="H_KeyWord" runat="server"></asp:textbox>
				<asp:textbox id="H_ExportInfo" runat="server"></asp:textbox>
				<input type="file" id="csvImport" accept=".csv" runat="server">
			</DIV>
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px"
				runat="server" CssClass="hidden"></asp:listbox>
			<div class="DivBaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6.5em"><asp:label id="Label3" runat="server">新增常用詞：</asp:label></div>
						<div class="dTD"><asp:textbox id="txWord" tabIndex="20" runat="server" Width="22.5em"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6.5em">&nbsp</div>
						<div class="dTD">
							<asp:radiobutton id="rb1" runat="server" Text="插於最後" GroupName="gn"></asp:radiobutton>
							<asp:radiobutton id="rb2" runat="server" Text="插於序" GroupName="gn"></asp:radiobutton>
							<asp:textbox CssClass="InputFieldNumeric" id="txSeq" runat="server" Width="2em" MaxLength="3"></asp:textbox>前
							<asp:button id="btInsert" runat="server" Text="←┘"></asp:button>
						</div>
					</div>
				</div>
				<div class="DivTable">
					<div class="dTR">
						<div id="Table1" class="dTD DgSelectToolBar">
							<asp:button id="btSelect" runat="server" Width="4em" Text="全選"></asp:button>
							<asp:button id="btChange" runat="server" Width="4em" Text="反向"></asp:button>
							<asp:button id="btRemove" runat="server" Width="4em" Text="刪除"></asp:button>
						</div>
					</div>
					<div class="dTR">
						<div class="dTD">
							<div class="GridDiv" style="HEIGHT: 270px">
								<asp:datagrid id="dg1" runat="server" PageSize="50" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False">
									<Columns>
										<asp:TemplateColumn HeaderText="選">
											<ItemTemplate>
												<asp:CheckBox id="cb1" runat="server"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbNo" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="常用詞">
											<ItemTemplate>
												<asp:TextBox id="txUsual" runat="server" Width="25em"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</div>
					</div>
				</div>
			</div>
			<asp:Panel ID="tbTool" CssClass="V2_GenericBannerToolBar" runat="server">
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btImport" runat="server" Text="匯入" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExport" runat="server" Text="匯出" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="放棄" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px"
				runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px"
				runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
