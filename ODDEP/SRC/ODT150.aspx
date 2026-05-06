<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODT150.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT150" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODT150 附件補收登錄作業</title>
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
    <form id="ODT150" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="KeyField" ID="Label1" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7.5em">
                        <asp:TextBox ID="txDocNo" TabIndex="10" runat="server" CssClass="KeyUpperField KeyFieldNumeric" MaxLength="10" Width="5.5em"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">收文日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRcvDate" TabIndex="-1" runat="server" CssClass="DisplayOnly" MaxLength="7" Width="4em" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">主　　旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSubject" runat="server" Width="22.5em" TabIndex="-1" CssClass="DisplayOnly" ReadOnly="True" TextMode="MultiLine" Height="9em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDeptName" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="17.5em" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txEmpName" TabIndex="-1" runat="server" CssClass="DisplayOnly" Width="17.5em" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">補收日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txAttDate" TabIndex="20" runat="server" Width="4em" CssClass="InputFieldNumeric DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:TextBox ID="H_User" TabIndex="-1" runat="server" CssClass="hide" Width="28px"></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="儲存" DefaultStyle="newmode:none;modifymode:block;" ID="btSave"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="刪除" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
