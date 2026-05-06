<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODM050.aspx.cs" AutoEventWireup="false" Inherits="OD.ODM050" ValidateRequest="false" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODM050 自動稽催維護作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout" class="hidden">
    <form id="ODM050" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label CssClass="KeyField" ID="Label1" runat="server">稽催代碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Cssclass="KeyUpperField" ID="txInsNo" TabIndex="1" runat="server" MaxLength="4" Width="2.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label3" runat="server">說明：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRemark" TabIndex="2" runat="server" Width="24em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label2" runat="server">是否啟動：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbYes" runat="server" GroupName="rbEnable" Text="是"></asp:RadioButton>
                        <asp:RadioButton ID="rbNo" runat="server" GroupName="rbEnable" Text="否"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label4" runat="server">稽催設定：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txConfig" TabIndex="2" runat="server" Width="32em" Height="18.5em" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" EnableViewState="False" CssClass="V2_GenericBannerToolBar">
            <asp:Button runat="server" style="display:none" Text="開啟" ID="btOpen" TabIndex="1" DefaultStyle="newmode:block;modifymode:none;"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="儲存" ID="btSave" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="清除" ID="btClean" DefaultStyle="newmode:block;modifymode:none;"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="刪除" ID="btDelete" DefaultStyle="newmode:none;modifymode:block;"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="取消" ID="btCancel" DefaultStyle="newmode:none;modifymode:block;"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="搜索" ID="btSearch" DefaultStyle="newmode:block;modifymode:none;"></asp:Button>
        </asp:Panel>

    </form>
</body>
</html>
