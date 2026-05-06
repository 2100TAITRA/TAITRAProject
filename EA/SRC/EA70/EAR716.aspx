<%@ Page language="c#" Codebehind="EAR716.aspx.cs" AutoEventWireup="false" Inherits="EA70.EAR716" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAR716 機密檔案統計表</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EAR716" onkeyup="jf_CheckFull();" method="post" runat="server"> <!--Template V3 Generated WebForm--> <!--#include file="../EALIB/GenericSearch.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 6.5em; POSITION: absolute; TOP: 0px; HEIGHT: 6.5em">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			    <asp:TextBox ID="empUserId" runat="server"></asp:TextBox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9em"><asp:DropDownList  id="dlDateType" runat="server"></asp:DropDownList></DIV>
						<DIV class="dTD">
							<asp:textbox class= "DatePicker" id="txRmvSecDateS" runat="server" Width="4.5em" MaxLength="7"></asp:textbox>
							－
							<asp:textbox class=" DatePicker" id="txRmvSecDateE" runat="server" Width="4.5em" MaxLength="7"></asp:textbox>
						</DIV>
					</DIV>
					<div class="dTR">
						<div class="dTDTitle" style="width: 9em">
							<asp:Label ID="Label16" runat="server">承辦單位：</asp:Label></div>
						<div class="dTD" style="width: 20em">
							<asp:DropDownList ID="dlDept" runat="server"></asp:DropDownList>
						</div>
					</div>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出EXCEL" Title = "匯出EXCEL" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btODS" runat="server" Text="匯出ODS(C)" Accesskey = "C" Title = "匯出ODS(ALT+C)" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
