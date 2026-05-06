<%@ Page Language="c#" CodeBehind="AKR891.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR891" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKR891 單位調案數量統計表</title>
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
    <form id="AKR891" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="RequireField" ID="Label1" runat="server">統計年度：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="RequireFieldNumeric" ID="txYear" TabIndex="10" runat="server" MaxLength="3" Width="2em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle">
                        <asp:CheckBox ID="cbSplit" runat="server" Text="分別統計紙本和電子檔案"></asp:CheckBox>
                    </div>
                </div>
                <div class="dTR"  id="minStatistics">
                <fieldset style="width: 12.5em; height: 3em">
                    <legend>最小統計單位</legend>
                    <div id="Table2" class="DivTable">
                        <div class="dTR">
                            <div class="dTDTitle">
                                <asp:RadioButton ID="rb1" TabIndex="20" runat="server" Width="6em" Text="一級單位" GroupName="Grp" Checked="True"></asp:RadioButton>
                                <asp:RadioButton ID="rb2" TabIndex="30" runat="server" Width="6em" Text="二級單位" GroupName="Grp"></asp:RadioButton>
                            </div>
                        </div>
                    </div>
                </fieldset>
                </div>
                <asp:Label class="RequireField" ID="Label2" runat="server" Width="5.5em"></asp:Label>
                <asp:TextBox ID="txMaxUseDate" TabIndex="-1" runat="server" CssClass="TextLabel" Width="20em"></asp:TextBox>
            </div>
            <div class="DivTable">
                <div class="GridDiv">
                    <asp:DataGrid ID="dg1" runat="server" AutoGenerateColumns="False" PageSize="50" CellPadding="4" GridLines="Vertical"></asp:DataGrid>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btStatic" runat="server" Text="統計(S)" Accesskey = "S" Title = "統計(ALT+S)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btRpt" runat="server" Text="報表:" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:DropDownList ID="ddRptName" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:block;">
                <asp:ListItem Value="人員薪資單" Selected="True">人員薪資單</asp:ListItem>
                <asp:ListItem Value="中檢資訊">中檢資訊</asp:ListItem>
                <asp:ListItem Value="預設">預設</asp:ListItem>
            </asp:DropDownList>
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
           	<asp:Button ID="btExcel" runat="server" Text="匯出EXCEL" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btOds" runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
         	<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
