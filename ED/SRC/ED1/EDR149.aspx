<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR149.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDR149" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDR149 電子收文統計列印作業</title>
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
    <form id="EDR149" onkeyup="jf_CheckFull();" method="post" runat="server">
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
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label1" runat="server">收文模組接收日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcvDateS" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>－
                        <asp:TextBox ID="txRcvDateE" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label3" runat="server">來文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFromDateS" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>－
                        <asp:TextBox ID="txFromDateE" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label4" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNoS" runat="server" Width="5.5em" MaxLength="15"></asp:TextBox>－
                        <asp:TextBox ID="txDocNoE" runat="server" Width="5.5em" MaxLength="15"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="Label2" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept" CssClass="comboBox" runat="server"></cc1:ComboBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="預覽" DefaultStyle="newmode:block;modifymode:block;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Text="清除" DefaultStyle="newmode:block;modifymode:block;" ID="btClean"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
