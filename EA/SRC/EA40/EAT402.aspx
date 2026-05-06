<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EAT402.aspx.cs" AutoEventWireup="false" Inherits="EA40.EAT402" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<TITLE>EAT402 檔案原件保存年限調整作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
		<meta name="format - detection" content="telephone = no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EAT402" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; ">
							<asp:label id="Label2" runat="server" Width="7.5em" CssClass="RequireField">年度：</asp:label></DIV>
						<DIV class="dTD" style="width: 21em; ">
							<asp:textbox onkeypress="jf_InpNumOnly()" id="txYearS" tabIndex="10" runat="server" Width="2.5em" CssClass="RequireField" MaxLength="3" ></asp:textbox>&nbsp;至&nbsp; <asp:textbox onkeypress="jf_InpNumOnly()" id="txYearE" tabIndex="12" runat="server" Width="2.5em" CssClass="RequireField" MaxLength="3" ></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; ">
							<asp:label id="Label4" runat="server" Width="8.5em" > 調整範圍：</asp:label></DIV>
						<DIV class="dTD" style="width: 21em; ">
							<asp:radiobutton id="rb1" tabIndex="16" runat="server" Checked="True" Text="已電子儲存之檔案" GroupName="g1" ></asp:radiobutton></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; ">&nbsp</DIV>
						<DIV class="dTD" style="width: 21em; ">
							<asp:radiobutton id="rb2" tabIndex="18" runat="server" Text="已微縮之檔案" GroupName="g1" ></asp:radiobutton></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; ">
							<asp:TextBox id="txTempTable" runat="server" CssClass="hide"></asp:TextBox>&nbsp</DIV>
						<DIV class="dTD" style="width: 21em; ">
							<asp:radiobutton id="rb3" tabIndex="20" runat="server" Text="以上兩者均調整" GroupName="g1" ></asp:radiobutton></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; ">
							<asp:checkbox id="cbKeepYear" tabIndex="25" runat="server" Width="7.5em"></asp:checkbox></DIV>
						<DIV class="dTD" style="width: 21em; ">
							<asp:Label id="Label1" runat="server" >已調整過保存年限之檔案，根據分類表重新調整</asp:Label></DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSave" runat="server" Text="調整(S)" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="檢視未縮短年限分類表(F)" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
