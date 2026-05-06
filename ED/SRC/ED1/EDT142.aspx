<%@ Page Language="c#" CodeBehind="EDT142.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDT142" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDT142 移文設定作業</title>
    <meta name="vs_showGrid" content="True">
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
    <form id="EDT142" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px" id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:DropDownList ID="H_dlAssignInfo" runat="server"></asp:DropDownList>
        </div>
        <asp:TextBox Style="z-index: 110; position: absolute; top: 464px; left: 208px" ID="H_txDEAssignOrgNo" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox Style="z-index: 108; position: absolute; top: 520px; left: 384px" ID="H_txStatus" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox Style="z-index: 107; position: absolute; top: 472px; left: 384px" ID="H_txFolderDir" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox Style="z-index: 106; position: absolute; top: 432px; left: 384px" ID="H_txERcvWebIO" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox Style="z-index: 105; position: absolute; top: 392px; left: 384px" ID="H_txSysId" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox Style="z-index: 104; position: absolute; top: 344px; left: 392px" ID="H_txRcvDate" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox Style="z-index: 103; position: absolute; top: 376px; left: 208px" ID="H_txFromDocType" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox Style="z-index: 102; position: absolute; top: 336px; left: 208px" ID="H_txAssignDate" runat="server" CssClass="hide"></asp:TextBox>
        <asp:TextBox Style="z-index: 109; position: absolute; top: 416px; left: 208px" ID="H_txADAssignOrgNo" runat="server" CssClass="hide"></asp:TextBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                            <asp:TextBox ID="txDocNo" TabIndex="-1" runat="server" Width="5.5em" CssClass="KeyEnUpperField" MaxLength="10"></asp:TextBox>
                            <asp:Label ID="lbDesc" runat="server"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server" Visible="false">主旨：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbSubject" runat="server" Visible="false"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server" Visible="false">來文機關：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbFromOrgName" runat="server" Width="9.5em" Visible="false"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server" Visible="false">來文字號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="lbFromNo" runat="server" Width="20em" Visible="false"></asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em" Visible="false">
                        <asp:Label ID="Label4" runat="server" Visible="false">移文對象：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlAssignOrg" runat="server" Width="10em" Visible="False"></asp:DropDownList>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="開啟" ID="btOpen" DefaultStyle="newmode:block;modifymode:none;"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="查詢" ID="btSearch" DefaultStyle="newmode:block;modifymode:none;"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="儲存" ID="btSave" DefaultStyle="newmode:none;modifymode:block;"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消" ID="btCancel" DefaultStyle="newmode:none;modifymode:block;"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
