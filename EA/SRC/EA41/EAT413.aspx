<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAT413.aspx.cs" AutoEventWireup="false" Inherits="EA41.EAT413" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAT413電子檔案清查作業</title>
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
    <form id="EAT413" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="DOC_CHECK" runat="server" Width="1px" CssClass="hidden" Height="7px"></asp:TextBox>
            <asp:TextBox class="KeyUpperField" ID="txPlanNoC" TabIndex="-1" runat="server" Width="71px" CssClass="hidden"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="KeyField" ID="Label1" runat="server" CssClass="RequireField">清理批號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="KeyUpperField" ID="txPlanNo" TabIndex="1" runat="server" Width="4.5em" MaxLength="8" CssClass="RequireField"></asp:TextBox>
                        <asp:ImageButton ID="btKeyHelp" TabIndex="-1" runat="server" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif" ToolTip="提示計畫批號"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">計畫說明：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txPlanDesc" TabIndex="-1" runat="server" Width="19.5em" CssClass="DisplayOnly" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Text="開啟" DefaultStyle="newmode:block;modifymode:block;" ID="btOpen" ToolTip="開啟舊檔(ALT+M)" TabIndex="1"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
