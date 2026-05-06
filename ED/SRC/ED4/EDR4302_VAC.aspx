<%@ Page Language="c#" CodeBehind="EDR4302_VAC.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR4302_VAC" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR4302_VAC 所屬(不含醫療)機構公文處理時效明細表列印作業</title>
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
    <form id="EDR4302_VAC" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
				<div class="dTR">
					<div class="dTDTitle" style="width: 10em">
						<asp:Label ID="Label1" runat="server" CssClass="RequireField">收文日期：</asp:Label>
					</div>
					<div class="dTD" style="width: 15em">
						<asp:TextBox ID="txRcvDateS" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox> - 
						<asp:TextBox ID="txRcvDateE" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="WIDTH: 10em;">
						<asp:label id="Label2" runat="server"  EnableViewState="False">所屬機構：</asp:label>
					</div>
					<div class="dTD" style="WIDTH: 10em;">
						<asp:dropdownlist id="dlOrg" runat="server"></asp:dropdownlist>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="WIDTH: 10em">
						<asp:label id="Label3" runat="server" >辦理天數：</asp:label>
					</div>
					<div class="dTD">
						<asp:dropdownlist id="dlUDIssue" runat="server" Width="7em"></asp:dropdownlist>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="WIDTH: 10em">
						<asp:label id="Label4" runat="server" >逾期天數：</asp:label>
					</div>
					<div class="dTD" style="width: 15em">
						<asp:dropdownlist id="dlOverdue" runat="server" Width="7em"></asp:dropdownlist>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="WIDTH: 10em;">
						<asp:label id="Label5" runat="server"  EnableViewState="False">統計選項：</asp:label>
					</div>
					<div class="dTD" style="width: 15em">
						<asp:CheckBox id="cbVeteran" runat="server" Text="含榮民榮眷基金會"></asp:CheckBox>
					</div>
				</div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btODS" runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btWORD" runat="server" Text="另存WORD" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
