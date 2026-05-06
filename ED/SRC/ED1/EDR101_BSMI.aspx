<%@ Page Language="c#" CodeBehind="EDR101_BSMI.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDR101_BSMI" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR101_BSMI 郵件送件單列印作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDR101_BSMI" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Sect" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">登錄時間：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcvDateTimeS" TabIndex="0" runat="server" Width="6.5em" CssClass="InputFieldNumeric" MaxLength="11"></asp:TextBox>
                        <asp:Label ID="Label4" runat="server">～</asp:Label>
                        <asp:TextBox ID="txRcvDateTimeE" TabIndex="0" runat="server" Width="6.5em" CssClass="InputFieldNumeric" MaxLength="11"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server">(0940929或09409291430)</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">收件單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:combobox id="dlDept" tabIndex="30" runat="server" Width="8em" CssClass="comboBox"></cc1:combobox>
                        <cc1:combobox id="dlSect" tabIndex="40" runat="server" Width="8em" CssClass="comboBox"></cc1:combobox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">郵件類別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBoxList ID="cblMailType" runat="server" RepeatDirection="Horizontal"></asp:CheckBoxList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em; min-height: 1px"></div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbNewPage" runat="server" Text="跨組室自動換頁"></asp:CheckBox>
                        <asp:CheckBox ID="cbTwoInOne" runat="server" Text="報表一式兩份"></asp:CheckBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel id="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="預覽" ID="btPreview"></asp:Button>
            <asp:Button runat="server" CssClass="hide" Text="列印" ID="btPrint"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
