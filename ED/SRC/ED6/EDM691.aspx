<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDM691.aspx.cs" AutoEventWireup="false" Inherits="ED6.EDM691" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDM691 辦理情形代碼維護作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDM691" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server" Style="z-index: 0"></asp:ValidationSummary>
            <asp:ListBox Style="z-index: 0" ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">辦理情形代碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFlowCodes" TabIndex="0" runat="server" Width="1.5em" CssClass="KeyFieldNumeric" MaxLength="2"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">辦理情形名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFlowName" TabIndex="0" runat="server" Width="10.5em" Height="25px" CssClass="RequireField" MaxLength="20"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label3" runat="server" CssClass="RequireField">結案別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlCloseType" runat="server" Width="10.5em" CssClass="RequireField"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label4" runat="server" CssClass="RequireField">時效計算性質：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlTimeCount" runat="server" Width="10.5em" CssClass="RequireField"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label5" runat="server" CssClass="RequireField">外審單位性質：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlOutState" runat="server" Width="10.5em" CssClass="RequireField"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label6" runat="server" CssClass="RequireField">初篩性質：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlScreenType" runat="server" Width="10.5em" CssClass="RequireField"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle">
                        <asp:CheckBox ID="cbIsExtend" runat="server" Width="8.5em" Text="是否具展延性質"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle">
                        <asp:CheckBox ID="cbPermitMark" runat="server" Width="11.5em" Text="是否需註記許可證字號"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle">
                        <asp:CheckBox ID="cbPermitNotify" runat="server" Width="11.5em" Text="是否領證通知"></asp:CheckBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button runat="server" Style="display: none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen" TabIndex="1"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="儲存" DefaultStyle="newmode:block;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="刪除" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
