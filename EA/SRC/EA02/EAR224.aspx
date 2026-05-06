<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAR224.aspx.cs" AutoEventWireup="false" Inherits="EA02.EAR224" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAR224 逾期未歸檔案件稽催單列印作業</title>
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
    <form id="EAR224" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericSearch.htm"-->
        <div style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px"
            id="hiddenDiv">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label2" runat="server">結案日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:TextBox ID="txCloseDateS" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>～
						<asp:TextBox ID="txCloseDateE" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label3" runat="server">應歸檔日期：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:TextBox ID="txExpArchiveDate" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:TextBox>
                    </div>
                </div>
                <div class="dTDTitle" style="width: 8em">
                    <asp:Label ID="Label1" runat="server" EnableViewState="False">承辦單位：</asp:Label>
                </div>
                <div class="dTD" style="width: 15em;">
                    <asp:DropDownList ID="dlDept" runat="server" Width="8em">
                    </asp:DropDownList>
                </div>
                <div class="dTDTitle" style="width: 8em">
                    <asp:Label ID="Label5" runat="server">逾期天數：</asp:Label>
                </div>
                <div class="dTD" style="width: 15em">
                    <asp:DropDownList ID="dlDueDays" runat="server" Width="8em">
                    </asp:DropDownList>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label9" runat="server">查詢類別：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 15em">
                        <asp:DropDownList ID="dlSearchType" runat="server" Width="8em">
                        </asp:DropDownList>
                    </div>
                    <div class="dTDTitle" style="width: 8em">
                        <asp:Label ID="Label13" runat="server">公文性質：</asp:Label>
                    </div>
                    <div class="dTD" style="width: 10em">
                        <asp:DropDownList ID="dlDocType" runat="server" Width="8em">
                        </asp:DropDownList>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出EXCEL" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btODS" runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:TextBox Style="z-index: 102; position: absolute; top: 368px; left: 488px" ID="hMaxMonth" runat="server" CssClass="hide"></asp:TextBox>
        <asp:DropDownList Style="z-index: 103; position: absolute; top: 384px; left: 616px" ID="dlOuId" runat="server" CssClass="hide"></asp:DropDownList>
    </form>
</body>
</html>
