<%@ Page Language="c#" CodeBehind="EDR4351_VAC.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR4351_VAC" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR4351_VAC 承辦公文月分析年報表</title>
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
    <form id="EDR4351_VAC" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
            <asp:TextBox ID="H_Dept" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_Sect" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_User" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_Dept_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_Sect_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_User_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_dlSect_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
            <asp:TextBox ID="H_dlUser_Value" runat="server" CssClass="hidden" Width="19px"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
				<div class="dTR">
					<div class="dTDTitle" style="width: 10em">
						<asp:Label ID="Label1" runat="server" CssClass="RequireField">收文月份：</asp:Label>
					</div>
					<div class="dTD">
						<asp:TextBox ID="txRcvDateS" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:TextBox> - 
						<asp:TextBox ID="txRcvDateE" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="WIDTH: 10em">
						<asp:label id="Label2" runat="server">承辦單位：</asp:label>
					</div>
					<div class="dTD" style="width: 11em">
						<cc1:ComboBox id="dlDept" runat="server" Width="8em" CssClass="comboBox"></cc1:ComboBox>
					</div>
					<div class="dTD">
						<cc1:ComboBox id="dlSect" runat="server" Width="8em" CssClass="comboBox"></cc1:ComboBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="WIDTH: 10em">
						<asp:label id="Label3" runat="server">承辦人：</asp:label>
					</div>
					<div class="dTD" style="width: 12em">
						<cc1:ComboBox id="dlUser" runat="server" Width="8em" CssClass="comboBox"></cc1:ComboBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="WIDTH: 10em">
						<asp:label id="Label6" runat="server">統計方式：</asp:label>
					</div>
					<div class="dTD" style="WIDTH: 15em">
						<asp:RadioButton ID="rbRptDept" runat="server" Text="單位" GroupName="RptType"></asp:RadioButton>
						<asp:RadioButton ID="rbRptUser" runat="server" Text="承辦人" GroupName="RptType"></asp:RadioButton>
					</div>
				</div>
				<div class="dTR">
					<asp:label id="Label5" runat="server" CssClass="hide">本程式為年度報表，查詢範圍不可跨年度執行。</asp:label>
				</div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btODS" runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
