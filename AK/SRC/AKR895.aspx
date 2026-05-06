<%@ Page Language="c#" CodeBehind="AKR895.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR895" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKR895 檔案申請應用核准分類數量統計表</title>
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
    <form id="AKR895" method="post" runat="server" onkeyup="jf_CheckFull();">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label CssClass="RequireField" ID="Label2" runat="server">統計年度：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYear" TabIndex="10" runat="server" CssClass="RequireFieldNumeric" MaxLength="3" Width="2em"></asp:TextBox>
                    </div>
                </div>
                <fieldset style="width: 13.5em; height: 4em">
                    <legend>最小統計單位</legend>
                    <div id="Table2">
                        <div class="dTR">
                            <div class="dTD">
                                <asp:RadioButton ID="rb1" runat="server" Text="類" GroupName="GN"></asp:RadioButton>
                                <asp:RadioButton ID="rb2" runat="server" Text="綱" GroupName="GN"></asp:RadioButton>
                                <asp:RadioButton ID="rb3" runat="server" Text="目" GroupName="GN"></asp:RadioButton>
                                <asp:RadioButton ID="rb4" runat="server" Text="節" GroupName="GN"></asp:RadioButton>
                                <asp:RadioButton ID="rb5" runat="server" Text="項" GroupName="GN"></asp:RadioButton>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9.5em">
                        <asp:Label ID="lbMaxYear" runat="server">目前最大統計年度：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="txMaxYear" TabIndex="-1" runat="server" Width="5em" ReadOnly="True"></asp:Label>
                    </div>
                </div>
                <asp:Label ID="Label1" runat="server" ForeColor="Black">[ 列印報表前請先確認是否已執行過歸檔統計作業 ]</asp:Label>
            </div>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" Width="28em" GridLines="Vertical" CellPadding="4" PageSize="50"></asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btStatic" runat="server" Text="統計(S)" Accesskey = "S" Title = "統計(ALT+S)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
