<%@ Page Language="c#" CodeBehind="EAR502.aspx.cs" AutoEventWireup="false" Inherits="EA50.EAR502" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAR502續存及提供文史機關抽件明細表列印作業</title>
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
    <form id="EAR502" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="Table1">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server" CssClass="RequireField">銷毀計畫：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDPlan" TabIndex="10" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="10"></asp:TextBox>
                        <asp:ImageButton ID="btKeyHelp" runat="server" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif" ToolTip="提示計畫批號"></asp:ImageButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server" CssClass="RequireField">清理批號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 7.5em">
                        <asp:TextBox ID="txPlanNo" TabIndex="20" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btKeyHelp1" runat="server" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif" ToolTip="提示計畫批號"></asp:ImageButton>
                    </div>
                    <div class="dTDTitle" style="width: 7.5em">
                        <asp:Label ID="Label1" runat="server">批號說明：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDesc" TabIndex="4" runat="server" Width="15.5em" CssClass="DisplayOnly" MaxLength="8" ReadOnly="True"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">庫房：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlStore" TabIndex="30" runat="server" Width="7.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">年度號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYearS" TabIndex="40" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>至
						<asp:TextBox ID="txYearE" TabIndex="50" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" runat="server">分類號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txClsS" TabIndex="60" runat="server" Width="9.5em" MaxLength="20"></asp:TextBox>至
						<asp:TextBox ID="txClsE" TabIndex="70" runat="server" Width="9.5em" MaxLength="20"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em; min-height: 1px"></div>
                    <div class="dTD">
                        <asp:CheckBox ID="cb1" TabIndex="80" runat="server" Text="依卷號小計"></asp:CheckBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="預覽" DefaultStyle="newmode:block;modifymode:none;" ID="btPreview"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="列印" CssClass="hide" DefaultStyle="newmode:block;modifymode:none;" ID="btPrint"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="清除" DefaultStyle="newmode:block;modifymode:none;" ID="btClean"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
