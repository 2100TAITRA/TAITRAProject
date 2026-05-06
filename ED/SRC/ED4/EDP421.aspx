<%@ Page language="c#" Codebehind="EDP421.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDP421" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDP421 時效統計解除鎖定作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDP421" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:9.5em">
							<asp:label id="Label2" runat="server" CssClass="RequireField">統計月份：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txYearMonth" tabIndex="0" runat="server" Width="3em" CssClass="RequireFieldNumeric" MaxLength="5" ></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR" id="trExecName">
						<DIV class="dTDTitle" style="width:9.5em">
							<asp:label id="Label3" runat="server">統計人員：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:label id="lbExecName" runat="server"></asp:label>
						</DIV>
					</DIV>
					<DIV class="dTR" id="trExecTime">
						<DIV class="dTDTitle" style="width:9.5em">
							<asp:label id="Label4" runat="server">統計時間：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:label id="lbExecTime" runat="server"></asp:label>
						</DIV>
					</DIV>
					<DIV class="dTR" id="trSeqNo">
						<DIV class="dTDTitle" style="width:9.5em">
							<asp:label id="Label6" runat="server">統計序號：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:label id="lbSeqNo" runat="server"></asp:label>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:9.5em">
							<asp:label id="Label1" runat="server">目前最大統計年月：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:label id="lbMaxYearMonth" runat="server"></asp:label>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btUnLock" runat="server" Text="解除鎖定" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
			<asp:textbox id="hMaxMonth" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 298px" runat="server" CssClass="hidden"></asp:textbox>
		</FORM>
	</BODY>
</HTML>
