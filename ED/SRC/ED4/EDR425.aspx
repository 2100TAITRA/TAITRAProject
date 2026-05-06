<%@ Page language="c#" Codebehind="EDR425.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR425" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR425 各組室決行公文統計作業</TITLE>
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
		<FORM id="EDR425" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<DIV id="BaseTable" class="DivBaseTable">
				<DIV id="MainTable" class="DivTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em"><asp:label id="lbBackDate" runat="server" CssClass="RequireField" 
								>列印月份：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox style="Z-INDEX: 0" id="txYearMonth" tabIndex="0" runat="server" Width="3em" CssClass="RequireFieldNumeric"
								  MaxLength="5"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em"><asp:label id="Label2" runat="server" Width="80px" CssClass="RequireField" 
								>統計來源：</asp:label></DIV>
						<DIV class="dTD"><asp:radiobutton id="rbAll" runat="server" CssClass="RequireField" Text="所有決行公文" GroupName="1"></asp:radiobutton><br>
							<asp:radiobutton id="rbDue" runat="server" CssClass="RequireField" Text="逾期決行公文" GroupName="1"></asp:radiobutton></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">&nbsp;</DIV>
						<DIV class="dTD"><asp:checkbox id="cbUpLvl" runat="server"  Text="包含上級機關"></asp:checkbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:0.5em">&nbsp;</DIV>
						<DIV class="dTD"><asp:label id="lbMaxYM" runat="server"></asp:label></DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btStatic" runat="server" Text="統計" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出EXCEL" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:textbox style="Z-INDEX: 102; POSITION: absolute; TOP: 304px; LEFT: 288px" id="hMaxMonth"
				runat="server" CssClass="hide"></asp:textbox>
			<asp:DropDownList style="Z-INDEX: 103; POSITION: absolute; TOP: 304px; LEFT: 528px" id="dlOuId" runat="server"
				CssClass="hide"></asp:DropDownList>
		</FORM>
	</BODY>
</HTML>
