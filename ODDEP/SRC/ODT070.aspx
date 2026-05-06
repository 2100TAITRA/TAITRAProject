<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="ODT070.aspx.cs" AutoEventWireup="false" Inherits="OD.ODT070" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>ODT070 公文限辦日期調整作業</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Template/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="ODT070" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericBanner.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label1" runat="server">日　　期：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txDate" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label2" runat="server">設定別：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbHoliday" runat="server" GroupName="gn" Text="假日"></asp:radiobutton>
							<asp:radiobutton id="rbWorkDay" runat="server" GroupName="gn" Text="非假日"></asp:radiobutton>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 6em">
							<asp:label id="Label3" runat="server">適用單位：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbSource" runat="server" GroupName="gp" Text="全機關"></asp:radiobutton><br>
							<asp:radiobutton id="rbDept" runat="server" GroupName="gp"></asp:radiobutton>
							<cc1:combobox id="dlDept" runat="server" Width="7.5em" CssClass="comboBox"></cc1:combobox>
						</DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable">
					<DIV class="GridDiv" style="height:25em">
						<asp:DataGrid style="Z-INDEX: 0" id="dg1" runat="server" HeaderStyle-BackColor="#5f9cc5">
						</asp:DataGrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
