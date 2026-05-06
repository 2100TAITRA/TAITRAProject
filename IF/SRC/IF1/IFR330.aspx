<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="IFR330.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFR330" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>IFR330 代理記錄查詢作業</title>
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
    <form id="IFR330" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">代理期間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDateS" runat="server" CssClass="InputFieldNumeric DatePicker" Width="4em" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server">─</asp:Label>
                        <asp:TextBox ID="txDateE" runat="server" CssClass="InputFieldNumeric DatePicker" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label4" runat="server">被代理人組室：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDept" runat="server" Width="7.5em"></asp:DropDownList>
                        <asp:DropDownList ID="dlSect" runat="server" Width="7.5em"></asp:DropDownList>
                        <asp:TextBox ID="H_txSectNo" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label2" runat="server">被代理人帳號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAccountP" runat="server" Width="5em"></asp:TextBox>
                        <asp:TextBox ID="txPlayRoleP" runat="server" CssClass="displayOnly" Width="5em"></asp:TextBox>
                        <asp:Button ID="btSetP" runat="server" Text="設定"></asp:Button>
                        <asp:TextBox ID="authWS" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label3" runat="server">代理人帳號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAccount" runat="server" Width="5em"></asp:TextBox>
                        <asp:TextBox ID="txPlayRole" runat="server" CssClass="displayOnly" Width="5em"></asp:TextBox>
                        <asp:Button ID="btSet" runat="server" Text="設定"></asp:Button>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div style="overflow: auto; height: 17.5em">
                    <asp:DataGrid ID="dg1" runat="server" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
                        <Columns>
                            <asp:TemplateColumn HeaderText="序">
                                <ItemTemplate>
                                    <asp:Label ID="lbSEQ_NO" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="被代理人">
                                <ItemTemplate>
                                    <asp:Label ID="lbUSERNAME" runat="server"></asp:Label>
                                    <asp:Label ID="lbEMP_NAME_1" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="代理角色">
                                <ItemTemplate>
                                    <asp:Label ID="lbROLE_NAME" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="代理人">
                                <ItemTemplate>
                                    <asp:Label ID="lbPROXY_USER" runat="server"></asp:Label>
                                    <asp:Label ID="lbEMP_NAME_2" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="代理期間">
                                <ItemTemplate>
                                    <asp:Label ID="lbSTART_DATE" runat="server"></asp:Label>
                                    <asp:Label ID="lbEND_DATE" runat="server" CssClass="hide"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                            <asp:TemplateColumn HeaderText="代理事由">
                                <ItemTemplate>
                                    <asp:Label ID="lbPROXY_REASON" runat="server"></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateColumn>
                        </Columns>
                    </asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="開啟" DefaultStyle="newmode:none;modifymode:none;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="儲存" DefaultStyle="newmode:none;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:none;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="刪除" DefaultStyle="newmode:none;modifymode:none;" ID="btDelete"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:none;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="列印" CssClass="hide" DefaultStyle="newmode:block;modifymode:none;" ID="btPrint"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
