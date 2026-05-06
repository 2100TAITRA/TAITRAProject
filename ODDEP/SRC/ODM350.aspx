<%@ Page Language="c#" CodeBehind="ODM350.aspx.cs" AutoEventWireup="false" Inherits="OD.ODM350" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>ODM350 發文代字維護作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODM350" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; position: absolute; top: 102px; left: 10px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <div class="DivBaseTable" id="BaseTable">
            <asp:TextBox ID="H_Value" runat="server" CssClass="hidden" Width="16px"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hidden" Width="16px"></asp:TextBox>
            <asp:TextBox ID="H_DeptNo_Value" runat="server" CssClass="hidden" Width="16px"></asp:TextBox>
            <asp:TextBox ID="H_SectNo_Value" runat="server" CssClass="hidden" Width="1px"></asp:TextBox>
            <asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hidden" Width="1px"></asp:TextBox>
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width:11.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDEPT" TabIndex="210" runat="server" CssClass="comboBox" Width="9.5em"></cc1:ComboBox>&nbsp;&nbsp;
                        <cc1:ComboBox ID="dlSECT" TabIndex="220" runat="server" CssClass="comboBox" Width="9.5em"></cc1:ComboBox>
                        <asp:DropDownList ID="dlUSER" runat="server" CssClass="hidden" Width="2em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:11.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">總發文代字：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOrgWord" TabIndex="20" runat="server" Width="7em" MaxLength="6"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:11.5em">
                        <asp:Label ID="Label3" runat="server" CssClass="RequireField">單位發文代字：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOuWord" TabIndex="30" runat="server" CssClass="RequireField" Width="7em" MaxLength="6"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:11.5em">
                        <asp:Label ID="Label4" runat="server" CssClass="RequireField">總發文密件代字：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOrgSecWord" TabIndex="40" runat="server" CssClass="RequireField" Width="7em" MaxLength="6"></asp:TextBox>
                        <asp:Button ID="btOrgSec" TabIndex="50" runat="server" Text="同上"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:11.5em">
                        <asp:Label ID="Label5" runat="server" CssClass="RequireField">單位發文密件代字：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOuSecWord" TabIndex="50" runat="server" CssClass="RequireField" Width="7em" MaxLength="6"></asp:TextBox>
                        <asp:Button ID="btOuSec" TabIndex="55" runat="server" Text="同上"></asp:Button>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:11.5em">
                        <asp:Label ID="Label7" runat="server">代擬代判代字：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUpOrgNoProxyWord" TabIndex="50" runat="server" Width="7em" MaxLength="6"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:11.5em">
                        <asp:Label ID="Label9" runat="server">代擬代判密件代字：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUpOrgNoProxySecWord" TabIndex="50" runat="server" Width="7em" MaxLength="6"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:11.5em">
                        <asp:Label ID="Label8" runat="server">代擬不代判代字：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUpOrgProxyWord" TabIndex="50" runat="server" Width="7em" MaxLength="6"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:11.5em">
                        <asp:Label ID="Label10" runat="server">代擬不代判密件代字：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUpOrgProxySecWord" TabIndex="50" runat="server" Width="7em" MaxLength="6"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:11.5em">
                        <asp:Label ID="Label6" runat="server">代擬代判代字上上級：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUpUpOrgNoProxyWord" TabIndex="50" runat="server" Width="7em" MaxLength="6"></asp:TextBox>
                    </div>
                </div>
            </div>
            <asp:ListBox ID="lbDept" runat="server" CssClass="hide"></asp:ListBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button Text="開啟" DefaultStyle="newmode:block;modifymode:none;" runat="server" Style="display: none" ID="btOpen" TabIndex="1"></asp:Button>
            <asp:Button Text="儲存" DefaultStyle="newmode:block;modifymode:block;" runat="server" Style="display: none" ID="btSave"></asp:Button>
            <asp:Button Text="清除" DefaultStyle="newmode:block;modifymode:none;" runat="server" Style="display: none" ID="btClean"></asp:Button>
            <asp:Button Text="刪除" DefaultStyle="newmode:none;modifymode:block;" runat="server" Style="display: none" ID="btDelete"></asp:Button>
            <asp:Button Text="取消" DefaultStyle="newmode:none;modifymode:block;" runat="server" Style="display: none" ID="btCancel"></asp:Button>
            <asp:Button Text="預覽" DefaultStyle="newmode:block;modifymode:block;" runat="server" Style="display: none" ID="btPreview"></asp:Button>
            <asp:Button Text="列印" DefaultStyle="newmode:block;modifymode:block;" CssClass="hide" runat="server" Style="display: none" ID="btPrint"></asp:Button>
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; position: absolute; top: 218px; left: 12px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; position: absolute; top: 252px; left: 12px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
