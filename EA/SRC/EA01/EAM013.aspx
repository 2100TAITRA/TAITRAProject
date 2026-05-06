<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAM013.aspx.cs" AutoEventWireup="false" Inherits="EA01.EAM013" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAM013 單位調案設定作業</title>
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
    <form id="EAM013" onkeyup="jf_CheckFull()" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">調案單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txBorOU" runat="server" Width="1.5em" CssClass="KeyFieldNumeric" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireFieldNumeric">預設調案天數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDefBorDay" runat="server" Width="1.5em" CssClass="RequireField" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label3" runat="server" CssClass="RequireFieldNumeric">可展期次數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txExtTimeLmt" runat="server" Width="1em" CssClass="RequireField" MaxLength="2"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label4" runat="server" CssClass="RequireFieldNumeric">可展期天數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txExtDayLmt" runat="server" Width="1.5em" CssClass="RequireField" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" ID="btOpen" DefaultStyle="newmode:block;modifymode:none;" Text="開啟"></asp:Button>
            <asp:Button runat="server" Style="display: none" ID="btSave" DefaultStyle="newmode:block;modifymode:block;" Text="儲存"></asp:Button>
            <asp:Button runat="server" Style="display: none" ID="btClean" DefaultStyle="newmode:block;modifymode:none;" Text="清除"></asp:Button>
            <asp:Button runat="server" Style="display: none" ID="btDelete" DefaultStyle="newmode:none;modifymode:block;" Text="刪除"></asp:Button>
            <asp:Button runat="server" Style="display: none" ID="btCancel" DefaultStyle="newmode:none;modifymode:block;" Text="取消"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
