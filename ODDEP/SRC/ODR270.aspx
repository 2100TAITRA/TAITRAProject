<%@ Page Language="c#" CodeBehind="ODR270.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR270" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODR270 公文辦理成績統計作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODR270" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">年度：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8.5em">
                        <asp:TextBox ID="txYear" runat="server" CssClass="InputFieldNumeric" MaxLength="3" Width="2em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 3.5em">
                        <asp:Label ID="Label1" runat="server">格式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlFormat" runat="server">
                            <asp:ListItem Value="0">年報表</asp:ListItem>
                            <asp:ListItem Value="1">第一季</asp:ListItem>
                            <asp:ListItem Value="2">第二季</asp:ListItem>
                            <asp:ListItem Value="3">第三季</asp:ListItem>
                            <asp:ListItem Value="4">第四季</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8.5em">
                        <asp:DropDownList ID="dlDept" runat="server" Width="7.5em"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 3.5em; min-height:1px"></div>
                    <div class="dTD">
                        <asp:CheckBox ID="cbChangePage" TabIndex="-1" runat="server" Text="依單位換頁"></asp:CheckBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" EnableViewState="False" CssClass="V2_GenericBannerToolBar">
            <asp:Button runat="server" style="display: none" DefaultStyle="newmode:block;modifymode:block;" Text="預覽" ID="btPreview"></asp:Button>
            <asp:Button runat="server" style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" Text="列印" ID="btPrint"></asp:Button>
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
