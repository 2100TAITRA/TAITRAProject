<%@ Page language="c#" Codebehind="EAR419.aspx.cs" AutoEventWireup="false" Inherits="EA41.EAR419" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAR419 保存狀況查詢作業</TITLE>
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
		<FORM id="EAR419" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<DIV id="BaseTable" class="DivBaseTable">
				<DIV  id="MainTable" class="DivTable">
					<DIV class="dTR">
						<DIV style="WIDTH: 7em" class="dTDTitle" ><asp:label id="Label3" runat="server"   >公文文號：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txDocNoS" tabIndex="0" runat="server" Width="8em" 
								  MaxLength="15"></asp:textbox>－
							<asp:textbox id="txDocNoE" tabIndex="0" runat="server" Width="8em" 
								  MaxLength="15"></asp:textbox><asp:textbox id="txFileNoSep" runat="server" CssClass="hide"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 7em" class="dTDTitle"><asp:label id="Label5" runat="server" >檔號 (起)：</asp:label></DIV>
						<DIV  class="dTD"><asp:textbox id="txYearS" tabIndex="30" CssClass="InputFieldNumeric" runat="server" Width="2em"
								   MaxLength="3"></asp:textbox>－
							<asp:textbox id="txClsS" tabIndex="35" onkeypress="jf_UPPERCASE()" runat="server" Width="10.5em"
								   MaxLength="20"></asp:textbox>－
							<asp:textbox id="txCaseS" tabIndex="40" onkeypress="jf_UPPERCASE()" runat="server" Width="6.5em"
								   MaxLength="12"></asp:textbox>－
							<asp:textbox id="txVolS" tabIndex="45" onkeypress="jf_UPPERCASE()" runat="server" Width="2.5em"
								   MaxLength="4"></asp:textbox>－
							<asp:textbox id="txSeqS" tabIndex="50" CssClass="InputFieldNumeric" runat="server" Width="2em"
								   MaxLength="3"></asp:textbox><asp:dropdownlist id="dlKeepStateGrp_LEN1" runat="server" CssClass="hide"></asp:dropdownlist><asp:textbox id="txKeepNo" runat="server" Width="5em" CssClass="hide"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 7em" class="dTDTitle"><asp:label id="Label6" runat="server" >檔號 (訖)：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txYearE" tabIndex="55" CssClass="InputFieldNumeric" runat="server" Width="2em"
								   MaxLength="3"></asp:textbox>－
							<asp:textbox id="txClsE" tabIndex="60" onkeypress="jf_UPPERCASE()" runat="server" Width="10.5em"
								   MaxLength="20"></asp:textbox>－
							<asp:textbox id="txCaseE" tabIndex="65" onkeypress="jf_UPPERCASE()" runat="server" Width="6.5em"
								   MaxLength="12"></asp:textbox>－
							<asp:textbox id="txVolE" tabIndex="70" onkeypress="jf_UPPERCASE()" runat="server" Width="2.5em"
								   MaxLength="4"></asp:textbox>－
							<asp:textbox id="txSeqE" tabIndex="75" CssClass="InputFieldNumeric" runat="server" Width="2em"
								   MaxLength="3"></asp:textbox><asp:dropdownlist id="dlKeepStateGrp_ALL" runat="server" CssClass="hide"></asp:dropdownlist><asp:textbox id="txIsDestroy" runat="server" Width="5em" CssClass="hide"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 7em" class="dTDTitle" ><asp:label id="Label1" runat="server"   >保存狀況：</asp:label></DIV>
						<DIV class="dTD"><asp:checkboxlist id="cbCondition" runat="server" Width="30.5em" RepeatDirection="Horizontal" RepeatColumns="3"></asp:checkboxlist></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 7em" class="dTDTitle" ><asp:label style="Z-INDEX: 0" id="Label2" runat="server"  
								>排序方式：</asp:label></DIV>
						<DIV class="dTD">
							<asp:RadioButton id="rbFileNo" runat="server" Text="依檔號" GroupName="rbSort" Checked="True"></asp:RadioButton>
							<asp:RadioButton id="rbDocNo" runat="server" Text="依文號" GroupName="rbSort"></asp:RadioButton>
							<asp:RadioButton id="rbKeepState" runat="server" Text="依保存狀況" GroupName="rbSort"></asp:RadioButton></DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass = "hide" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			</FORM>
	</BODY>
</HTML>
