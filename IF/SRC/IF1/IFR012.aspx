<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="IFR012.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFR012" %>

<!DOCTYPE HTML >
<html>
<head>
    <title>IFR012 可用之程式選單查詢作業</title>
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
    <form id="IFR012" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">查詢對象：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txTarget" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="4.5em"></asp:TextBox>
                        <asp:Button ID="btSelect" runat="server" Text="選擇"></asp:Button>
                        <asp:TextBox ID="txAccount" TabIndex="-1" runat="server" CssClass="hide" Width="1.5em"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv" style="height: 385px; overflow: auto">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" CellPadding="2" PageSize="50" AutoGenerateColumns="False" Height="1px">
                        <Columns>
                            <asp:BoundColumn DataField="SEQ_NO" HeaderText="序"></asp:BoundColumn>
                            <asp:BoundColumn DataField="APP_ID" HeaderText="編號"></asp:BoundColumn>
                            <asp:BoundColumn DataField="APP_NAME" HeaderText="名　　稱"></asp:BoundColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
