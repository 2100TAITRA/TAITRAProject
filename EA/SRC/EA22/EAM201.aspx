<%@ Page Language="c#" CodeBehind="EAM201.aspx.cs" AutoEventWireup="false" Inherits="EA22.EAM201" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAM201 案卷名維護作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EAM201" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="BaseTable" class="DivBaseTable">
            <div id="divTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">
                        <asp:Label ID="Label6" TabIndex="-1" CssClass="RequireField" runat="server">年度號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 3.0em">
                        <asp:TextBox CssClass="RequireField InputFieldNumeric" ID="txFileYear" runat="server" MaxLength="3" Width="2em"></asp:TextBox>
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
                        <asp:Label  ID="Label4" TabIndex="-1" runat="server">國別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCountryCode" runat="server" MaxLength="3" Width="2em"></asp:TextBox>
						<asp:imagebutton id="btCountryCodeHelp" tabIndex="-1" runat="server" ToolTip="國別" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:imagebutton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">
                        <asp:Label  ID="Label5" TabIndex="-1" runat="server">處別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOfficeCode" runat="server" MaxLength="3" Width="2em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">
                        <asp:Label  ID="Label8" TabIndex="-1" runat="server">細目/產品別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txProductCode" runat="server" MaxLength="3" Width="2em"></asp:TextBox>
						<asp:imagebutton id="btProductCodeHelp" tabIndex="-1" runat="server" ToolTip="細目/產品別" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:imagebutton>
                        <asp:TextBox ID="txCaseNo" CssClass="hide" runat="server" MaxLength="20" Width="9.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">
                        <asp:Label CssClass="KeyField" ID="Label2" TabIndex="-1" runat="server">卷次號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="KeyUpperField" ID="txVolNo" runat="server" MaxLength="4" Width="2.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">
                        <asp:Label CssClass="RequireField" ID="Label3" TabIndex="-1" runat="server">案卷名：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="RequireField" ID="txVolName" runat="server" MaxLength="100" Width="22em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7.0em">
                        <asp:Label CssClass="RequireField" ID="Label9" TabIndex="-1" runat="server">保存年限：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox CssClass="RequireField" ID="txKeepYear" runat="server" MaxLength="2" Width="1.5em"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="hide">
                    <asp:TextBox ID="txPriKey" runat="server" Width="1em"></asp:TextBox>
                    <asp:TextBox ID="tbOrgNo" runat="server" Width="1em"></asp:TextBox>
                    <asp:TextBox ID="H_ClsKey" TabIndex="-1" runat="server" Width="1.5em"></asp:TextBox>
                    <asp:TextBox ID="H_Artifact" runat="server" ></asp:TextBox>
                </div>
            </div>
            </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen" TabIndex="1"></asp:Button>
            <asp:Button runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete"></asp:Button>
            <asp:Button runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
            <asp:Button runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
        </asp:Panel>
        <div style="visibility: hidden;" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
    </form>
</body>
</html>
