<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="DFR820.aspx.cs" AutoEventWireup="false" Inherits="AK.DFR820" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>DFR820 數位內容調閱統計表列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body class="hidden">
    <form id="DFR820" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="RequireField" ID="Label5" runat="server">列印年度：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="RequireFieldNumeric" ID="txFileYear" TabIndex="1" runat="server" Width="2em" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">(輸入方式：YYY)</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">統計方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbStaticUnit" TabIndex="40" runat="server" Text=" 單位 " GroupName="ShowType" Checked="True"></asp:RadioButton>
                        <asp:RadioButton ID="rbStaticClass" TabIndex="50" runat="server" Text="分類 " GroupName="ShowType"></asp:RadioButton>
                        <asp:RadioButton ID="rbStaticKeepYear" TabIndex="60" runat="server" Text=" 保存年限 " GroupName="ShowType"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <asp:ListBox ID="lbDeptCommon" runat="server" CssClass="hide"></asp:ListBox>
            <asp:ListBox ID="lbDeptVirtual" runat="server" CssClass="hide"></asp:ListBox>
            <asp:ListBox ID="lbDeptDB" runat="server" CssClass="hide"></asp:ListBox>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server"></asp:DataGrid>
                    <asp:DataGrid ID="dg2" runat="server"></asp:DataGrid>
                    <asp:DataGrid ID="dg3" runat="server"></asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
