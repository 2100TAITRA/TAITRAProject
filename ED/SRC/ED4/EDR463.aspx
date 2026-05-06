<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR463.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR463" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDR463 そゅ快瞶薄穨</title>
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
    <form id="EDR463" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 4.5em">
                        <asp:RadioButton ID="rbMonth" runat="server" GroupName="ChoseYM"></asp:RadioButton>
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">る</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txMonth" TabIndex="0" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:TextBox>
                        <asp:Label ID="Label3" runat="server">ヘ玡程参璸る</asp:Label>
                        <asp:Label ID="lbMonth" runat="server">lbMonth</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 4.5em">
                        <asp:RadioButton ID="rbYear" runat="server" GroupName="ChoseYM"></asp:RadioButton>
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField"></asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYear" TabIndex="0" runat="server" Width="2em" CssClass="RequireFieldNumeric" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label4" runat="server">ヘ玡程参璸</asp:Label>
                        <asp:Label ID="lbYear" runat="server">lbYear</asp:Label>
                    </div>
                </div>
            </div>
            <asp:TextBox ID="h_txYM" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="参璸(S)" Accesskey = "S" Title = "参璸(ALT+S)" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen" TabIndex="1"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="箇凝" DefaultStyle="newmode:block;modifymode:block;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" CssClass="hide" Text="" DefaultStyle="newmode:block;modifymode:block;" ID="btPrint"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
