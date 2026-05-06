<%@ Page Language="c#" CodeBehind="EDR4024.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR4024" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<html>
<head>
    <title>EDR40244 承辦單位展期彙總表</title>
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
    <form id="EDR4024" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em;">
                        <asp:Label ID="Label4" runat="server" CssClass="RequireField">收創文日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 20em;">
                        <asp:TextBox Style="ime-mode: disabled" ID="txRcvDateS" TabIndex="80" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label14" runat="server">－</asp:Label>
                        <asp:TextBox Style="ime-mode: disabled" ID="txRcvDateE" TabIndex="90" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em;">
                        <asp:Label ID="Label1" runat="server" EnableViewState="False">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em;">
                        <asp:DropDownList ID="dlDept" TabIndex="30" runat="server" Width="8em" ></asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em;">
                        <asp:Label ID="Label2" runat="server" EnableViewState="False">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlUser" TabIndex="50" runat="server" Width="6em" ></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em;">
                        <asp:Label ID="Label15" runat="server">辦理狀態：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 3.5em;">
                        <asp:DropDownList ID="dlWorkType" TabIndex="50" runat="server" Width="4.5em" >
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1">已結案</asp:ListItem>
                            <asp:ListItem Value="2">未結案</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 10em;">
                        <asp:Label ID="Label3" runat="server">逾期別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 3.5em;">
                        <asp:DropDownList ID="dlOverType" TabIndex="50" runat="server" Width="4.5em" >
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1">已逾期</asp:ListItem>
                            <asp:ListItem Value="2">未逾期</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                 <div class="dTR">
                    <div class="dTDTitle" style="width: 10em;">
                        <asp:Label ID="Label5" runat="server">辦畢方式：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 4.5em;">
                        <asp:DropDownList ID="dlCloseType" TabIndex="50" runat="server" Width="4.5em" >
                            <asp:ListItem Value=""></asp:ListItem>
                            <asp:ListItem Value="1">發文</asp:ListItem>
                            <asp:ListItem Value="2">存查</asp:ListItem>
                            <asp:ListItem Value="3">單位發</asp:ListItem>
                            <asp:ListItem Value="4">單位存</asp:ListItem>
                        </asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:TextBox ID="H_Dept" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_User" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_User_Value" runat="server" CssClass="hide"></asp:TextBox>
                        <asp:TextBox ID="H_dlUser_Value" runat="server" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btODS" runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
</html>
