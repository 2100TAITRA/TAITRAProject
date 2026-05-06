<%@ Page Language="c#" CodeBehind="ODR384.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR384" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>ODR384 郵寄標籤單筆列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="ODR384" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label class="KeyField" ID="Label1" runat="server">受文機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="KeyUpperField" ID="txOrgno" TabIndex="10" runat="server" MaxLength="60" Width="15.5em"></asp:TextBox>
                        <asp:ImageButton ID="btHelp" TabIndex="50" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
                        <asp:TextBox ID="txOrgName" TabIndex="-1" runat="server" CssClass="TextLabel" MaxLength="5" Width="10em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label class="RequireField" ID="Label2" runat="server">郵遞區號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="RequireFieldNumeric" ID="txPostCode" TabIndex="20" runat="server" MaxLength="6" Width="3.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label class="RequireField" ID="Label3" runat="server">住址：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="RequireField" ID="txAddress" TabIndex="30" runat="server" Width="22em" MaxLength="60"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label class="RequireField" ID="Label4" runat="server">受文者：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="RequireField" ID="txUsername" TabIndex="40" runat="server" Width="10em" MaxLength="20"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">&nbsp;&nbsp;</div>
                    <div class="dTD">
                        <asp:Label class="RequireField" ID="Label6" runat="server">於</asp:Label><asp:TextBox CssClass="InputFieldNumeric" ID="txPositionNo" TabIndex="50" runat="server" Width="26px" MaxLength="2">Number Only</asp:TextBox>
                        <asp:Label class="RequireField" ID="Label5" runat="server">號位置印出</asp:Label>
                    </div>
                </div>
            </div>
            <div style="z-index: 103; left: 168px; visibility: hidden; overflow: auto; width: 44em; top: 202px; height: 195px">
                <asp:TextBox ID="h_DeptNo" runat="server" Width="20px"></asp:TextBox>
                <asp:TextBox ID="h_UserId" runat="server" Width="20px"></asp:TextBox>
                <asp:TextBox ID="h_OrgNo" runat="server" Width="20px"></asp:TextBox>
                <asp:TextBox ID="tx_COrgNo" runat="server" Width="20px"></asp:TextBox>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btRpt" runat="server" Text="報表:" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:DropDownList ID="ddRptName" runat="server" Style="display: none" DefaultStyle="newmode:none;modifymode:none;">
                <asp:ListItem Value="人員薪資單" Selected="True">人員薪資單</asp:ListItem>
                <asp:ListItem Value="中檢資訊">中檢資訊</asp:ListItem>
                <asp:ListItem Value="預設">預設</asp:ListItem>
            </asp:DropDownList>
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
