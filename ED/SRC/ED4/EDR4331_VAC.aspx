<%@ Page Language="c#" CodeBehind="EDR4331_VAC.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR4331_VAC" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR4331_VAC ┯快そゅ罿ぱ计稪羆</title>
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
    <form id="EDR4331_VAC" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
			<asp:textbox id="H_Dept" runat="server" CssClass="hide"></asp:textbox>
			<asp:textbox id="H_Dept_Value" runat="server" CssClass="hide"></asp:textbox>
			<asp:textbox id="H_User" runat="server" CssClass="hide"></asp:textbox>
			<asp:textbox id="H_User_Value" runat="server" CssClass="hide"></asp:textbox>
			<asp:textbox id="H_dlUser_Value" runat="server" CssClass="hide"></asp:textbox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
				<div class="dTR">
					<div class="dTDTitle" style="width: 8em">
						<asp:Label ID="Label1" runat="server" CssClass="RequireField">Μ(承)ゅら戳</asp:Label>
					</div>
					<div class="dTD" style="width: 14em">
						<asp:TextBox ID="txRcvDateS" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>°
						<asp:TextBox ID="txRcvDateE" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
					</div>
					<div class="dTDTitle" style="WIDTH: 8em;">
						<asp:label id="Label7" runat="server"  EnableViewState="False">参璸よΑ</asp:label>
					</div>
					<div class="dTD" style="WIDTH: 8em;">
						<asp:radiobutton id="rbDept" runat="server" GroupName="doctype" Text="虫"></asp:radiobutton>
						<asp:radiobutton id="rbUser" runat="server" GroupName="doctype" Text="┯快"></asp:radiobutton>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="WIDTH: 8em;">
						<asp:label id="Label3" runat="server"  EnableViewState="False">┯快虫</asp:label>
					</div>
					<div class="dTD" style="WIDTH: 14em;">
						<cc1:combobox id="dlDept" runat="server" Width="8em" CssClass="comboBox"></cc1:combobox>
					</div>
					<div class="dTDTitle" style="WIDTH: 8em;">
						<asp:label id="Label4" runat="server"  EnableViewState="False">┯快</asp:label>
					</div>
					<div class="dTD" style="width: 15em">
						<cc1:combobox id="dlUser" runat="server" Width="6em" CssClass="comboBox"></cc1:combobox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="WIDTH: 8em">
						<asp:label id="Label5" runat="server" >快拨よΑ</asp:label>
					</div>
					<div class="dTD" style="WIDTH: 14em">
						<asp:dropdownlist id="dlCloseType" runat="server"></asp:dropdownlist>
					</div>
					<div class="dTDTitle" style="WIDTH: 8em">
						<asp:label id="Label6" runat="server" >快瞶ぱ计</asp:label>
					</div>
					<div class="dTD" style="WIDTH: 10em">
						<asp:dropdownlist id="dlUdIssue" runat="server"></asp:dropdownlist>
					</div>
				</div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="箇凝" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btExcel" runat="server" Text="蹲Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            <asp:Button ID="btODS" runat="server" Text="蹲ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
