<%@ Page language="c#" Codebehind="AKT116C3.aspx.cs" AutoEventWireup="false" Inherits="AK.AKT116C3" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKT116C3 歸檔批號查詢子視窗</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio 8.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
<meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
<meta name="format - detection" content="telephone = no">
<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="AKT116C3" method="post" runat="server" onkeyup="jf_CheckFull();">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 100; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<DIV style="DISPLAY: none; Z-INDEX: 105; LEFT: 727px; WIDTH: 122px; POSITION: absolute; TOP: 8px; HEIGHT: 205px" ms_positioning="FlowLayout">
				<asp:textbox id="txFrom" runat="server" Width="48px"></asp:textbox></DIV>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; ">
							<asp:label id="Label2" runat="server" Width="6.5em">歸檔日期：</asp:label></DIV>
						<DIV class="dTD" style="width: 15em; ">
							<asp:textbox onkeypress="jf_InpNumOnly()" id="txDateS" onkeyup="jf_CheckFull();" tabIndex="2" runat="server" MaxLength="7" Width="4.5em"></asp:textbox>－
							<asp:textbox onkeypress="jf_InpNumOnly()" id="txDateE" onkeyup="jf_CheckFull();" tabIndex="4" runat="server" MaxLength="7" Width="4.5em"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 6em; ">
							<asp:label id="Label3" runat="server" Width="6.5em">歸檔單位：</asp:label></DIV>
						<DIV class="dTD" style="width: 15em; ">
							<cc1:combobox CssClass="comboBox" id="dlSend" tabIndex="6" runat="server" Width="11.5em"></cc1:ComboBox></DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable">
					<DIV class="dTR">
						<DIV class="dTD">
							<DIV class = "GridDiv" style="HEIGHT: 195px;">
								<asp:datagrid id="dg1" runat="server" PageSize="50" CellPadding="4" GridLines="Vertical" AutoGenerateColumns="False">
									<Columns>
										<asp:HyperLinkColumn DataNavigateUrlField="LOT_NO" DataNavigateUrlFormatString="javascript:ReturnValue(&quot;{0}&quot;)" DataTextField="LOT_NO" HeaderText="歸檔批號">
										</asp:HyperLinkColumn>
										<asp:BoundColumn DataField="EXEC_DATE" HeaderText="歸檔日期">
										</asp:BoundColumn>
										<asp:BoundColumn DataField="SEND_DNM" HeaderText="歸檔單位">
										</asp:BoundColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:block;"/>
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 103; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
