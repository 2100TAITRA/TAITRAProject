<%@ Page Language="c#" CodeBehind="EDT408.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDT408" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDT408 文書用印申請作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
    <meta name="format - detection" content="telephone = no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="EDT408" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox><asp:TextBox ID="H_strApplyStatus" TabIndex="0" runat="server" Width="70px"></asp:TextBox>
        </div>
        <div class="DivBaseTable">
            <div class="DivTable" id="MainTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label1" runat="server" CssClass="KeyField">申請單號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txStampNo" TabIndex="0" runat="server" Width="5.5em" CssClass="KeyUpperField"
                            MaxLength="8"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label Style="z-index: 0" ID="Label2" runat="server">申請日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txApplyDate" TabIndex="0" runat="server" Width="4.5em" CssClass="DisplayOnly"
                            MaxLength="20" ReadOnly="True" ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label ID="Label3" runat="server">申 請 人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txUserNM" TabIndex="0" runat="server" Width="11.5em" CssClass="DisplayOnly"
                            ReadOnly="True" ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label Style="z-index: 0" ID="Label9" runat="server">申請件數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txPieces" TabIndex="0" runat="server" Width="2.5em"
                            MaxLength="2"></asp:TextBox>
                        <asp:Label Style="z-index: 0" ID="Label10" runat="server">件</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label Style="z-index: 0" ID="Label4" runat="server">申請份數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txCopies" TabIndex="0" runat="server" Width="3.5em"
                            MaxLength="4"></asp:TextBox>
                        <asp:Label Style="z-index: 0" ID="Label8" runat="server">份</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label Style="z-index: 0" ID="Label5" runat="server">申請用途：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbPublic" runat="server" GroupName="gUseage" Checked="True"
                            Text="公用"></asp:RadioButton><asp:RadioButton ID="rbPrive" runat="server" GroupName="gUseage" Text="私用"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label Style="z-index: 0" ID="Label6" runat="server">申請事由：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox Style="z-index: 0" ID="txReasons" TabIndex="0" runat="server" Width="23.5em"
                            MaxLength="100" TextMode="MultiLine"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6em;">
                        <asp:Label Style="z-index: 0" ID="Label7" runat="server">目前狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label Style="z-index: 0" ID="lbStatus" runat="server"></asp:Label>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟(M)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btTransfer" runat="server" Text="線上簽核傳送：" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:DropDownList ID="ddlNextUser" runat="server" Style="display: none" DefaultStyle="newmode:block;modifymode:block;"></asp:DropDownList>
            <asp:Button ID="btSave" runat="server" Text="儲存(S)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除(D)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消(Z)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽(E)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印(P)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btCheck" runat="server" Text="確認(C)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="流程資訊(F)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
