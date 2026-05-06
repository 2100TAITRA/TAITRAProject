<%@ Page Language="c#" CodeBehind="UDR120.aspx.cs" AutoEventWireup="false" Inherits="UD.UDR120" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>UDR120 特殊媒體退件清單列印作業</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio 8.0">
    <meta name="CODE_LANGUAGE" content="C#">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="UDR120" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="5em"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="lbBackDate" runat="server" CssClass="RequireField">退件日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txBackDateS" TabIndex="0" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label8" runat="server" Width="1em">～</asp:Label>
                        <asp:TextBox ID="txBackDateE" TabIndex="0" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="lbDect" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox Style="z-index: 0" ID="dlDept" TabIndex="30" runat="server" Width="12em" CssClass="comboBox" Rows="10"></cc1:ComboBox>
                        <asp:TextBox Style="z-index: 0" ID="H_txDept" runat="server" Width="2.5em" CssClass="hide"></asp:TextBox>
                        <asp:TextBox Style="z-index: 0" ID="H_txDeptN" runat="server" Width="2.5em" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="lbSectName" runat="server">承辦科別：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox Style="z-index: 0" ID="dlSectName" TabIndex="30" runat="server" Width="12em" CssClass="comboBox" Rows="10"></cc1:ComboBox>
                        <asp:TextBox Style="z-index: 0" ID="H_txSectName" runat="server" Width="2.5em" CssClass="hide"></asp:TextBox>
                        <asp:TextBox Style="z-index: 0" ID="H_txSectSelect" runat="server" Width="2.5em" CssClass="hide"></asp:TextBox>
                        <asp:TextBox Style="z-index: 0" ID="H_txSectN" runat="server" Width="2.5em" CssClass="hide"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="lbPage" runat="server">跳頁方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbDept" runat="server" Width="4.5em" GroupName="1" Text="依單位"></asp:RadioButton>&nbsp;&nbsp;&nbsp;&nbsp;
						<asp:RadioButton Style="z-index: 0" ID="rbPage" runat="server" GroupName="1" Text="不跳頁"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label Style="z-index: 0" ID="lbSort" runat="server">排序方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbOrderDate" runat="server" Width="5.5em" GroupName="2" Text="點收日期"></asp:RadioButton>&nbsp;
                        <asp:RadioButton Style="z-index: 0" ID="rbOrderDept" runat="server" GroupName="2" Text="承辦單位"></asp:RadioButton>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
            <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
