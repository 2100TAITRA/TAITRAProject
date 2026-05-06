<%@ Page Language="c#" CodeBehind="IFR010.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFR010" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>IFR010 組織人員之權利查詢作業</title>
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
    <form id="IFR010" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbOrg" class="KeyField" runat="server">所屬機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlOrg" runat="server"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">查詢對象：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txTarget" TabIndex="-1" runat="server" Width="12.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                        <asp:Button ID="btSelect" runat="server" Text="選擇"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">查詢範圍：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlScope" runat="server" Width="10em">
                            <asp:ListItem Value="0" Selected="True">查詢對象</asp:ListItem>
                            <asp:ListItem Value="1">查詢對象之下的人員</asp:ListItem>
                            <asp:ListItem Value="2">查詢對象+其下的人員</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv" style="height: 375px; overflow: auto">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="50" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="2">
                        <Columns>
                            <asp:BoundColumn DataField="SEQ_NO" HeaderText="序"></asp:BoundColumn>
                            <asp:BoundColumn DataField="PRIV_NAME" HeaderText="名稱"></asp:BoundColumn>
                            <asp:BoundColumn DataField="PRIV_OWN" HeaderText="權利"></asp:BoundColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:DropDownList Style="z-index: 107; position: absolute; top: 632px; left: 552px" ID="dlUser" runat="server" CssClass="hide"></asp:DropDownList>
        <asp:TextBox Style="z-index: 108; position: absolute; top: 584px; left: 112px" ID="txOrgNo" TabIndex="-1" runat="server" Width="216px" CssClass="hide"></asp:TextBox>
        <asp:TextBox Style="z-index: 109; position: absolute; top: 584px; left: 520px" ID="txPath" TabIndex="-1" runat="server" Width="209px" CssClass="hide"></asp:TextBox>
        <asp:DropDownList Style="z-index: 110; position: absolute; top: 672px; left: 664px" ID="dlPriv" runat="server" CssClass="hide"></asp:DropDownList>
    </form>
</body>
</html>
