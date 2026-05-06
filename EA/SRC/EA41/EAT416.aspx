<%@ Page Language="c#" CodeBehind="EAT416.aspx.cs" AutoEventWireup="false" Inherits="EA41.EAT416" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAT416 抽樣結果統計表</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EAT416" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:ListBox ID="lbDept" runat="server" CssClass="hide"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">清理批號：</asp:Label></div>
                    <div class="dTD">
                        <asp:TextBox ID="txPlanNo" TabIndex="0" runat="server" Width="4.5em" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btPLAN" TabIndex="-1" runat="server" Title="提示計畫批號" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:ImageButton></div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="GridDiv" style="height: 15.5em">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="清理批號">
                                <ItemTemplate>
                                    <asp:Label ID="lbPLAN_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="抽樣編號">
                                <ItemTemplate>
                                    <asp:Label ID="lbSAMPLING_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="抽樣條件">
                                <ItemTemplate>
                                    <asp:Label ID="lbSAMPLING_DATA" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="搜尋" ImageUrl="../../../STD/IMAGE/Search_E.gif" DefaultStyle="newmode:block;modifymode:block;" ID="btSearch" AccessKey="F" Title="搜尋(ALT+F)"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預覽" ImageUrl="../../../STD/IMAGE/PREVIEW_E.gif" DefaultStyle="newmode:block;modifymode:block;" ID="btPreview" AccessKey="E" Title="預覽(ALT+E)"></asp:Button>
            <asp:Button runat="server" Style="display: none" CssClass="hide" Text="列印" ImageUrl="../../../STD/IMAGE/PRINT_E.gif" DefaultStyle="newmode:block;modifymode:block;" ID="btPrint" AccessKey="P" Title="列印(ALT+P)"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
