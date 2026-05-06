<%@ Page language="c#" Codebehind="ODR263.aspx.cs" AutoEventWireup="false" Inherits="OD.ODR263" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>ODR263 主管決行統計表</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="ODR263" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="width:9em">
							<asp:label class="RequireField" id="Label2" runat="server">年度：</asp:label>
						</div>
						<div class="dTD" style="width:10em">
							<asp:textbox id="txYear" tabIndex="10" runat="server" CssClass="RequireFieldNumeric" Width="2em" MaxLength="3"></asp:textbox>
						</div>	
					</div>
					<div class="dTR">								
						<div class="dTDTitle">			
							<asp:label id="lbMaxYear" runat="server">目前統計最大年度：888年</asp:label>
						</div>	
					</div>
					<div class="dTR">
						<div style="width: 9em" class="dTDTitle">
							<asp:label id="Label3" runat="server">結案類型：</asp:label>
						</div>
						<div class="dTD">
							<asp:radiobutton id="rbCloseAll" runat="server" GroupName="Close" Text="全部"></asp:radiobutton>
							<asp:radiobutton id="rbClose1" runat="server" GroupName="Close" Text="總發文"></asp:radiobutton>
							<asp:radiobutton id="rbClose2" runat="server" GroupName="Close" Text="單位發文"></asp:radiobutton>
							<asp:radiobutton id="rbClose3" runat="server" GroupName="Close" Text="存查"></asp:radiobutton>
						</div>
					</div>
				</div>
				<DIV class="DivTable">
					<DIV class="GridDiv" style="HEIGHT: 12.5em">
						<asp:datagrid id="dg1" runat="server" PageSize="50" CellPadding="4" GridLines="Vertical"></asp:datagrid>
						<asp:textbox class="KeyUpperField" id="h_txYM" tabIndex="-1" runat="server" CssClass="hidden" Width="45px" MaxLength="5"></asp:textbox>
					</DIV>
				</DIV>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btStatic" runat="server" Text="執行統計" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" class="hide" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			</iewc:toolbar>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px"	runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
