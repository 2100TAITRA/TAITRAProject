<%@ Page language="c#" Codebehind="EDM112.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDM112" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDM112 公文流程資訊代碼主檔維護作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY>
		<FORM id="EDM112" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<div id="BaseTable" class="DivBaseTable">
                <div id="MainTable" class="DivTable">
					<div class="dTR">
						<div class="dTDTitle" style="width: 7.5em">
							<asp:label id="Label1" runat="server" CssClass="KeyField">流程資訊代碼：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txFlowNo" tabIndex="0" runat="server" Width="2em" CssClass="KeyUpperField" MaxLength="3" ></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 7.5em">
							<asp:label id="Label2" runat="server" CssClass="RequireField">流程資訊說明：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txFlowDesc" tabIndex="0" runat="server" Width="28em" CssClass="RequireField" MaxLength="100" ></asp:textbox>
						</div>
					</div>
				</div>
			</div>
            <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
                <asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
                <asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
                <asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
                <asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
                <asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
            </asp:Panel>
		</FORM>
	</BODY>
</HTML>
