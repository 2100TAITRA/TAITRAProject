<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAT295.aspx.cs" AutoEventWireup="false" Inherits="EA02.EAT295" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAT295 待掃描批號狀態維護作業</title>
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
    <form id="EAT295" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="txhidden" runat="server" Width="80px" EnableViewState="False" AutoPostBack="True"></asp:TextBox>
            <asp:TextBox ID="txhidden2" runat="server" Width="80px" EnableViewState="False" AutoPostBack="True"></asp:TextBox>
            <asp:TextBox ID="txhidden3" runat="server" Width="80px" EnableViewState="False" AutoPostBack="True"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="lbScanNo" runat="server">待掃描批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txScanNo" TabIndex="0" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                        <asp:Button ID="btConfirm" runat="server" Text="確認"></asp:Button>
                        <asp:CheckBox ID="cbAutoAdd" runat="server" Text="讀取後自動加入捲動區"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="lbState" runat="server">新狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlState" runat="server">
                            <asp:ListItem Value="1">送掃描</asp:ListItem>
                            <asp:ListItem Value="2">已收件待掃描</asp:ListItem>
                            <asp:ListItem Value="3">已掃描送回</asp:ListItem>
                            <asp:ListItem Value="4">收件歸檔</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="GridTable">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Panel ID="tbSelect" runat="server" EnableViewState="False" CssClass="DgSelectToolBar">
                            <asp:Button runat="server" Text="全部選取" ID="btSelectAll" ToolTip="勾選所有的CheckBox"></asp:Button>
                            <asp:Button runat="server" Text="反向選取" ID="btSelectInverse" ToolTip="反向勾選所有的CheckBox"></asp:Button>
                            <asp:Button runat="server" Text="清除選取" ID="btSelectClear" ToolTip="清除勾選所有的CheckBox"></asp:Button>
                            <asp:Button runat="server" Text="刪除選取" ID="btDeleteSelected" ToolTip="將所勾選資料列刪除(可同時多筆)"></asp:Button>
                        </asp:Panel>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <div style="height: 14em">
                            <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" GridLines="Vertical" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemTemplate>
                                            <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="選">
                                        <ItemTemplate>
                                            <asp:CheckBox ID="cbSelect" TabIndex="0" runat="server"></asp:CheckBox>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="待掃描批號">
                                        <ItemTemplate>
                                            <asp:Label ID="lbWscanNo" runat="server" Width="22px"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="目前狀態">
                                        <ItemTemplate>
                                            <asp:Label ID="lbNowState" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="更新日期">
                                        <ItemTemplate>
                                            <asp:Label ID="lbUpdateDate" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="更新人">
                                        <ItemTemplate>
                                            <asp:Label ID="lbUpdateUser" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" EnableViewState="False" CssClass="V3_GenericBannerToolBar">
            <asp:Button runat="server" Style="display: none" Text="狀態更新(S)" DefaultStyle="newmode:block;modifymode:block;" ID="btSave" AccessKey="S" Title="狀態更新(ALT+S)"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
