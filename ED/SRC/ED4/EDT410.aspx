<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDT410.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDT410" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDT410 取消決行作業</title>
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
    <form id="EDT410" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbDocNo" runat="server" CssClass="KeyField">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNo" runat="server" Width="5.5em" CssClass="KeyUpperField" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbAppUserName" runat="server">決行者：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 5.5em">
                        <asp:TextBox ID="txAppUserName" runat="server" Width="5.5em" CssClass="DisplayOnly" MaxLength="20" ReadOnly="True"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbAppDate" runat="server" Width="4em">決行日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAppDate" runat="server" Width="4em" CssClass="DisplayOnly InputFieldNumeric" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Text="刪除決行(D)" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete" AccessKey="D" Title="刪除決行(ALT+D)"></asp:Button>
            <asp:Button runat="server" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
