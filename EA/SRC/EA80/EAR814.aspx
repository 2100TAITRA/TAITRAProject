<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAR814.aspx.cs" AutoEventWireup="false" Inherits="EA80.EAR814" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAR814 檔卷暫借清單</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EAR814" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">案卷類型：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:radiobutton id="rbFileClsAA" runat="server" Text="專案卷" GroupName="FileClsType"></asp:radiobutton>
                        <asp:radiobutton id="rbFileClsBB" runat="server" Text="列管卷" GroupName="FileClsType"></asp:radiobutton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">點收批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAcpNoS" TabIndex="0" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="10"></asp:TextBox>
                        <asp:imagebutton id="ibtAcp1" tabIndex="-1" runat="server" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:imagebutton>
                        <asp:Label id="Label2" runat="server" CssClass="RequireField">─</asp:Label>
                        <asp:TextBox ID="txAcpNoE" TabIndex="0" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="10"></asp:TextBox>
                        <asp:imagebutton id="ibtAcp2" tabIndex="-1" runat="server" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:imagebutton>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
