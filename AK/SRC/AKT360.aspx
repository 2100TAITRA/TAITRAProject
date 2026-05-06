<%@ Page language="c#" Codebehind="AKT360.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT360" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKT360 編目校核單列印作業</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio 8.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="AKT360" method="post" runat="server" onkeyup="jf_CheckFull();">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em"  >
								<asp:Label id="Label1" runat="server" CssClass="RequireField">編目日期：</asp:Label></DIV>
						<DIV class="dTD">
							<asp:TextBox id="txSDate" runat="server" CssClass="RequireField DatePicker" MaxLength="7" Width="4em"></asp:TextBox>－
							<asp:TextBox id="txEDate" runat="server" CssClass="RequireField DatePicker" MaxLength="7" Width="4em"></asp:TextBox></DIV>
					</DIV>
					
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em" ><asp:Label id="Label2" runat="server" >案號條件：</asp:Label></DIV>
						<DIV class="dTD">
							<asp:Label id="Label4" runat="server" >版 本 別：</asp:Label>
							<asp:TextBox id="txVerNo" runat="server"  MaxLength="3" Width="4em"></asp:TextBox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em" >&nbsp</DIV>
						<DIV class="dTD">
							<asp:Label id="Label5" runat="server" >檔號(起)：</asp:Label>
							<asp:TextBox id="txFileYearS" runat="server"  MaxLength="3" Width="4em"></asp:TextBox>
							<asp:Label id="Label6" runat="server" >(年度)</asp:Label>
							<asp:label id="Label7" runat="server">－</asp:label>
							<asp:TextBox id="txClsNoS" runat="server"  MaxLength="20" Width="10.5em"></asp:TextBox>
							<asp:ImageButton id="btHelpS" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
							<asp:Label id="Label8" runat="server" >(分類)</asp:Label>
							<asp:label id="Label9" runat="server">－</asp:label>
							<asp:TextBox id="txCaseNoS" runat="server"  MaxLength="12" Width="6.5em"></asp:TextBox>
							<asp:ImageButton id="btHelpS2" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
							<asp:Label id="Label10" runat="server" >(案次)</asp:Label>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em" >&nbsp</DIV>
						<DIV class="dTD">
							<asp:Label id="Label11" runat="server" >檔號(迄)：</asp:Label>
							<asp:TextBox id="txFileYearE" runat="server"  MaxLength="3" Width="4em"></asp:TextBox>
							<asp:Label id="Label12" runat="server" >(年度)</asp:Label>
							<asp:label id="Label13" runat="server">－</asp:label>
							<asp:TextBox id="txClsNoE" runat="server"  MaxLength="20" Width="10.5em"></asp:TextBox>
							<asp:ImageButton id="btHelpE" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
							<asp:Label id="Label14" runat="server" >(分類)</asp:Label>
							<asp:label id="Label15" runat="server">－</asp:label>
							<asp:TextBox id="txCaseNoE" runat="server"  MaxLength="12" Width="7em"></asp:TextBox>
							<asp:ImageButton id="btHelpE2" runat="server" ImageUrl="Template/images/HELPFILE_E.gif"></asp:ImageButton>
							<asp:Label id="Label16" runat="server" >(案次)</asp:Label>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em" ><asp:Label id="Label3" runat="server" >編目人員：</asp:Label></DIV>
						<DIV class="dTD"><cc1:combobox id="dlUser" runat="server"  Width="8em" CssClass="comboBox"></cc1:combobox></DIV>
					</DIV>
					<DIV class="hide">
						<DIV class="dTDTitle" style="WIDTH: 6em" ><asp:Label id="Label17" runat="server" >報表格式：</asp:Label></DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbCase" runat="server" Text="案件" GroupName="rptType" checked="true"></asp:radiobutton>
							<asp:radiobutton id="rbVol" runat="server" Text="案卷" GroupName="rptType"></asp:radiobutton>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" DefaultStyle="newmode:none;modifymode:none;" />
				<asp:Button ID="btExcel" runat="server" Text="Excel匯出" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btODS" runat="server" Text="ODS匯出" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
