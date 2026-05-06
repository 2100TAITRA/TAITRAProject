<%@ Page Language="c#" CodeBehind="EDM002.aspx.cs" AutoEventWireup="false" Inherits="ED0.EDM002" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDM002 分層決行節點維護作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
</head>
<body ms_positioning="GridLayout">
    <form id="EDM002" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbSn" class="KeyField" runat="server" CssClass="KeyField">項目序號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSn" runat="server" Width="2em" CssClass="KeyFieldNumeric" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbName" class="KeyField" runat="server" CssClass="KeyField">項目名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txName" runat="server" Width="24.5em" CssClass="KeyField" MaxLength="100"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbDept" class="KeyField" runat="server" CssClass="KeyField">使用單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDept" runat="server" Width="9.5em" CssClass="KeyField"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbLevel" class="KeyField" runat="server" CssClass="KeyField">項目層級：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbNodelv1" runat="server" CssClass="KeyField" Checked="True" Text="第一層" GroupName="Nodelv"></asp:RadioButton>
                        <asp:RadioButton ID="rbNodelv2" runat="server" CssClass="KeyField" Text="第二層" GroupName="Nodelv"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbUpper" runat="server" CssClass="KeyField">上級項目：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlUpper" runat="server" Width="9.5em" CssClass="KeyField"></asp:DropDownList>
                        <asp:TextBox ID="H_txUpperKey" runat="server" Width="120px" CssClass="hide" Height="0px"></asp:TextBox>
                        <asp:TextBox ID="H_PK" runat="server" Width="50px" CssClass="hide" Height="0px">0</asp:TextBox>
                        <asp:TextBox ID="H_dlCheckedIndex" runat="server" Width="0px" CssClass="hide" Height="0px">0</asp:TextBox>
                        <asp:TextBox ID="H_OrgNo" runat="server" Width="50px" CssClass="hide" Height="0px">0</asp:TextBox>
                    </div>
                </div>
            </div>
            <asp:TextBox ID="H_UpperKeyInfo" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="儲存" DefaultStyle="newmode:block;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="刪除" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
