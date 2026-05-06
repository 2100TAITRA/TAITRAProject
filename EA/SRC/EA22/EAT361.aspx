<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>

<%@ Page Language="c#" CodeBehind="EAT361.aspx.cs" AutoEventWireup="false" Inherits="EA22.EAT361" %>

<!DOCTYPE HTML>
<html>
<head>
	<title>EAT361 案卷編目校核單列印作業</title>
	<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
	<meta content="C#" name="CODE_LANGUAGE">
	<meta content="JavaScript" name="vs_defaultClientScript">
	<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
	<link href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="format-detection" content="telephone=no">
	<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
</head>
<body>
	<form id="EAT361" onkeyup="jf_CheckFull();" method="post" runat="server">
		<!--Template V3 Generated WebForm-->
		<!--#include file="../EALIB/GenericBanner.htm"-->
		<div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
			<asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator>
			<asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
			<asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
		</div>
		<div id="BaseTable" class="DivBaseTable">
			<div id="MainTable" class="DivTable">
				<div class="dTR">
					<div class="dTDTitle" style="width: 5.5em">
						<asp:Label ID="Label1" runat="server" CssClass="RequireField">編目日期：</asp:Label>
					</div>
					<div class="dTD">
						<asp:TextBox ID="txSDate" TabIndex="10" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
						<asp:Label ID="Label4" runat="server">－</asp:Label>
						<asp:TextBox ID="txEDate" TabIndex="20" runat="server" Width="4em" CssClass="RequireField DatePicker" MaxLength="7"></asp:TextBox>
					</div>
				</div>
				<div class="hide">
					<div class="dTDTitle" style="width: 5.5em">
						<asp:Label ID="Label2" runat="server">分類號：</asp:Label>
					</div>
					<div class="dTD">
						<asp:TextBox ID="txClsNo" TabIndex="30" runat="server" Width="10.5em" CssClass="InputUpperFieldText" MaxLength="20"></asp:TextBox>
						<asp:ImageButton ID="btHelp" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
						<asp:Label ID="txClsName" TabIndex="-1" runat="server" ReadOnly="True" Width="12.5em"></asp:Label>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 5.5em">
						<asp:Label ID="Label5" runat="server">案號條件：</asp:Label></div>
					<div class="dTD">
						<asp:Label ID="Label6" runat="server">版 本 別：</asp:Label>
						<asp:TextBox ID="txVerNo" runat="server" MaxLength="3" Width="1.5em"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 5.5em">&nbsp</div>
					<div class="dTD">
						<asp:Label ID="Label7" runat="server">檔號(起)：</asp:Label>
						<asp:TextBox ID="txFileYearS" runat="server" MaxLength="3" Width="1.5em"></asp:TextBox>
						<asp:Label ID="Label8" runat="server">(年度)</asp:Label>
						<asp:Label ID="Label9" runat="server">－</asp:Label>
						<asp:TextBox ID="txClsNoS" runat="server" MaxLength="20" Width="10.5em"></asp:TextBox>
						<asp:TextBox ID="txClsKeyS" runat="server" MaxLength="20" CssClass="hide"></asp:TextBox>
						<asp:ImageButton ID="btHelpS" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
						<asp:Label ID="Label10" runat="server">(分類)</asp:Label>
						<asp:Label ID="Label11" runat="server">－</asp:Label>
						<asp:TextBox ID="txCaseNoS" runat="server" MaxLength="12" Width="7em"></asp:TextBox>
						<asp:ImageButton ID="btHelpS2" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
						<asp:Label ID="Label12" runat="server">(案次)</asp:Label>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle" style="width: 5.5em">&nbsp</div>
					<div class="dTD">
						<asp:Label ID="Label13" runat="server">檔號(迄)：</asp:Label>
						<asp:TextBox ID="txFileYearE" runat="server" MaxLength="3" Width="1.5em"></asp:TextBox>
						<asp:Label ID="Label14" runat="server">(年度)</asp:Label>
						<asp:Label ID="Label15" runat="server">－</asp:Label>
						<asp:TextBox ID="txClsNoE" runat="server" MaxLength="20" Width="10.5em"></asp:TextBox>
						<asp:TextBox ID="txClsKeyE" runat="server" MaxLength="20" CssClass="hide"></asp:TextBox>
						<asp:ImageButton ID="btHelpE" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
						<asp:Label ID="Label16" runat="server">(分類)</asp:Label>
						<asp:Label ID="Label17" runat="server">－</asp:Label>
						<asp:TextBox ID="txCaseNoE" runat="server" MaxLength="12" Width="7em"></asp:TextBox>
						<asp:ImageButton ID="btHelpE2" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:ImageButton>
						<asp:Label ID="Label18" runat="server">(案次)</asp:Label>
					</div>
				</div>
				<div class="dTR">
				<div class="dTDTitle" style="width: 5.5em">
					<asp:Label ID="Label3" runat="server">編目人員：</asp:Label>
				</div>
				<div class="dTD">
					<cc1:ComboBox ID="dlUser" TabIndex="40" runat="server" CssClass="comboBox" Width="6.5em"></cc1:ComboBox>
					<asp:TextBox ID="H_ClsKey" TabIndex="-1" runat="server" Width="1.5em" CssClass="hide"></asp:TextBox>
					<asp:TextBox ID="H_OrgNo" runat="server" CssClass="hide"></asp:TextBox>
				</div>
			</div>
			</div>
		</div>
        <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
			<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btODS" runat="server" Text="匯出ODS" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
		</asp:Panel>
	</form>
</body>
</html>
