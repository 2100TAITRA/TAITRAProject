<%@ Page Language="c#" CodeBehind="EAR822.aspx.cs" AutoEventWireup="false" Inherits="EA08.EAR822" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>

<!DOCTYPE HTML>
<html>
<head>
    <title>EAR822 調閱次數統計彙總表</title>
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
    <form id="EAR822" onkeyup="jf_CheckFull();" method="post" runat="server">
        <!--Template V3 Generated WebForm-->
        <!--#include file="../EALIB/GenericBanner.htm"-->
		 <div id="hiddenDiv" style="z-index: -100; left: 0px; visibility: hidden; width: 100px; position: absolute; top: 0px; height: 100px">
            <asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
            <asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
			 <asp:TextBox ID="empUserId" runat="server"></asp:TextBox>
        </div>
        <div class="DivBaseTable" id="BaseTable">
            <div class="DivTable" id="MainTable">
				<div class="dTR">
					<div class="dTDTitle" style="width: 8em">
						<asp:Label ID="Label1" runat="server" CssClass="RequireField">調案日期：</asp:Label>
					</div>
					<div class="dTD" style="width: 14em">
						<asp:TextBox ID="txWorkDateS" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>～
						<asp:TextBox ID="txWorkDateE" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
					</div>
					<div class="dTDTitle" style="WIDTH: 8em">
						<asp:label id="Label2" runat="server" >調案方式：</asp:label>
					</div>
					<div class="dTD" style="WIDTH: 14em">
						<asp:dropdownlist id="dlBorrowType" runat="server"></asp:dropdownlist>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="WIDTH: 8em">
						<asp:label id="Label5" runat="server" >保存年限：</asp:label>
					</div>
					<div class="dTD" style="WIDTH: 14em">
						<asp:dropdownlist id="dlKeepYear" runat="server"></asp:dropdownlist>
					</div>
					<div class="dTDTitle" style="WIDTH: 8em">
						<asp:label id="Label3" runat="server" >調案文號：</asp:label>
					</div>
					<div class="dTD" style="WIDTH: 5.5em">
						<asp:TextBox id="txBorrowDocNo" runat="server" MaxLength="10" style="WIDTH:5.5em"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="WIDTH: 8em">
						<asp:label id="Label6" runat="server" >調案單位：</asp:label>
					</div>
					<div class="dTD" style="WIDTH: 14em">
						<asp:dropdownlist id="dlBorrowDept" runat="server"></asp:dropdownlist>
					</div>
					<div class="dTDTitle" style="WIDTH: 8em">
						<asp:label id="Label4" runat="server" >調案人：</asp:label>
					</div>
					<div class="dTD" style="WIDTH: 10em">
						<asp:dropdownlist id="dlBorrowUser" runat="server"></asp:dropdownlist>
						<asp:TextBox ID="H_userID" runat="server" CssClass="hide" ></asp:TextBox>
                        <asp:TextBox ID="H_UserInfo" runat="server" CssClass="hide" ></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="WIDTH: 8em">
						<asp:label id="Label7" runat="server" >統計方式：</asp:label>
					</div>
					<div class="dTD" style="WIDTH: 10em">
						<asp:dropdownlist id="dlReportCntType" runat="server"></asp:dropdownlist>
					</div>
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
