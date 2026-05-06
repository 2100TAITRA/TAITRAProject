<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKM330C4.aspx.cs" AutoEventWireup="false" Inherits="AK.AKM330C4" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>AKM330C4 櫥位號查詢作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body class="hidden">
    <form id="AKM330C4" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 4.5em">
                        <asp:Label ID="Label6" runat="server">年度號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileYear" TabIndex="-1" runat="server" Width="2em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 4.5em">
                        <asp:Label ID="Label7" runat="server">分類號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileCls" TabIndex="-1" runat="server" Width="6.5em"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="50" CellPadding="4" GridLines="Vertical" AutoGenerateColumns="False">
                        <Columns>
                            <asp:HyperLinkColumn ItemStyle-Width="9.5em" DataNavigateUrlField="STOCK_NO" DataNavigateUrlFormatString="javascript:ReturnValue(&quot;{0}&quot;)"
                                DataTextField="STOCK_NO" HeaderText="櫥位號">
                                <ItemStyle HorizontalAlign="Center"></ItemStyle>
                            </asp:HyperLinkColumn>
                            <asp:TemplateColumn HeaderText="案件明細" ItemStyle-Width="4.5em">
                                <ItemTemplate>
                                    <asp:Button Width="4em" ID="btViewList" runat="server" Text="瀏覽"></asp:Button>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
   			<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />	
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />		
		</asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 103; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 104; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
        <asp:ValidationSummary ID="ValidationSummary2" Style="z-index: 105; left: 344px; position: absolute; top: 440px" runat="server"></asp:ValidationSummary>
    </form>
</body>
</html>
