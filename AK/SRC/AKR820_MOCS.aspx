<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKR820_MOCS.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR820_MOCS" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>AKR820_MOCS 銓敘部催卷單列印作業</title>
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
    <form id="AKR820_MOCS" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericSearch.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label1" runat="server" Width="8em" CssClass="RequireField">調案日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txEntryDateS" runat="server" MaxLength="8" Width="4em" CssClass="RequireFieldNumeric DatePicker"></asp:TextBox>
                        <asp:TextBox ID="txEntryTimeS" runat="server" MaxLength="4" Width="2.5em" CssClass="RequireFieldNumeric"></asp:TextBox>
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">－</asp:Label>
                        <asp:TextBox ID="txEntryDateE" runat="server" MaxLength="8" Width="4em" CssClass="RequireFieldNumeric DatePicker"></asp:TextBox>
                        <asp:TextBox ID="txEntryTimeE" runat="server" MaxLength="4" Width="2.5em" CssClass="RequireFieldNumeric"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label3" runat="server" Width="8em" CssClass="RequireField">調卷天數超過：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOverDue" TabIndex="40" runat="server" Width="2em" MaxLength="2" CssClass="RequireFieldNumeric"></asp:TextBox>
                        <asp:Label ID="Label5" runat="server" CssClass="RequireField">天</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label6" runat="server" Width="8em">歸檔人員：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" TabIndex="10" runat="server" CssClass="comboBox" Width="9em"></cc1:ComboBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
