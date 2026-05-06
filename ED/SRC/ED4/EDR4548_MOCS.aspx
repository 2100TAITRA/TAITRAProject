<%@ Page Language="c#" CodeBehind="EDR4548_MOCS.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR4548_MOCS" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<html>
<head>
    <title>EDR4548_MOCS 逾期未結案公文稽催表列印作業</title>
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
    <form id="EDR4548_MOCS" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EDLIB/GenericBanner.htm"-->
        <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
            <asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
			<asp:textbox id="H_Dept" runat="server" CssClass="hide"></asp:textbox>
			<asp:textbox id="H_Dept_Value" runat="server" CssClass="hide"></asp:textbox>
			<asp:textbox id="H_Sect" runat="server" CssClass="hide"></asp:textbox>
			<asp:textbox id="H_User" runat="server" CssClass="hide"></asp:textbox>
			<asp:textbox id="H_Sect_Value" runat="server" CssClass="hide"></asp:textbox>
			<asp:textbox id="H_User_Value" runat="server" CssClass="hide"></asp:textbox>
			<asp:textbox id="H_dlSect_Value" runat="server" CssClass="hide"></asp:textbox>
			<asp:textbox id="H_dlUser_Value" runat="server" CssClass="hide"></asp:textbox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
				<div class="dTR">
					<div class="dTDTitle" style="WIDTH: 7em;">
						<asp:label id="Label1" runat="server">收創日期：</asp:label>
					</div>
					<div class="dTD">
						<asp:textbox id="txRcvDateS" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
						<asp:label id="Label2" runat="server">-</asp:label>
						<asp:textbox id="txRcvDateE" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="WIDTH: 7em;">
						<asp:label id="Label3" runat="server">限辦日期：</asp:label>
					</div>
					<div class="dTD">
						<asp:textbox id="txDueDateS" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
						<asp:label id="Label4" runat="server">-</asp:label>
						<asp:textbox id="txDueDateE" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="WIDTH: 7em;">
						<asp:label id="Label5" runat="server">承辦單位：</asp:label>
					</div>
					<div class="dTD">
						<cc1:combobox id="dlDept" runat="server" Width="8em" CssClass="comboBox"></cc1:combobox>
						<cc1:combobox id="dlSect" runat="server" Width="8em" CssClass="comboBox"></cc1:combobox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="WIDTH: 7em;">
						<asp:label id="Label6" runat="server">承辦人：</asp:label>
					</div>
					<div class="dTD">
						<cc1:combobox id="dlUser" runat="server" Width="6em" CssClass="comboBox"></cc1:combobox>
					</div>
				</div>
                <div class="dTR">
                    <div class="dTDTitle" style="width: 7em">
                        <asp:Label ID="Label7" runat="server">逾期天數：</asp:Label>
                    </div>
                    <div class="dTD">
                        <asp:Label ID="Label8" runat="server">自</asp:Label>
                        <asp:TextBox ID="txOverdue" runat="server" Width="2em" CssClass="InputFieldNumeric" MaxLength="3"></asp:TextBox>
                        <asp:Label ID="Label9" runat="server">天起</asp:Label>
                    </div>
                </div>
            </div>
        </div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
            <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
        </asp:Panel>
    </form>
</body>
</html>
