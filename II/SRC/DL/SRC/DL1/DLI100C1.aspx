<%@ Page Language="c#" CodeBehind="DLI100C1.aspx.cs" AutoEventWireup="false" Inherits="DL1.DLI100C1" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html lang="zh-tw">
<head>
    <meta charset="utf-8">
    <title>DLI100C1 驗證碼明細子視窗</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <link rel="stylesheet" type="text/css" href="DLI100C1.css">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>

    <!--#include file="/STDN/Lib/Script.shtml"-->
</head>
<body>
    <form id="DLI100C1" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <div style="z-index: 0; position: absolute; width: 10px; height: 10px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:Label ID="ValidationSummary1" runat="server"></asp:Label>
            <asp:ListBox ID="lbReturnValue" runat="server"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable" style="width: 99%">
            <div class="DivTable">
				<asp:Label ID="lbDocNo" runat="server" style="width:100%;white-space: pre-wrap;"></asp:Label><br/><br/>
                <asp:Label ID="lbFileVerify" runat="server" style="width:100%;white-space: pre-wrap;"></asp:Label>
                <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
                    <asp:Button runat="server" Text="關閉" ID="btClose" ToolTip="關閉"></asp:Button>
                </asp:Panel>
            </div>
        </div>
    </form>
</body>
</html>
