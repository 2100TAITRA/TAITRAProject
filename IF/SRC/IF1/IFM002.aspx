<%@ Page Language="c#" CodeBehind="IFM002.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM002" %>

<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML >
<html>
<head>
	<title>IFM002 新增單位作業</title>
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
	<form id="IFM002" onkeyup="jf_CheckFull();" method="post" runat="server">
		<!--Template V3 Generated WebForm-->
		<!--#include file="../IFLIB/GenericBanner.htm"-->
		<div id="hiddenDiv" style="z-index: -100; position: absolute; width: 100px; height: 100px; visibility: hidden; top: 0px; left: 0px">
			<asp:CustomValidator ID="Validator" runat="server" ErrorMessage="CustomValidator"></asp:CustomValidator><asp:ValidationSummary ID="ValidationSummary1" runat="server"></asp:ValidationSummary>
			<asp:ListBox ID="lbReturnValue" runat="server" Width="80px"></asp:ListBox>
		</div>
		<div id="BaseTable" class="DivBaseTable">
			<div class="DivTable" id="MainTable">
				<div class="dTR">
					<div class="dTDTitle">
						<asp:Label ID="Label1" runat="server" CssClass="KeyField">隸屬機關：</asp:Label>
					</div>
					<div class="dTD">
						<asp:DropDownList ID="dlSource" runat="server" Width="15em"></asp:DropDownList>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle">
						<asp:Label ID="Label4" runat="server" CssClass="KeyField">單位代碼：</asp:Label>
					</div>
					<div class="dTD">
						<asp:TextBox ID="txDeptNO" runat="server" Width="3.5em" CssClass="KeyField" MaxLength="6"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle">
						<asp:Label ID="Label5" runat="server" CssClass="RequireField">單位名稱：</asp:Label>
					</div>
					<div class="dTD">
						<asp:TextBox ID="txDeptName" runat="server" Width="15em" CssClass="RequireField" MaxLength="20"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle">
						<asp:Label ID="Label6" runat="server" CssClass="RequireField">單位類型：</asp:Label>
					</div>
					<div class="dTD">
						<asp:DropDownList ID="dlDepType" runat="server" Width="15em"></asp:DropDownList>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle">
						<asp:Label ID="Label8" runat="server" CssClass="RequireField">可否單位發文：</asp:Label>
					</div>
					<div class="dTD">
						<asp:RadioButtonList ID="rbUnitIssue" runat="server" Width="5.5em" RepeatDirection="Horizontal">
							<asp:ListItem Value="Y">可</asp:ListItem>
							<asp:ListItem Value="N">否</asp:ListItem>
						</asp:RadioButtonList>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle">
						<asp:Label ID="Label2" runat="server" CssClass="RequireField">單位層級：</asp:Label>
					</div>
					<div class="dTD">
						<asp:RadioButton ID="rbDeptLvNo1" runat="server" Text="一級單位" GroupName="brLevelNo"></asp:RadioButton>
						<asp:RadioButton ID="rbDeptLvNo2" runat="server" Text="二級單位" GroupName="brLevelNo"></asp:RadioButton>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle">
						<asp:Label ID="Label3" runat="server">上層單位：</asp:Label>
					</div>
					<div class="dTD">
						<asp:DropDownList ID="dlDept" runat="server" Width="15em"></asp:DropDownList>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle">
						<asp:Label ID="Label7" runat="server">排序：</asp:Label>
					</div>
					<div class="dTD">
						<asp:TextBox ID="txRankSeq" runat="server" CssClass="InputFieldNumeric" Width="2em" MaxLength="3"></asp:TextBox>
					</div>
				</div>
				<div class="dTR">
					<div class="dTDTitle">
						<asp:Label ID="Label9" runat="server">其他系統代號：</asp:Label>
					</div>
					<div class="dTD">
						<asp:TextBox ID="txInnerNo" runat="server" Width="10.5em" MaxLength="20"></asp:TextBox>
					</div>
				</div>
			</div>
			<asp:TextBox ID="H_SourceOrgno" runat="server" CssClass="hidden"></asp:TextBox>
		</div>
		<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
			<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
			<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
			<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:none;modifymode:none;" />
		</asp:Panel>
		<asp:TextBox ID="H_DEPTNO" Style="z-index: 102; position: absolute; top: 336px; left: 584px"
			runat="server" Width="0px" CssClass="hidden"></asp:TextBox>
		<asp:TextBox ID="H_DEPTNAME" Style="z-index: 103; position: absolute; top: 376px; left: 584px"
			runat="server" Width="0px" CssClass="hidden"></asp:TextBox>
		<asp:TextBox ID="H_CheckOrgMgr" Style="z-index: 104; position: absolute; top: 344px; left: 640px"
			runat="server" CssClass="hidden"></asp:TextBox>
	</form>
</body>
</html>
