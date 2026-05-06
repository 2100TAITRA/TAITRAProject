<%@ Page Language="c#" CodeBehind="AKT410C1.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT410C1" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKT410C1 檔案清理計畫查詢子視窗</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="AKT410C1" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">制定日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDate1" TabIndex="2" runat="server" MaxLength="7" CssClass="DatePicker" Width="4em"></asp:TextBox>
                        <asp:Label ID="Label10" runat="server">─</asp:Label>
                        <asp:TextBox ID="txDate2" TabIndex="2" runat="server" MaxLength="7" CssClass="DatePicker" Width="4em"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="50" CellPadding="4" GridLines="Vertical" AutoGenerateColumns="False">
                        <Columns>
                            <asp:TemplateColumn HeaderText="批號">
                                <ItemTemplate>
                                    <asp:HyperLink ID="PLAN_NO" title="" runat="server"></asp:HyperLink>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="制定日期">
                                <HeaderStyle Width="4.5em"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:Label ID="PLAN_DATE" TabIndex="0" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="檔號範圍">
                                <ItemTemplate>
                                    <asp:Label ID="FILENO" TabIndex="0" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="機密等級">
                                <HeaderStyle Width="4.5em"></HeaderStyle>
                                <ItemTemplate>
                                    <asp:Label ID="SECRET_NO" TabIndex="0" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="計劃狀態">
                                <ItemTemplate>
                                    <asp:Label ID="PLAN_STATUS" TabIndex="0" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <div id="hiddenDiv" style="display: none; z-index: 109; left: 728px; overflow: auto; width: 134px; position: absolute; top: 21px; height: 181px">
            <asp:ValidationSummary ID="ValidationSummary1" runat="server" CssClass="hidden"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" CssClass="hidden"></asp:ListBox>
            <asp:CustomValidator ID="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:TextBox ID="txFileNoSep" runat="server" Width="2em"></asp:TextBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
