<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDR437.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR437" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR437 逾期未辦結公文及逾期公文統計報表列印作業</TITLE>
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
		<FORM id="EDR437" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px">
			<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
			<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR" id="hid1">
						<DIV class="dTDTitle" style="WIDTH: 6em" ><asp:label id="lbYear" runat="server" CssClass="RequireField"  >列印年度：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txYear" tabIndex="0" runat="server" Width="2em" CssClass="RequireFieldNumeric" 
									 MaxLength="20" ></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR" id="hid2">
						<DIV class="dTDTitle" style="WIDTH: 6em" ><asp:label id="lbMonth" runat="server" CssClass="RequireField"  >列印月份：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txYearMonthS" tabIndex="0" runat="server" Width="3em" CssClass="RequireFieldNumeric"
								  MaxLength="5" ></asp:textbox><asp:label id="Label2" runat="server" CssClass="RequireField"  >～</asp:label>
								  <asp:textbox id="txYearMonthE" tabIndex="0" runat="server" Width="3em" CssClass="RequireFieldNumeric"
								  MaxLength="5" ></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR" id="hid3">
						<DIV class="dTDTitle" style="WIDTH: 6em" ><asp:label id="lbOuid" runat="server" CssClass="RequireField"  >承辦單位：</asp:label></DIV>
						<DIV class="dTD" ><asp:dropdownlist id="dlOuId" runat="server" Width="11.5em" CssClass="RequireField" 
								></asp:dropdownlist></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em" ><asp:label id="lbReport" runat="server" CssClass="RequireField"  >報表種類：</asp:label></DIV>
						<DIV class="dTD"><asp:radiobutton id="rbAllDelay" runat="server" CssClass="RequireField"  Text="全機關逾期公文統計表"
								GroupName="temp"></asp:radiobutton><BR>
							<asp:radiobutton id="rbOUdelay" runat="server" CssClass="RequireField" Text="各單位逾期公文統計表" Checked="True"
								GroupName="temp"></asp:radiobutton><BR>
							<asp:radiobutton id="rbPerson" runat="server" CssClass="RequireField"  Text="個人未辦結率統計表"
								GroupName="temp"></asp:radiobutton><BR>
							<asp:radiobutton id="rbOU" runat="server" CssClass="RequireField"  Text="各單位未辦結率統計表"
								GroupName="temp"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em" >&nbsp;</DIV>
						<DIV class="dTD"><asp:label id="Label1" runat="server"></asp:label>
						<asp:label id="lbMaxYear" runat="server"></asp:label>
						<asp:textbox id="h_txYM" runat="server" class="hide"></asp:textbox></DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass = "hide" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
			<asp:datagrid id="dg1" style="Z-INDEX: 101; POSITION: absolute; TOP: 352px; LEFT: 360px" runat="server"></asp:datagrid>
		</FORM>
	</BODY>
</HTML>
