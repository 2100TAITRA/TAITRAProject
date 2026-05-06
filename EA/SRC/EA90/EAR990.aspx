<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EAR990.aspx.cs" AutoEventWireup="false" Inherits="EA90.EAR990" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAR990 典藏技術統計報表列印作業</TITLE>
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
		<FORM id="EAR990" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="5em"></asp:listbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:10em"><asp:label id="Label1" runat="server" Width="5em" 
								>統計來源：</asp:label><asp:radiobutton id="rbOnline" runat="server" Checked="True" GroupName="Type"
								Text="線上："></asp:radiobutton></DIV>
						<DIV class="dTD"><asp:label id="Label2" runat="server" Width="5em" 
								>檔案年度：</asp:label><asp:textbox id="txFileYearS" tabIndex="0" runat="server" Width="2em" 
								 MaxLength="3" CssClass="InputFieldNumeric"></asp:textbox><asp:label id="Label3" runat="server" Width="1em" 
								>～</asp:label><asp:textbox id="txFileYearE" tabIndex="0" runat="server" Width="2em" 
								 MaxLength="3" CssClass="InputFieldNumeric"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:10em"><asp:radiobutton id="rbOffline" runat="server" GroupName="Type" Text="離線："
								Enabled="False"></asp:radiobutton></DIV>
						<DIV class="dTD"><asp:label id="Label4" runat="server" Width="4em" 
								>光碟機：</asp:label><asp:dropdownlist id="dlRom" runat="server" Width="5em">
								<asp:ListItem Value="E:">E:</asp:ListItem>
							</asp:dropdownlist></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:10em"><asp:label id="Label5" runat="server" Width="8em" 
								>統計擬銷毀年度：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txPdesYearS" tabIndex="0" runat="server" Width="2em" 
								 MaxLength="3" CssClass="InputFieldNumeric"></asp:textbox><asp:label id="Label6" runat="server" Width="1em" 
								>～</asp:label><asp:textbox id="txPdesYearE" tabIndex="0" runat="server" Width="2em" 
								 MaxLength="3" CssClass="InputFieldNumeric"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:10em"><asp:label id="Label7" runat="server" Width="7em" 
								>產出報表種類：</asp:label></DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbMedia" runat="server" Checked="True" GroupName="RptType" Text="電子媒體種類及數量統計表"></asp:radiobutton><br/>
							<asp:radiobutton id="rbFile" runat="server" Checked="True" GroupName="RptType" Text="電子檔案格式及數量統計表"></asp:radiobutton><br/>
							<asp:radiobutton id="rbFileSafe" runat="server" Checked="True" GroupName="RptType" Text="電子檔案安全強度及數量統計表"></asp:radiobutton>
						</DIV>
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
