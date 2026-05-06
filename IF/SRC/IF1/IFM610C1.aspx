<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="IFM610C1.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM610C1" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<TITLE>IFM610C1 桌面捷徑維護子視窗</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="IFM610C1" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../IFLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:dropdownlist id="ddlShortCut" runat="server" CssClass="hide"></asp:dropdownlist>
			</DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6.5em;"><asp:label id="Label1" runat="server">捷徑名稱：</asp:label></div>
						<div class="dTD" >
							&nbsp;
							<asp:textbox id="txName" tabIndex="1" runat="server" Width="9em"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6.5em;"><asp:label id="Label3" runat="server">程式路徑：</asp:label></div>
						<div class="dTD">
							&nbsp;
							<asp:textbox id="txPath" runat="server" Width="9em" CssClass="DisplayOnly"></asp:textbox>
							&nbsp;
							<asp:button id="btBrowse" tabIndex="4" runat="server" Width="3.5em" Text="瀏覽"></asp:button>
						</div>
					</div>
				</div>
			</div>
			<asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
