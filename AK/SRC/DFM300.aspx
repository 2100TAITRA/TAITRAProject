<%@ Page Language="c#" CodeBehind="DFM300.aspx.cs" AutoEventWireup="false" Inherits="DF.DFM300" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>DFM300 工作群組設定作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="DFM300" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; position: absolute; top: 102px; left: 10px"
            runat="server" CssClass="hide"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label class="KeyField" ID="Label1" runat="server">工作群組編號：</asp:Label></div>
                    <div class="dTD">
                        <asp:TextBox class="KeyUpperField" ID="txWgrpNo" TabIndex="10" runat="server" Width="1.5em" MaxLength="2">12</asp:TextBox></div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label4" runat="server">工作群組名稱：</asp:Label></div>
                    <div class="dTD">
                        <asp:TextBox ID="txWgrpName" TabIndex="20" runat="server" Width="22em"
                            MaxLength="20"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label5" runat="server" class="KeyField">使用機關代碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlOrgNo" TabIndex="20" runat="server" class="KeyField"></asp:DropDownList>
                        <asp:Label ID="lbOrgNo" TabIndex="20" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label2" runat="server">UUID：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUUID" TabIndex="20" runat="server" Width="22em" MaxLength="2000"
                            TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 103; position: absolute; top: 218px; left: 12px"
            runat="server" CssClass="hide" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 104; position: absolute; top: 252px; left: 12px"
            runat="server" CssClass="hide"></asp:ValidationSummary>
        <asp:TextBox ID="txWgrpNoChanged" Style="z-index: 105; position: absolute; top: 188px; left: 786px"
            runat="server" CssClass="hide" AutoPostBack="True"></asp:TextBox>
        <asp:TextBox ID="htxActiveGrpBtn" Style="z-index: 106; position: absolute; top: 86px; left: 284px"
            TabIndex="-1" runat="server" CssClass="hide"></asp:TextBox>
    </form>
</body>
</html>
