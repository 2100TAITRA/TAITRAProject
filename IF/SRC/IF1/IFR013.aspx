<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="IFR013.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFR013" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>IFR013 權利擁有者查詢作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="IFR013" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable">
                <div class="dTR">
                    <asp:Panel CssClass="dTD DgSelectToolBar" ID="dgTool" runat="server">
                        <asp:Button ID="btSelectAll" runat="server" Text="全選" />
                        <asp:Button ID="btSelectInverse" runat="server" Text="反向" />
                        <asp:Button ID="btSelectClear" runat="server" Text="清除" />
                    </asp:Panel>
                </div>
                <div class="GridDiv" style="height: 10.5em">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="50" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="2">
                        <Columns>
                            <asp:BoundColumn DataField="PRIV_NO" HeaderText="序"></asp:BoundColumn>
                            <asp:TemplateColumn HeaderText="選">
                                <ItemTemplate>
                                    <asp:CheckBox ID="cbSelect" runat="server"></asp:CheckBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:BoundColumn DataField="PRIV_NAME" HeaderText="權利"></asp:BoundColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv" style="height: 1em">
                </div>
                <div class="GridDiv" style="height: 9.5em">
                    <asp:DataGrid ID="dg2" runat="server" PageSize="50" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="2">
                        <Columns>
                            <asp:BoundColumn DataField="SEQ_NO" HeaderText="序"></asp:BoundColumn>
                            <asp:BoundColumn DataField="PRIV_NM" HeaderText="權利"></asp:BoundColumn>
                            <asp:BoundColumn DataField="USER_OWN" HeaderText="擁有者"></asp:BoundColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:DropDownList Style="z-index: 102; position: absolute; top: 616px; left: 392px" ID="dlPrivNo"
            runat="server" CssClass="hide">
        </asp:DropDownList>
        <asp:DropDownList Style="z-index: 103; position: absolute; top: 616px; left: 528px" ID="dlUser" runat="server"
            CssClass="hide">
        </asp:DropDownList>
    </form>
</body>
</html>
