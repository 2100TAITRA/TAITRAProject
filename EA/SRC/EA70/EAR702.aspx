<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAR702.aspx.cs" AutoEventWireup="false" Inherits="EA70.EAR702" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAR702 機密等級變更或註記紀錄單列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="EAR702" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="RequireField" ID="Label2" TabIndex="-1" runat="server">清理批號：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10.5em">
                        <asp:TextBox class="RequireField" ID="txPlanNo" TabIndex="10" runat="server" Width="4.5em" MaxLength="8"></asp:TextBox>
                        <asp:ImageButton ID="btHelp" TabIndex="15" runat="server" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:ImageButton>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" TabIndex="-1" runat="server">計畫說明：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDesc" TabIndex="-1" runat="server" Width="12.5em" ReadOnly="True" ForeColor="Navy"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label5" TabIndex="-1" runat="server">庫房：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlStoreNo" TabIndex="15" runat="server" Width="5.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" TabIndex="-1" runat="server">承辦單位：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10.5em">
                        <cc1:ComboBox ID="dlDept" TabIndex="40" runat="server" CssClass="comboBox" Width="8.5em" Rows="10"></cc1:ComboBox>
                    </div>
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label4" TabIndex="-1" runat="server">承辦人：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUser" TabIndex="40" runat="server" CssClass="comboBox" Width="8.5em" Rows="10"></cc1:ComboBox>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:none;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
        <asp:TextBox ID="empUserId" Style="z-index: 102; left: 295px; position: absolute; top: 240px" runat="server" Width="2px" CssClass="hidden"></asp:TextBox>
    </form>
</body>
</html>
