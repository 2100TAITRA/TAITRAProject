<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="IFR016.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFR016" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>IFR016 使用者權利查詢作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="IFR016" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_Sect" runat="server"></asp:TextBox>
            <asp:TextBox ID="H_RoleIndex" runat="server"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">隸屬機關：</asp:Label>
                    </div>
                    <div class="dTD"  style="width:14.5em">
                        <asp:DropDownList ID="ddlSource" runat="server"  CssClass="KeyField" Width="13.5em" AutoPostBack ="true" MaxLength="20"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width:6.5em">
                        <asp:Label ID="lbNo" runat="server">使用者帳號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUserName" runat="server" CssClass="InputEnUpperField" Width="10.5em" MaxLength="20"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label2" runat="server">單位：</asp:Label>
                    </div>
                    <div class="dTD"  style="width:14.5em">
                        <asp:DropDownList ID="ddlDept" runat="server" Width="11.5em" MaxLength="20"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width:6.5em">
                        <asp:Label ID="Label3" runat="server">使用者姓名：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txEmpName" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label4" runat="server">科別：</asp:Label>
                    </div>
                    <div class="dTD"  style="width:14.5em">
                        <asp:DropDownList ID="ddlSect" runat="server" Width="8.5em" MaxLength="20"></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width:6.5em">
                        <asp:Label ID="Label5" runat="server">使用者狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbEenable" runat="server" GroupName="State" Text="啟用"></asp:RadioButton>
                        <asp:RadioButton ID="rbDisenable" runat="server" GroupName="State" Text="停用"></asp:RadioButton>
                        <asp:RadioButton ID="rbAll" runat="server" GroupName="State" Text="全部"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width:5.5em">
                        <asp:Label ID="Label6" runat="server">扮演角色：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="ddlRole" runat="server" Width="8.5em" MaxLength="20"></asp:DropDownList>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:block;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="匯出excel" DefaultStyle="newmode:block;modifymode:block;" ID="btExcel"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:block;modifymode:block;" ID="btClean"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
