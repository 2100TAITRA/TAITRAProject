<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODR485.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR485" %>

<!DOCTYPE HTML >
<html>
<head>
    <title>ODR485 公文電子交換日報表</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="ODR485" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 101; position: absolute; top: 102px; left: 10px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="KeyField" ID="Label1" runat="server" CssClass="RequireField">列印日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSDate" TabIndex="10" runat="server" CssClass="RequireFieldNumeric DatePicker" MaxLength="7" Width="3.5em"></asp:TextBox>－
						<asp:TextBox ID="txEDate" TabIndex="15" runat="server" CssClass="RequireFieldNumeric DatePicker" MaxLength="7" Width="3.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:CheckBox Style="z-index: 0" ID="cbIsUnit" runat="server" Width="6.5em" Text="含單位發文"></asp:CheckBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 103; position: absolute; top: 218px; left: 12px"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 104; position: absolute; top: 252px; left: 12px"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
