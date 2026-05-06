<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODP420_EXAM.aspx.cs" AutoEventWireup="false" Inherits="OD.ODP420_EXAM" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODP420 公文時效統計作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body ms_positioning="GridLayout">
    <form id="ODP420" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox Style="z-index: 102; position: absolute; top: 102px; left: 10px" ID="lbReturnValue" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9em">
                        <asp:Label ID="Label2" class="RequireField" runat="server">統計月份：</asp:Label>
                    </div>
                        <div class="dTD">
                            <asp:TextBox ID="txYearMonth" class="RequireFieldNumeric" TabIndex="1" runat="server" Width="3em" MaxLength="5"></asp:TextBox><br>
                            <asp:Label ID="lbMaxYM" runat="server">目前統計最大年月：888年88月</asp:Label>
                        </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 9em">
                        <asp:Label ID="Label3" runat="server" CssClass="RequireField">區間時效統計：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txDateS" TabIndex="1" runat="server" CssClass="RequireFieldNumeric" Width="4em" MaxLength="7"></asp:TextBox>
                        <asp:Label ID="Label1" runat="server">～</asp:Label>
                        <asp:TextBox ID="txDateE" TabIndex="1" runat="server" CssClass="DatePicker RequireFieldNumeric" Width="4em" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
            </div>
            <div style="z-index: 103; width: 506px; height: 179px; visibility: hidden; overflow: auto; top: 202px; left: 168px">
                <asp:DropDownList ID="dlOuId" runat="server"></asp:DropDownList>
                <asp:Label ID="lbDocProperty" TabIndex="-1" runat="server" Width="20px"></asp:Label>
                <asp:Label ID="lbBTypeNo" TabIndex="-1" runat="server" Width="20px"></asp:Label>
                <asp:TextBox ID="txMode" TabIndex="-1" runat="server" Width="20px"></asp:TextBox>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btPrint" runat="server" Text="執行(P)" Style="display: none" Accesskey="P" Title="執行(ALT+P)" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btWeek" runat="server" Text="區間時效統計(W)" Style="display: none" Accesskey="W" Title="區間時效統計(ALT+W)"  DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator Style="z-index: 103; position: absolute; top: 218px; left: 12px" ID="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary Style="z-index: 106; position: absolute; top: 252px; left: 12px" ID="ValidationSummary1" runat="server" CssClass="hidden"></asp:ValidationSummary>
        <asp:TextBox Style="z-index: 104; position: absolute; top: 298px; left: 12px" ID="hDoIt" runat="server" CssClass="hidden"></asp:TextBox>
        <asp:TextBox Style="z-index: 105; position: absolute; top: 298px; left: 12px" ID="hMaxMonth" runat="server" CssClass="hidden"></asp:TextBox>
        <asp:DataGrid Style="z-index: 107; position: absolute; top: 456px; left: 232px" ID="DataGrid1" runat="server" CssClass="hidden"></asp:DataGrid>
    </form>
</body>
</html>
