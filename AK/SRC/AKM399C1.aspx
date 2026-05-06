<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="AKM399C1.aspx.cs" AutoEventWireup="false" Inherits="AK.AKM399C1" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>AKM399C1 櫥位管理查詢子視窗</title>
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
		<form id="AKM399C1" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V2 Generated WebForm-->
			<!--#include file="Template/Res/GenericChild.htm"-->
			<asp:listbox id="lbReturnValue" style="Z-INDEX: 102; LEFT: 10px; POSITION: absolute; TOP: 102px" runat="server" CssClass="hidden"></asp:listbox>
			<DIV class="BaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width : 7.5em"><asp:label id="Label1" runat="server">櫥位號(起)：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox CssClass="InputFiledNumeric" id="txStockNo1SS" runat="server" Width="2em"></asp:textbox>&nbsp;─
								<asp:textbox CssClass="InputUpperFieldText" id="txStockNo2SE" runat="server" Width="1.5em"></asp:textbox>&nbsp;─
								<asp:textbox id="txUsedStockSS" runat="server" CssClass="displayOnly" Width="2.5em" ReadOnly="True"></asp:textbox>&nbsp;～
								<asp:textbox id="txUsedStockSE" runat="server" CssClass="displayOnly" Width="2.5em" ReadOnly="True"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width : 7.5em"><asp:label id="Label2" runat="server">櫥位號(訖)：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox CssClass="InputFiledNumeric" id="txStockNo1ES" runat="server" Width="2em"></asp:textbox>&nbsp;─
									<asp:textbox CssClass="InputUpperFieldText" id="txStockNo2EE" runat="server" Width="1.5em"></asp:textbox>&nbsp;─
									<asp:textbox id="txUsedStockES" runat="server" CssClass="displayOnly" Width="2.5em" ReadOnly="True"></asp:textbox>&nbsp;～
									<asp:textbox id="txUsedStockEE" runat="server" CssClass="displayOnly" Width="2.5em" ReadOnly="True"></asp:textbox>
									<asp:TextBox id="txOrgNo" runat="server" CssClass="hide" Width="3em"></asp:TextBox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width : 7.5em"><asp:label id="Label3" runat="server">分類起訖：</asp:label></DIV>
						<DIV class="dTD"><asp:dropdownlist id="dlCLS_S" runat="server"></asp:dropdownlist><asp:textbox id="txClsS" runat="server" CssClass="hide" Width="2em"></asp:textbox>&nbsp;～
								<asp:dropdownlist id="dlCLS_E" runat="server"></asp:dropdownlist><asp:textbox id="txClsE" runat="server" CssClass="hide" Width="2em"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width : 7.5em"><asp:label id="Label4" runat="server">編目人員：</asp:label></DIV>
						<DIV class="dTD"><asp:dropdownlist id="dlFileUser" runat="server"></asp:dropdownlist><asp:textbox id="txUser" runat="server" CssClass="hide" Width="2em"></asp:textbox></DIV>
						<DIV class="dTDTitle" style="width : 7.5em"><asp:label id="Label7" runat="server">使用狀態：</asp:label></DIV>
						<DIV class="dTD"><asp:dropdownlist id="dlStockState" runat="server"></asp:dropdownlist><asp:textbox id="txStockState" runat="server" CssClass="hide" Width="2em"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width : 7.5em"><asp:label id="Label5" runat="server">備註：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txRemark" runat="server" Width="18em"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width : 7.5em"><asp:label id="Label6" runat="server">排序方式：</asp:label></DIV>
						<DIV class="dTD"><asp:radiobutton id="rbStockNo" runat="server" Text="依櫥位號" GroupName="gp1" Checked="True"></asp:radiobutton><asp:radiobutton id="rbClsNo" runat="server" Text="依分類" GroupName="gp1"></asp:radiobutton><asp:radiobutton id="rbFileUser" runat="server" Text="依編目人員" GroupName="gp1"></asp:radiobutton></DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable">
					<DIV style="HEIGHT: 26em" class="GridDiv">
						<asp:datagrid id="dg1" runat="server" AutoGenerateColumns="False" CellPadding="4" GridLines="Vertical">
						<Columns>
							<asp:TemplateColumn HeaderText="序">
								<ItemTemplate>
									<asp:Label id="lbSeq" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="櫥位號">
								<ItemTemplate>
									<asp:HyperLink id="hlStockNo" runat="server"></asp:HyperLink>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="分類">
								<ItemTemplate>
									<asp:Label id="lbClsNoCls" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="編目人員">
								<ItemTemplate>
									<asp:Label id="lbFileUser" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="使用狀態">
								<ItemTemplate>
									<asp:Label id="lbState" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
							<asp:TemplateColumn HeaderText="備註">
								<ItemTemplate>
									<asp:Label id="lbRemark" runat="server"></asp:Label>
								</ItemTemplate>
							</asp:TemplateColumn>
						</Columns>
					</asp:datagrid>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V2_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:customvalidator id="Validator" style="Z-INDEX: 104; LEFT: 12px; POSITION: absolute; TOP: 218px" runat="server" CssClass="hidden" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 105; LEFT: 12px; POSITION: absolute; TOP: 252px" runat="server" CssClass="hidden"></asp:validationsummary></form>
	</body>
</HTML>
