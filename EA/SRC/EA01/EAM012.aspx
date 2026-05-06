<%@ Page Language="c#" CodeBehind="EAM012.aspx.cs" AutoEventWireup="false" Inherits="EA01.EAM012" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAM012 組室調案核決者設定作業</title>
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
    <form id="EAM012" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="BaseTable" class="DivBaseTable">
            <div id="divTable" class="DivTable">
                <div class="dTR" >
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="lbDept" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept" TabIndex="30" runat="server" Width="9.5em" CssClass="comboBox"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="lbUser" runat="server">核決者：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" TabIndex="40" runat="server" Width="18em" CssClass="comboBox" Rows="10"></cc1:ComboBox>
                    </div>
                </div>
            </div>
            <asp:textbox CssClass="hidden" style="Z-INDEX: 0" id="H_dlDept_Text" tabIndex="0" runat="server" Width="0px" MaxLength="7"></asp:textbox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen" TabIndex="1"></asp:Button>
            <asp:Button runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete"></asp:Button>
            <asp:Button runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
        </asp:Panel>
        <asp:TextBox Style="z-index: 102; position: absolute; top: -384px; left: -40px" ID="H_dlDept_Value" TabIndex="0" runat="server" Width="0px" CssClass="KeyField" MaxLength="7"></asp:TextBox>
        <asp:TextBox CssClass="hidden" Style="z-index: 103; position: absolute; top: 384px; left: 392px" ID="H_dlUser_Value" TabIndex="0" runat="server" Width="0px" MaxLength="7"></asp:TextBox>
        <asp:TextBox Style="z-index: 104; position: absolute; top: 440px; left: 392px" ID="H_SECT_VALUE" runat="server" Width="100px" CssClass="hide"></asp:TextBox>
        <asp:TextBox Style="z-index: 105; position: absolute; top: 384px; left: 208px" ID="H_ROLE_VALUE" runat="server" Width="100px" CssClass="hide"></asp:TextBox>
        <asp:TextBox Style="z-index: 106; position: absolute; top: 416px; left: 208px" ID="H_Artifact" runat="server" Width="100px" CssClass="hide" MaxLength="50" EnableViewState="False" Enabled="False"></asp:TextBox>
        <asp:TextBox Style="z-index: 107; position: absolute; top: 448px; left: 208px" ID="H_RE_DEPT_NO" runat="server" Width="100px" CssClass="hide"></asp:TextBox>
        <asp:TextBox Style="z-index: 108; position: absolute; top: 408px; left: 392px" ID="H_RE_ROLE_NO" runat="server" Width="100px" CssClass="hide"></asp:TextBox>
        <asp:TextBox Style="z-index: 109; position: absolute; top: 384px; left: 512px" ID="H_RE_USERNAME" runat="server" Width="100px" CssClass="hide"></asp:TextBox>
        <div style="visibility: hidden;" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
    </form>
</body>
</html>
