<%@ Page Language="c#" CodeBehind="AKM320.aspx.cs" AutoEventWireup="false" Inherits="AK.AKM320" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>AKM320 立案維護作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="AKM320" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 101; position: absolute; top: 102px; left: 10px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="Table1">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">
                        <asp:Label ID="Label6" TabIndex="-1" runat="server">年度號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 3.0em">
                        <asp:TextBox CssClass="InputFieldNumeric" ID="txCaseYear" runat="server" MaxLength="3" Width="2em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 6.0em">
                        <asp:Label ID="Label7" TabIndex="-1" runat="server" CssClass="KeyField">版本別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txVerNo" runat="server" CssClass="KeyUpperField" MaxLength="3" Width="2em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">
                        <asp:Label CssClass="KeyField" ID="Label1" TabIndex="-1" runat="server">分類號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="KeyUpperField" ID="txClsNo" runat="server" MaxLength="20" Width="9.5em"></asp:TextBox>
                        <asp:Label ID="lbClsName" TabIndex="-1" runat="server"></asp:Label>
                        <asp:TextBox ID="txClsName" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">
                        <asp:Label CssClass="KeyField" ID="Label2" TabIndex="-1" runat="server">案次號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="KeyUpperField" ID="txCaseNo" runat="server" MaxLength="12" Width="6.5em"></asp:TextBox>
                        <asp:CheckBox ID="ck1" runat="server" Width="8em" Text="系統自動編號"></asp:CheckBox>
                        <asp:TextBox ID="txCaseNoChange" TabIndex="-1" runat="server" CssClass="hide" Width="6.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">
                        <asp:Label CssClass="RequireField" ID="Label3" TabIndex="-1" runat="server">案　　名：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="RequireField" ID="txCaseName" runat="server" MaxLength="100" Width="22em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">
                        <asp:Label ID="Label4" TabIndex="-1" runat="server">並列案名：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAppSubject" runat="server" MaxLength="100" Width="22em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">
                        <asp:Label ID="Label5" TabIndex="-1" runat="server">其他案名：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOtherSubject" runat="server" MaxLength="100" Width="22em"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="GridDiv" style="z-index: 103; height: 178px; visibility: hidden; overflow: auto">
                    <asp:DataGrid ID="dg1" runat="server" PageSize="50" CellPadding="4" GridLines="Vertical"></asp:DataGrid>
                    <asp:TextBox ID="txPriKey" runat="server" Width="1em"></asp:TextBox>
                    <asp:TextBox ID="tbOrgNo" runat="server" Width="1em"></asp:TextBox>
                    <asp:TextBox ID="H_ClsKey" TabIndex="-1" runat="server" Width="1.5em"></asp:TextBox>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btRpt" runat="server" Text="報表:" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:DropDownList ID="ddRptName" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:none;">
                <asp:ListItem Value="人員薪資單" Selected="True">人員薪資單</asp:ListItem>
                <asp:ListItem Value="中檢資訊">中檢資訊</asp:ListItem>
                <asp:ListItem Value="預設">預設</asp:ListItem>
            </asp:DropDownList>
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:none;modifymode:none;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 103; position: absolute; top: 218px; left: 12px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 104; position: absolute; top: 252px; left: 12px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
