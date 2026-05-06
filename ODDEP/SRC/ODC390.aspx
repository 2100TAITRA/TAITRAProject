<%@ Page Language="c#" CodeBehind="ODC390.aspx.cs" AutoEventWireup="false" Inherits="OD.ODC390" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODC390 大宗掛號單查詢作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODC390" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label1" runat="server">大宗掛號單代碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txBulkNo" runat="server" MaxLength="2" Width="1.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8.5em">
                        <asp:Label ID="Label2" runat="server">大宗掛號單名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txBulkName" runat="server" MaxLength="20" Width="10.5em"></asp:TextBox>
                    </div>
                </div>
            </div>

            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <div style="height: 13.5em">
                            <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" PageSize="50" AutoGenerateColumns="False" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSeqNo" runat="server" Width="10px"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="代碼">
                                        <ItemTemplate>
                                            <asp:HyperLink ID="hlBulkNo" runat="server"></asp:HyperLink>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="名稱">
                                        <ItemTemplate>
                                            <asp:Label ID="lbBulkName" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button runat="server" Style="display: none" Text="搜索" ID="btSearch" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
