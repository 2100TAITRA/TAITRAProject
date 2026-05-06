<%@ Page Language="c#" CodeBehind="EDC024.aspx.cs" AutoEventWireup="false" Inherits="ED0.EDC024" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDC024 分層負責代碼查詢作業 </title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>

    <link rel="stylesheet" href="../EDLIB/css/zTreeStyle/zTreeStyle.css" type="text/css">
</head>
<body ms_positioning="GridLayout">
    <form id="EDC024" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_txFrom" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_txMode" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_txDeptNo" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_txManageUsername" runat="server" CssClass="hide"></asp:TextBox>
            <asp:TextBox ID="H_JsonData" runat="server" CssClass="hide"></asp:TextBox>
        </div>
        <div class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="lbNames" runat="server">分層負責代碼：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:TextBox ID="txRespNo" runat="server" Width="4em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label1" runat="server">決行細目名稱：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:TextBox ID="txRespContent" runat="server" Width="20em"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTD" id="Data">
                        <div class="GridDiv" style="height: 300px">
                            <ul id="Classtree" class="ztree"></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
            <asp:Button ID="btSearch" runat="server" Text="查詢" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel(O)" Title="匯出Excel(ALT+O)" AccessKey="O" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
    </form>
</body>
<script type="text/javascript" src="../EDLIB/jquery.ztree.core-3.5.js"></script>
<script type="text/javascript" src="../EDLIB/jquery.ztree.exhide-3.5.js"></script>
</html>
