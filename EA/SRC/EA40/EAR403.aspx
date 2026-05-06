<%@ Page language="c#" Codebehind="EAR403.aspx.cs" AutoEventWireup="false" Inherits="EA40.EAR403" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAR403 案卷(件)條碼列印作業</TITLE>
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
		<FORM id="EAR403" onkeyup="jf_CheckFull();" method="post" runat="server"> 
			<!--Template V3 Generated WebForm--> 
			<!--#include file="../EALIB/GenericSearch.htm"-->			
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:textbox id="txFileNoSep" runat="server" CssClass="hide"></asp:textbox>
				<asp:textbox id="txFileNoEVol" runat="server" CssClass="hide"></asp:textbox>
				<asp:dropdownlist id="dlDept" runat="server" CssClass="hide"></asp:dropdownlist>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label1" runat="server" Width="84px" CssClass="RequireField">清理批號：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox onkeypress="jf_UPPERCASE()" id="txPlanNo" tabIndex="1" runat="server" Width="4.5em" CssClass="RequireField" MaxLength="8"></asp:textbox>
							<asp:imagebutton id="btKeyHelp" tabIndex="-1" runat="server" ToolTip="提示計畫批號" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:imagebutton> 
							<asp:label id="Label5" runat="server">庫房：</asp:label>
							<asp:dropdownlist id="dlStoreNo" tabIndex="6" runat="server" Width="84px"></asp:dropdownlist>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label3" runat="server">檔號 (起)：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox onkeypress="jf_InpNumOnly()" id="txYearS" tabIndex="30" runat="server" Width="2em" MaxLength="3"></asp:textbox>－
							<asp:textbox onkeypress="jf_UPPERCASE()" id="txClsS" tabIndex="35" runat="server" Width="10.5em" MaxLength="20"></asp:textbox>－
							<asp:textbox onkeypress="jf_UPPERCASE()" id="txCaseS" tabIndex="40" runat="server" Width="7em" MaxLength="12"></asp:textbox>－
							<asp:textbox onkeypress="jf_UPPERCASE()" id="txVolS" tabIndex="45" runat="server" Width="2.5em" MaxLength="4"></asp:textbox>－
							<asp:textbox onkeypress="jf_InpNumOnly()" id="txSeqS" tabIndex="50" runat="server" Width="2em" MaxLength="3"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em">
							<asp:label id="Label6" runat="server">檔號 (訖)：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox onkeypress="jf_InpNumOnly()" id="txYearE" tabIndex="55" runat="server" Width="2em" MaxLength="3"></asp:textbox>－
							<asp:textbox onkeypress="jf_UPPERCASE()" id="txClsE" tabIndex="60" runat="server" Width="10.5em" MaxLength="20"></asp:textbox>－
							<asp:textbox onkeypress="jf_UPPERCASE()" id="txCaseE" tabIndex="65" runat="server" Width="7em" MaxLength="12"></asp:textbox>－
							<asp:textbox onkeypress="jf_UPPERCASE()" id="txVolE" tabIndex="70" runat="server" Width="2.5em" MaxLength="4"></asp:textbox>－
							<asp:textbox onkeypress="jf_InpNumOnly()" id="txSeqE" tabIndex="75" runat="server" Width="2em" MaxLength="3"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 5.5em"><asp:label id="Label4" runat="server"> 機密等級：</asp:label></DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbAll" tabIndex="85" runat="server" Checked="True" GroupName="GT" Text="全部"></asp:radiobutton>
							<asp:radiobutton id="rbSec" tabIndex="86" runat="server" GroupName="GT" Text="密件"></asp:radiobutton>
							<asp:radiobutton id="rbNor" tabIndex="87" runat="server" GroupName="GT" Text="普通件"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 2.5em">&nbsp;</DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbVol" tabIndex="90" runat="server" Checked="True" GroupName="Gp" Text="列印案卷條碼　列印起始位置："></asp:radiobutton>
							<asp:textbox id="txVolNum" tabIndex="92" runat="server" Width="1.5em" MaxLength="2"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 2.5em">&nbsp;</DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbDoc" tabIndex="95" runat="server" GroupName="Gp" Text="列印案件條碼　列印起始位置："></asp:radiobutton>
							<asp:textbox id="txDocNum" tabIndex="97" runat="server" Width="1.5em" MaxLength="2"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 2.5em">&nbsp;</DIV>
						<DIV class="dTD">
							<asp:checkbox id="cbComNoAll" tabIndex="100" runat="server" Text="併件(一目多文)每一份文均列印"></asp:checkbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 2.5em">&nbsp;</DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rb1" tabIndex="105" runat="server" Checked="True" GroupName="GM" Text="一頁多張條碼"></asp:radiobutton>
							<asp:radiobutton id="rb2" tabIndex="106" runat="server" GroupName="GM" Text="一頁一張條碼"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 2.5em">&nbsp;</DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbAtt" tabIndex="110" runat="server" GroupName="Gp" Text="列印附件條碼　列印起始位置："></asp:radiobutton>
							<asp:textbox id="txAttNum" tabIndex="112" runat="server" Width="1.5em" MaxLength="2"></asp:textbox>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass = "hide" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
