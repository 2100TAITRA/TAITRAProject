<%@ Page Language="c#" CodeBehind="EAT504.aspx.cs" AutoEventWireup="false" Inherits="EA50.EAT504" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EAT504銷毀作業</title>
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
    <form id="EAT504" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="Table3">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" runat="server" CssClass="RequireField">銷毀計畫：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 8em">
                        <asp:TextBox ID="txDPlan" runat="server" Width="5.5em" CssClass="RequireField" MaxLength="10" ToolTip="計畫批號(8)"></asp:TextBox>
                        <asp:ImageButton ID="btKeyHelp" TabIndex="-1" runat="server" ToolTip="提示計畫批號" ImageUrl="..\..\..\STDN\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="InputFieldLabel">目前狀態：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txStatus" TabIndex="-1" runat="server" Width="15.5em" CssClass="DisplayOnly" MaxLength="8" ReadOnly="True" ForeColor="Navy">銷毀或未銷毀</asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label7" runat="server" CssClass="RequireField">核准文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txNo" runat="server" Width="29em" CssClass="RequireField" MaxLength="40" ToolTip="核准文號(40)"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label12" runat="server" CssClass="RequireField">銷毀日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDate" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7" ToolTip="銷毀日期(7:YYYMMDD)"></asp:TextBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar" EnableViewState="False">
            <asp:Button runat="server" Style="display: none" Text="開啟(M)" DefaultStyle="newmode:block;modifymode:none;" ID="btOpen" TabIndex="1"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="查詢(F)" DefaultStyle="newmode:block;modifymode:none;" ID="btSearch"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="銷毀(S)" DefaultStyle="newmode:none;modifymode:block;" ID="btSave" AccessKey="S" Title="銷毀(ALT+S)"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消銷毀(C)" DefaultStyle="newmode:none;modifymode:block;" ID="btCancelDestroy" AccessKey="C" Title="取消銷毀(ALT+C)"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="刪除關聯資料(D)" DefaultStyle="newmode:none;modifymode:block;" ID="btDelete" AccessKey="D" Title="刪除關聯資料(ALT+D)"></asp:Button>
            <asp:Button runat="server" Style="display: none" Text="取消(Z)" DefaultStyle="newmode:none;modifymode:block;" ID="btCancel"></asp:Button>
        </asp:Panel>
    </form>
</body>
</html>
