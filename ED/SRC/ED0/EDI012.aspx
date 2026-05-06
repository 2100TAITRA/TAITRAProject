<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDI012.aspx.cs" AutoEventWireup="false" Inherits="ED0.EDI012" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDI012 來文文字子視窗</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <link href="../EDLIB/EDLIB.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDI012" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_txArchiveDir" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_txFileDictionary" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_txWebService" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_txArtifact" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_txFileSeq" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_txSourceOrgno" runat="server"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server">來文機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcvorg_name" runat="server" MaxLength="60" Width="27em" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server">來文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 19em">
                        <asp:TextBox ID="txRcvorg_date" runat="server" MaxLength="9" Width="12em" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label4" runat="server">來文字號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 19em">
                        <asp:TextBox ID="txRcv_FromNo" runat="server" MaxLength="50" Width="12em" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label7" runat="server">主旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcv_subject" runat="server" Width="36.25em" TextMode="MultiLine" Rows="4" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label3" runat="server">來文內容：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcv_DataContext" runat="server" Width="36.25em" TextMode="MultiLine" Rows="6" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label5" runat="server">聯絡方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcv_ContactInfo" runat="server" Width="36.25em" TextMode="MultiLine" Rows="5" ReadOnly="True" CssClass="DisplayOnly"></asp:TextBox>
                    </div>
                </div>
                <div class="DivTable">
                    <div class="GridDiv" style="height: 20%">
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button runat="server" Style="display: none" Text="下載文字檔" ID="btDownload" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
