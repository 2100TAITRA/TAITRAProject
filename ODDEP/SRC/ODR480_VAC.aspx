<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="ODR480_VAC.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR480_VAC" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>ODR480_VAC 公文電子交換統計作業</title>
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
    <form id="ODR480_VAC" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V2 Generated WebForm-->
        <!--#include file="Template/Res/GenericChild.htm"-->
        <asp:ListBox ID="lbReturnValue" Style="z-index: 102; position: absolute; top: 102px; left: 10px"
            runat="server" CssClass="hidden"></asp:ListBox>
        <asp:TextBox CssClass="hide" ID="h_txYM" TabIndex="15" runat="server" MaxLength="5"></asp:TextBox>
        <div id="BaseTable" class="DivBaseTable">
            <div class="DivTable" id="MainTable">
				<div class="dTR">
					<div class="dTDTitle" style="width: 10em">
						<asp:Label ID="Label1" runat="server" CssClass="RequireField">列印月份：</asp:Label>
					</div>
					<div class="dTD" style="width: 15em">
						<asp:TextBox ID="txYearmonth" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="WIDTH: 10em;">
						<asp:label id="Label2" runat="server"  EnableViewState="False">列印單位：</asp:label>
					</div>
					<div class="dTD" style="WIDTH: 10em;">
						<asp:dropdownlist id="dlDept" runat="server"></asp:dropdownlist>
					</div>
				</div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label3" runat="server">報表選項：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:RadioButton ID="rbEIssueStatic" runat="server" Text="公文電子交換數量統計表" Checked="True" GroupName="report"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbEIssueDetail" runat="server" Text="公文電子交換數量明細表" GroupName="report"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbESignStatic" runat="server" Text="公文線上簽核統計表" GroupName="report"></asp:RadioButton><br>
                        <asp:RadioButton ID="rbEIssueAndESignStatic" runat="server" Text="電子交換及線上簽核數量統計總表" GroupName="report"></asp:RadioButton>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">
                        <asp:Label ID="Label4" runat="server">明細選項：</asp:Label>
                    </div>
                    <div class="dTD">
						<asp:dropdownlist id="dlEIssueDetail" runat="server"></asp:dropdownlist>
                    </div>
                </div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 10em">目前統計最大年月：</div>
                    <div class="dTD">
                        <asp:Label ID="lbMaxYear" runat="server">888年88月</asp:Label>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel" title = "匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
		    <asp:Button ID="btODS" runat="server" Text="匯出ODS" Title="匯出ODS"  Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
		    <asp:Button ID="btWORD" runat="server" Text="另存WORD" Title="另存WORD"  Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
        <asp:CustomValidator ID="Validator" Style="z-index: 104; position: absolute; top: 218px; left: 12px"
            runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:CustomValidator>
        <asp:ValidationSummary ID="ValidationSummary1" Style="z-index: 105; position: absolute; top: 252px; left: 12px"
            runat="server" CssClass="hidden"></asp:ValidationSummary>
    </form>
</body>
</html>
