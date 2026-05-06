<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="DFR830.aspx.cs" AutoEventWireup="false" Inherits="AK.DFR830" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>DFR830 數位內容調閱明細表列印作業</title>
    <meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
    <meta content="C#" name="CODE_LANGUAGE">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <link href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="format-detection" content="telephone=no">
    <asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body class="hidden">
    <form id="DFR830" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericBanner.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; position: absolute; top: 102px; left: 10px" runat="server" CssClass="hidden"></asp:ListBox>
        <div id="BaseTable" class="DivBaseTable">
            <div id="MainTable" class="DivTable">
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="RequireField" ID="Label5" runat="server">使用日期：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox ID="txUseDate1" TabIndex="10" runat="server" MaxLength="7" Width="4em" CssClass="RequireField DatePicker"></asp:TextBox>─
						<asp:TextBox ID="txUseDate2" TabIndex="20" runat="server" MaxLength="7" Width="4em" CssClass="RequireField DatePicker"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label class="RequireField" ID="Label2" runat="server">公文文號：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:TextBox class="RequireField" ID="txDocNo1" TabIndex="30" runat="server" MaxLength="15" Width="5.5em"></asp:TextBox>─
						<asp:TextBox class="RequireField" ID="txDocNo2" TabIndex="40" runat="server" MaxLength="15" Width="6em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label6" runat="server">調閱單位：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlDEPT" runat="server" CssClass="comboBox" Width="9em"></cc1:ComboBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label1" runat="server">調閱人員：</asp:Label>
                    </div>
                    <div class="dTD">
                        <cc1:ComboBox ID="dlUSER" runat="server" CssClass="comboBox" Width="6em"></cc1:ComboBox>
                        <asp:TextBox ID="txUserValue" runat="server" CssClass="hidden" Width="3em"></asp:TextBox>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 5.5em">
                        <asp:Label ID="Label3" runat="server">排序方式：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbUesUnit" runat="server" Text="調閱單位" GroupName="OrderType"></asp:RadioButton>
                        <asp:RadioButton ID="rbDocNo" runat="server" Text="公文文號" GroupName="OrderType" Checked="True"></asp:RadioButton>
                    </div>
                </div>
            </div>
            <div class="DivTable" id="MTable3">
                <div class="dTR">
                    <div class="dTD">
                        <asp:Label ID="lbMaxYear" runat="server">目前統計最大年月：888年88月</asp:Label>
                    </div>
                </div>
            </div>
            <asp:ListBox ID="H_dlDept" runat="server" CssClass="hide"></asp:ListBox>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 103; position: absolute; top: 218px; left: 12px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 104; position: absolute; top: 252px; left: 12px" runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
