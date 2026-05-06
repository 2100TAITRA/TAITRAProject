<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="IFM001.aspx.cs" AutoEventWireup="false" Inherits="EA01.IFM001" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>IFM001 機關維護作業</title>
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
    <form id="IFM001" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">機關代碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSourceOrgno" TabIndex="0" runat="server" Width="10.5em" CssClass="KeyUpperField" MaxLength="20"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">機關名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txMissionOgrName" TabIndex="0" runat="server" Width="10.5em" CssClass="RequireField" MaxLength="20"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv" data-fixed="true">
                    <asp:DataGrid ID="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="3">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="Label3" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="帳號">
                                <ItemTemplate>
                                    <asp:TextBox ID="txUserName" TabIndex="0" runat="server" Width="5em" MaxLength="20"></asp:TextBox>
                                    <asp:Button ID="btSet" runat="server" Text="設定"></asp:Button>
                                    <asp:Button ID="btDel" runat="server" Text="刪除"></asp:Button>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="姓名">
                                <ItemTemplate>
                                    <asp:TextBox ID="txEmpName" runat="server" Width="5em" CssClass="displayOnly"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
                <div class="GridDiv">
                    <asp:DataGrid ID="dg2" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="3">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQNO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="機關代碼">
                                <ItemTemplate>
                                    <asp:TextBox ID="txMissionOrgno" TabIndex="0" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                                    <asp:TextBox Style="z-index: 0" ID="h_OrgIdentity" runat="server" Width="10.5em" CssClass="hide"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="名稱">
                                <ItemTemplate>
                                    <asp:TextBox ID="txMissionOrgName" runat="server"></asp:TextBox>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:none;modifymode:none;" />
        </asp:Panel>
        <asp:TextBox Style="z-index: 102; left: 800px; position: absolute; top: 232px" ID="H_ORGMGR1"
            runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox Style="z-index: 103; left: 800px; position: absolute; top: 272px" ID="H_ORGMGR2"
            runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox Style="z-index: 104; left: 800px; position: absolute; top: 312px" ID="H_ORGMGR3"
            runat="server" CssClass="hide"></asp:TextBox>
        <asp:DropDownList Style="z-index: 105; left: 808px; position: absolute; top: 328px" ID="H_dlUSERNAME"
            runat="server" Width="184px" CssClass="hide" Height="30px">
        </asp:DropDownList>
        <asp:TextBox Style="z-index: 106; left: 808px; position: absolute; top: 360px" ID="H_CheckOrgMgr"
            runat="server" CssClass="hide"></asp:TextBox>
    </form>
</body>
</html>
