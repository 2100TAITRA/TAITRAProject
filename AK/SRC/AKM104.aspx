<%@ Page Language="c#" CodeBehind="AKM104.aspx.cs" AutoEventWireup="false" Inherits="AK.AKM104" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKM104 庫房管理人維護作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="AKM104" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 3.5em">
                        <asp:Label class="KeyField" ID="Label2" runat="server">帳號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlAcc" runat="server" CssClass="KeyField"></asp:DropDownList>
                    </div>
                </div>
            </div>
            <asp:Label ID="lbOrgNo" runat="server" CssClass="hide"></asp:Label>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD" style="width: 12em">
                        <asp:Label ID="Label4" runat="server" Width="9.5em">機關庫房管理權限：</asp:Label>
                        <div class="GridDiv">
                            <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" CellPadding="2" PageSize="50" AutoGenerateColumns="False">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                        <ItemTemplate>
                                            <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="管理單位">
                                        <ItemTemplate>
                                            <asp:DropDownList ID="dlDept" runat="server" Width="8.5em"></asp:DropDownList>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                    <div class="dTD" style="width: 12em">
                        <asp:Label ID="Label5" runat="server" Width="9.5em">單位庫房管理權限：</asp:Label>
                        <div class="GridDiv">
                            <asp:DataGrid ID="dg2" runat="server" GridLines="Vertical" CellPadding="2" PageSize="50" AutoGenerateColumns="False">
                                <Columns>
                                    <asp:TemplateColumn HeaderText="序">
                                        <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                        <ItemTemplate>
                                            <asp:Label ID="lbSeq" runat="server"></asp:Label>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                    <asp:TemplateColumn HeaderText="管理單位">
                                        <ItemTemplate>
                                            <asp:DropDownList ID="dlDept" runat="server" Width="8.5em"></asp:DropDownList>
                                        </ItemTemplate>
                                    </asp:TemplateColumn>
                                </Columns>
                            </asp:DataGrid>
                        </div>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <asp:Label ID="Label1" runat="server" Width="27em">註：若欲選擇之單位不在下拉選單中，請先至AKM103針對欲選擇之單位進行維護後，再使用本程式。&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</asp:Label>
            </div>
            <asp:ListBox ID="H_lbOrgDept" runat="server" CssClass="hide"></asp:ListBox>
            <asp:ListBox ID="H_lbDept" runat="server" CssClass="hide"></asp:ListBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
