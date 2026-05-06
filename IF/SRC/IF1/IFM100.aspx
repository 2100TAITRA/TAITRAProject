<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="IFM100.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM100" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>IFM100 伺服器維護</title>
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
    <form id="IFM100" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../IFLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" class="KeyField" runat="server" CssClass="KeyField">伺服器代碼：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSrvNo" class="KeyUpperField" TabIndex="1" runat="server" Width="8em" CssClass="KeyFieldText" MaxLength="20">ntxServer</asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server">伺服器名稱：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSrvName" TabIndex="2" runat="server" Width="8em" MaxLength="60">影像系統伺服器</asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label3" runat="server">伺服器位址：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txSrvIP" TabIndex="3" runat="server" Width="8em" MaxLength="60">140.112.18.36</asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" style="display:none" Text="開啟" ID="btOpen" DefaultStyle="newmode:block;modifymode:none;" TabIndex="1"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="儲存" ID="btSave" DefaultStyle="newmode:block;modifymode:block;"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="清除" ID="btClean" DefaultStyle="newmode:block;modifymode:none;"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="刪除" ID="btDelete" DefaultStyle="newmode:none;modifymode:block;"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="取消" ID="btCancel" DefaultStyle="newmode:none;modifymode:block;"></asp:Button>
            <asp:Button runat="server" style="display:none" Text="搜索" ID="btSearch" DefaultStyle="newmode:block;modifymode:none;"></asp:Button>
        </asp:Panel>

    </form>
</body>
</html>
