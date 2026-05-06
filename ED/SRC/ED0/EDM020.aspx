<%@ Page Language="c#" CodeBehind="EDM020.aspx.cs" AutoEventWireup="false" Inherits="ED0.EDM020" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDM020 公文速別代碼維護作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <link href="../EDLIB/EDLIB.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDM020" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">速別代碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox onkeyup="ED_jf_CheckFull()" ID="txSpdNo" TabIndex="1" runat="server" Width="1em" CssClass="ED_KeyField" MaxLength="1"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label2" runat="server" Width="71px" CssClass="RequireField">速別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox onkeyup="ED_jf_CheckFull()" ID="txSpd" TabIndex="2" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label3" runat="server" CssClass="InputFieldLabel">內部代碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox onkeyup="ED_jf_CheckFull()" ID="txInnerNo" TabIndex="3" runat="server" Width="1em" MaxLength="1"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label4" runat="server" CssClass="InputFieldLabel">內部名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox onkeyup="ED_jf_CheckFull()" ID="txInnerName" TabIndex="4" runat="server" Width="5.5em" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button runat="server" style="display:none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen" TabIndex="1"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="儲存" DefaultStyle="newmode:block;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="刪除" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
