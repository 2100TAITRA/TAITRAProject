<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR212.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDR212" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDR212 陳判未結案件清單列印作業</title>
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
    <form id="EDR212" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server" CssClass="Hide"></asp:TextBox>
            <asp:DropDownList ID="H_SuperiorDept_List" runat="server" CssClass="Hide"></asp:DropDownList>
            <asp:DropDownList ID="H_CommonDept_List" runat="server" CssClass="Hide"></asp:DropDownList>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDept" CssClass="comboBox" runat="server" Width="10.5em"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server" CssClass="RequireField">陳判對象：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbL1" runat="server" Text="一層決行單位"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">&nbsp</div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbL2" runat="server" Text="二層決行單位(僅線上簽核公文)"></asp:CheckBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btExcel" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="匯出Excel"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
