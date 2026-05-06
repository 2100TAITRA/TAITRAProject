<%@ Page Language="c#" CodeBehind="WEI001.aspx.cs" AutoEventWireup="false" Inherits="WebEditWs.WEI001"%>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>WEI001 單位人員查詢子視窗</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
	<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="WEI001" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:TextBox ID="txLocalPath" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_UserName" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_SourceOrgNo" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_KeyWord" runat="server"></asp:TextBox>
        </div>
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable">
            <div class="DivTable">
				<div class="dTD" style="width: 15em" id="divDept">
					<div class="dTR">
						<div class="dTD" style="width: 10em">
							<asp:Label ID="Label4" runat="server">單位：</asp:Label>
							<asp:button id="btDeptAdd" runat="server" Text="新增"></asp:button>
						</div>
					</div>
					<div class="dTR">
						<div class="GridDiv" style="overflow: auto; height: 300px" data-fixed="true">
							<asp:DataGrid ID="dgDept" runat="server" PageSize="50" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False">
								<Columns>
									<asp:TemplateColumn HeaderText="選">
										<ItemTemplate>
											<asp:CheckBox id="cbDept" runat="server"></asp:CheckBox>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="單位">
										<ItemTemplate>
											<asp:HyperLink ID="hlDept" runat="server" Style="text-align: left;"></asp:HyperLink>
											<asp:Textbox ID="txDept" runat="server" class="hide"></asp:Textbox>
										</ItemTemplate>
									</asp:TemplateColumn>
								</Columns>
							</asp:DataGrid>
						</div>
					</div>
				</div>
				<div class="dTD" style="width: 15em" id="divPerson">
					<div class="dTR">
						<div class="dTD">
							<asp:Label ID="Label5" runat="server">人員：</asp:Label>
							<asp:button id="btPersonAdd" runat="server" Text="新增"></asp:button>
						</div>
					</div>
					<div class="dTR">
						<div class="GridDiv" style="overflow: auto; height: 300px" data-fixed="true">
							<table id="dgPerson" border="1" runat="server" autogeneratecolumns="False" gridlines="Vertical" headerstyle-horizontalalign="Center" itemstyle-horizontalalign="Center"
								style="color: Black; background-color: White; border-color: #DEDFDE; border-width: 1px; border-style: None; border-collapse: collapse;">
								<tbody>
									<tr>
										<td style="width: 1.5em">選</td>
										<td style="width: 10.5em">人員</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div class="dTD" style="width: 15em" id="divNew">
					<div class="dTR">
						<div id="Table1" class="dTD DgSelectToolBar">
							<asp:Button ID="btSelectAll" runat="server" Text="全選" />
							<asp:Button ID="btSelectInverse" runat="server" Text="反選" />
							<asp:Button ID="btDeleteSelected" runat="server" Text="刪除" />
						</div>
					</div>
					<div class="dTR">
						<div class="GridDiv" style="overflow: auto; height: 300px" data-fixed="true">
							<table id="dgBack" border="1" runat="server" autogeneratecolumns="False" gridlines="Vertical" headerstyle-horizontalalign="Center" itemstyle-horizontalalign="Center"
								style="color: Black; background-color: White; border-color: #DEDFDE; border-width: 1px; border-style: None; border-collapse: collapse;">
								<tbody>
									<tr>
										<td style="width: 1.5em">選</td>
										<td style="width: 10.5em">對象</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
            </div>
        </div>
        <asp:Panel ID="tbTool" CssClass="V2_GenericBannerToolBar" runat="server">
            <asp:Button ID="btCheck" runat="server" Text="確認" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btQuit" runat="server" Text="離開" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
