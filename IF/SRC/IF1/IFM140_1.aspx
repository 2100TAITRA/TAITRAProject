<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="IFM140_1.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM140_1" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>IFM140_1</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="IFM140_1" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../IFLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px" id="hiddenDiv">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV id="BaseTable" class="DivBaseTable">
				<DIV id="MainTable" class="DivTable">
					<DIV class="dTR">
						<DIV style="WIDTH: 10.5em" class="dTDTitle">
							<asp:label id="Label1" runat="server" Width="118px"  CssClass="KeyField">程式集名稱：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txApplicationSetNo" tabIndex="1" onkeypress="jf_UPPERCASE(e)" runat="server" Width="8.5em" MaxLength="50"  CssClass="KeyField"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 10.5em" class="dTDTitle">
							<asp:label id="Label15" runat="server" Width="8em">說　　明：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txDescription" tabIndex="2" runat="server" Width="15em" Rows="3" TextMode="MultiLine" MaxLength="200"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 10.5em" class="dTDTitle">
							<asp:label id="Label8" runat="server" Width="9.5em">執行需具備之權限：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txPrivilege2" runat="server" Width="8.5em" CssClass="displayOnly"></asp:textbox>
							<asp:button id="btPriv_Set" tabIndex="3" runat="server" Text="設定"></asp:button>&nbsp;
							<asp:button id="btPriv_Del" tabIndex="4" runat="server" Text="刪除"></asp:button>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 10.5em" class="dTDTitle">
							<asp:label id="lbSeq" runat="server">排　　序：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txSeq" runat="server" Width="4.5em" MaxLength="2" CssClass="InputFieldNumeric"></asp:textbox>
						</DIV>
					</DIV>
				</DIV>
				<asp:validationsummary id="Validationsummary2" runat="server" CssClass="hidden"></asp:validationsummary>
				<asp:customvalidator id="Customvalidator1" runat="server" ErrorMessage="CustomValidator" CssClass="hidden"></asp:customvalidator>
				<asp:textbox id="txPrivilege" runat="server" Width="8.5em" CssClass="hide"></asp:textbox>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
					<asp:Button ID="btOpen" runat="server" Text="新增" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
					<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
					<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
					<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
					<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
					<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
					<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
					<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:none;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
