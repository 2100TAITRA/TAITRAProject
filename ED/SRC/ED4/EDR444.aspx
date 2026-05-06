<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EDR444.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR444" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EDR444 會辦公文時效統計表列印作業</title>
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
    <form id="EDR444" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div style="z-index: 103; width: 506px; visibility: hidden; overflow: auto; top: 202px; left: 168px">
            <asp:ListBox Style="z-index: 102; position: absolute; top: 102px; left: 10px" ID="lbReturnValue" runat="server" CssClass="hidden"></asp:ListBox>
            <asp:DropDownList ID="dlOuId" CssClass="hidden" runat="server"></asp:DropDownList>
            <asp:TextBox Style="z-index: 105; position: absolute; top: 298px; left: 12px" ID="hMaxMonth" runat="server" CssClass="hidden"></asp:TextBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" class="RequireField" runat="server">列印月份：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txYearMonthS" class="RequireFieldNumeric" runat="server" Width="3em" MaxLength="5"></asp:TextBox>～
                        <asp:TextBox ID="txYearMonthE" class="RequireFieldNumeric" runat="server" Width="3em" MaxLength="5"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label2" runat="server">公文類型：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbRcv" runat="server" GroupName="docType" Text="收文"></asp:RadioButton>
                        <asp:RadioButton ID="rbNew" runat="server" GroupName="docType" Text="創稿"></asp:RadioButton>
                        <asp:RadioButton ID="rbAll" runat="server" GroupName="docType" Text="全部"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">報表類型：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbRptType1" runat="server" GroupName="RptType" Text="受會公文統計表"></asp:RadioButton>
                        <asp:RadioButton ID="rbRptType2" runat="server" GroupName="RptType" Text="送會公文統計表"></asp:RadioButton><br>
                        <asp:Label ID="lbMaxYM" runat="server">目前統計最大年月：888年88月</asp:Label>
                    </div>
                </div>
            </div>
        </div>
        <asp:CustomValidator Style="z-index: 103; position: absolute; top: 218px; left: 12px" ID="Validator" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary Style="z-index: 106; position: absolute; top: 252px; left: 12px" ID="ValidationSummary1" runat="server" CssClass="hidden"></asp:ValidationSummary>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel(O)" Accesskey = "O" Title = "匯出excel(ALT+O)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btStatic" runat="server" Text="統計" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
