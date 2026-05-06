<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAR708.aspx.cs" AutoEventWireup="false" Inherits="EA70.EAR708" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAR708 密件檔案分存單列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EAR708" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_txKeepYear" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_InSubject" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyUpperField">文(編)號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDocNo" runat="server" CssClass="KeyField" Width="8em" MaxLength="15"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server">檔　　號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txFileYear" runat="server" Width="2em"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server">(年度)－</asp:Label>
                        <asp:TextBox ID="txFileCls" runat="server" Width="10.5em"></asp:TextBox>
                        <asp:Label ID="Label9" runat="server">(分類)－</asp:Label>
                        <asp:TextBox ID="txFileCase" runat="server" Width="7em"></asp:TextBox>
                        <asp:Label ID="Label10" runat="server">(案次)－</asp:Label>
                        <asp:TextBox ID="txFileVol" runat="server" Width="4.5em"></asp:TextBox>
                        <asp:Label ID="Label11" runat="server">(卷次)－</asp:Label>
                        <asp:TextBox ID="txFileSeq" runat="server" Width="2em"></asp:TextBox>
                        <asp:Label ID="Label12" runat="server">(目次)</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label3" runat="server">案名：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txCaseName" runat="server" Width="20.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label4" runat="server">密件編號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSecSeq" runat="server" Width="4.5em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label5" runat="server">原文存放處：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txOriPlace" runat="server" Width="10.5em" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label6" runat="server">密件案名：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSecCaseName" runat="server" Width="10.5em" MaxLength="10"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label7" runat="server">備註：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txRemarks" runat="server" TextMode="MultiLine" Width="20.5em"></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="開啟" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:none;modifymode:block;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
