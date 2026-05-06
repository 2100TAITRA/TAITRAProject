<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDR433.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR433" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR433 公文辦理績效統計表列印作業</TITLE>
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
		<FORM id="EDR433" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px" id="hiddenDiv">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:label id="H_StaticDate" runat="server"></asp:label>
			</DIV>
			<DIV id="BaseTable" class="DivBaseTable">
				<DIV id="MainTable" class="DivTable">
					<DIV class="dTR">
						<DIV style="WIDTH: 8em" class="dTDTitle">
							<asp:label id="Label2" runat="server" CssClass="RequireField">列印月份：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txMonth" tabIndex="0" runat="server" Width="3em" CssClass="RequireField" MaxLength="5" ></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 8em" class="dTDTitle">
							<asp:label id="Label1" runat="server" CssClass="RequireField">統計單位：</asp:label>
						</DIV>
						<DIV class="dTD"><asp:dropdownlist id="dlDept" tabIndex="0" runat="server" ></asp:dropdownlist>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 8em" class="dTDTitle" >
							<asp:label id="Label3" runat="server" CssClass="RequireField">報表類型：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbRpt1" runat="server" GroupName="RptType" Text="公文時效比較表"></asp:radiobutton><BR>
							<asp:radiobutton id="rbRpt2" runat="server" GroupName="RptType" Text="辦理天數趨勢表"></asp:radiobutton><BR>
							<asp:radiobutton id="rbRpt3" runat="server" GroupName="RptType" Text="逾期案件趨勢表"></asp:radiobutton><BR>
							<asp:radiobutton id="rbRpt4" runat="server" GroupName="RptType" Text="受會逾期趨勢表"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<asp:label id="lbStatic" runat="server"></asp:label>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btStatic" runat="server" Text="統計" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出EXCEL" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
