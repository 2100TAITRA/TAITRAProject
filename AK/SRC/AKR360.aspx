<%@ Page language="c#" Codebehind="AKR360.aspx.cs" AutoEventWireup="false" Inherits="AK.AKR360" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKR360 檔案編目數量統計列印作業</title>
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
		<form id="AKR360" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 101; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV  class="dTDTitle" style="WIDTH: 9em" ><asp:label class="RequireField" id="Label2" runat="server">編目年度：</asp:label></DIV>
						<DIV class="dTD">
						<asp:textbox class="RequireField" id="txYear" tabIndex="10" runat="server" CssClass="RequireFieldNumeric" Width="2em" MaxLength="3">123</asp:textbox><br/>
						<asp:CheckBox id="cbSplit" runat="server" Width="18em" Text="編目完成量區分為本月及上月前歸檔" ></asp:CheckBox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV  class="dTDTitle" style="WIDTH: 9em" ><asp:label  id="Label3" runat="server" Visible="False">分類號：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txSCls" tabIndex="20" runat="server"  Width="9.5em" MaxLength="20" Visible="False"></asp:textbox>
								<asp:textbox id="txECls" tabIndex="20" runat="server"  Width="9.5em" MaxLength="20" Visible="False"></asp:textbox>
								<asp:textbox id="H_Elv" runat="server" CssClass="hide" Width="3.5em"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV  class="dTDTitle"><asp:Label id="lbMaxYear" runat="server" >目前統計最大年度：888年</asp:Label></DIV>
					</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btStatic" runat="server" Text="統計" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" CssClass="hide" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 103; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary>
		</form>
	</body>
</HTML>
