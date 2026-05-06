<%@ Page language="c#" Codebehind="EDR472.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR472" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR472 收發文件數統計表列印作業</TITLE>
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
		<FORM id="EDR472" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px" id="hiddenDiv">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV id="BaseTable" class="DivBaseTable">
				<DIV id="MainTable" class="DivTable">
					<DIV class="dTR">
						<DIV class="dTDTitle">
							<asp:label style="Z-INDEX: 0" id="Label1" runat="server" CssClass="RequireField" 
								>公文類型：</asp:label></DIV>
						<DIV class="dTD"><asp:radiobutton id="rbreceiv" runat="server" GroupName="1"  Text="收文" CssClass="RequireField"></asp:radiobutton>
							<asp:radiobutton style="Z-INDEX: 0" id="rbpost" runat="server" GroupName="1"  Text="發文"
								CssClass="RequireField"></asp:radiobutton></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle">
							<asp:label id="Label2" runat="server" CssClass="RequireField"  >統計類型：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:radiobutton style="Z-INDEX: 0" id="rbMrpt" runat="server" GroupName="2"  Text="月報" CssClass="RequireField"></asp:radiobutton>
							<asp:radiobutton style="Z-INDEX: 0" id="rbYrpt" runat="server" GroupName="2"  Text="年報" CssClass="RequireField"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle"><asp:label id="Label3" runat="server"   >統計年份：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txYear" tabIndex="0" runat="server" Width="2em"  
								  MaxLength="3" CssClass="InputFieldNumeric"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle"><asp:label style="Z-INDEX: 0" id="Label4" runat="server"  
								>統計月份：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox style="Z-INDEX: 0" id="txMonth" tabIndex="0" runat="server" Width="3em" 
								   MaxLength="5" CssClass="InputFieldNumeric"></asp:textbox></DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
