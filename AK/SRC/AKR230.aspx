<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="AKR230.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR230" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>AKR230 歸檔率綜合統計表列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta content="JavaScript" name="vs_defaultClientScript">
    <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
    <form id="AKR230" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; left: 10px; position: absolute; top: 102px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label2" runat="server">統計方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbFirst" TabIndex="4" runat="server" Text="組別" GroupName="static" Checked="True"></asp:RadioButton><asp:RadioButton ID="rbSecond" runat="server" Text="科別" GroupName="static"></asp:RadioButton><asp:RadioButton ID="rbPerson" runat="server" Text="個人" GroupName="static"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:RadioButton ID="rbMonthRpt" runat="server" Text="月報表" GroupName="RptType" Checked="True"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label1" runat="server" CssClass="RequireField">列印月份：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txStart" TabIndex="1" runat="server" CssClass="RequireFieldNumeric" Width="3em" MaxLength="5"></asp:TextBox>
                        <asp:Label ID="Label3" runat="server">─</asp:Label>
                        <asp:TextBox ID="txEnd" TabIndex="2" runat="server" CssClass="RequireFieldNumeric" Width="3em" MaxLength="5" DESIGNTIMEDRAGDROP="324"></asp:TextBox>
                        <asp:Label ID="Label7" runat="server">(格式：YYYMM)</asp:Label>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label5" runat="server">列印範圍：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:DropDownList ID="dlDept" runat="server" Width="9.5em"></asp:DropDownList>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTD">
                        <asp:RadioButton ID="rbYearRpt" TabIndex="5" runat="server" Text="年報表" GroupName="RptType"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 6.5em">
                        <asp:Label ID="Label4" runat="server" CssClass="RequireField">列印年度：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYear" runat="server" CssClass="RequireField" Width="2em" MaxLength="3"></asp:TextBox><asp:Label ID="Label6" runat="server">(格式：YYY)</asp:Label>
                    </div>
                </div>
            </div>
            <div id="Table3" class="DivTable">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="lbMaxYear" runat="server">目前最大統計年月：888年88月</asp:Label>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btStatic" runat="server" Text="統計(S)" AccessKey="S" Title="統計(ALT+S)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; left: 12px; position: absolute; top: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; left: 12px; position: absolute; top: 252px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
