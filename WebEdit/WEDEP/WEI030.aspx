<%@ Page Language="c#" CodeBehind="wei030.aspx.cs" AutoEventWireup="false" Inherits="WebEditWs.wei030"%>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>WEI030 常用詞庫查詢作業</title>
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
    <form id="wei030" method="post" runat="server">
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
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 4.5em">
                        <asp:Label ID="Label3" runat="server">關鍵字：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txWord" TabIndex="20" runat="server" Width="20em"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
				<div class="dTD" style="width: 20em" id="divOrg">
					<div class="dTR">
						<div class="dTD" style="width: 20em">
							<asp:Label ID="Label4" runat="server">共用詞庫：</asp:Label>
						</div>
					</div>
					<div class="dTR">
						<div class="GridDiv" style="height: 200px">
							<asp:DataGrid ID="dg2" runat="server" PageSize="50" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False">
								<Columns>
									<asp:TemplateColumn HeaderText="序">
										<ItemTemplate>
											<asp:Label ID="lbNoOrg" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="共用詞">
										<ItemTemplate>
											<asp:HyperLink ID="lkDictOrg" runat="server" Style="text-align: left;"></asp:HyperLink>
										</ItemTemplate>
									</asp:TemplateColumn>
								</Columns>
							</asp:DataGrid>
						</div>
					</div>
				</div>
				<div class="dTD" style="width: 20em" id="divPerson">
					<div class="dTR">
						<div class="dTD" style="width: 20em">
							<asp:Label ID="Label5" runat="server">個人詞庫：</asp:Label>
						</div>
					</div>
					<div class="dTR">
						<div class="GridDiv" style="height: 200px">
							<asp:DataGrid ID="dg1" runat="server" PageSize="50" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False">
								<Columns>
									<asp:TemplateColumn HeaderText="序">
										<ItemTemplate>
											<asp:Label ID="lbNo" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="常用詞">
										<ItemTemplate>
											<asp:HyperLink ID="lkDict" runat="server" Style="text-align: left;"></asp:HyperLink>
										</ItemTemplate>
									</asp:TemplateColumn>
								</Columns>
							</asp:DataGrid>
						</div>
					</div>
				</div>
            </div>
        </div>
        <asp:Panel ID="tbTool" CssClass="V2_GenericBannerToolBar" runat="server">
            <asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
