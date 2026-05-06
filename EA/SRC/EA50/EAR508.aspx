
<%@ Page language="c#" Codebehind="EAR508.aspx.cs" AutoEventWireup="false" Inherits="EA50.EAR508" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAR508逕行銷毀檔案報告列印作業</TITLE>
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
		<FORM id="EAR508" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericSearch.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7.5em"><asp:label id="Label1" runat="server" CssClass="KeyField">銷毀計畫編號：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 10em"><asp:textbox id="txDPlan" tabIndex="5" runat="server" Width="5.5em" CssClass="KeyUpperField" MaxLength="10"></asp:textbox><asp:imagebutton id="btKeyHelp" tabIndex="-1" runat="server" ToolTip="提示計畫批號" ImageUrl="..\..\..\STD\IMAGE\HELPWIN_E.gif"></asp:imagebutton>
							<asp:TextBox id="txOWN_ORG" runat="server" CssClass="hide"></asp:TextBox>&nbsp;</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7.5em"><asp:label id="Label2" runat="server">銷毀原因：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 10em; height: 3em;"><asp:textbox id="txReason" runat="server" Width="21em" ToolTip="30" TextMode="MultiLine"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7.5em"><asp:label id="Label3" runat="server">銷毀時間：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 10em"><asp:textbox id="txTime" runat="server" Width="4em" MaxLength="7" ToolTip="15" CssClass="DatePicker"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7.5em"><asp:label id="Label4" runat="server">銷毀地點：</asp:label></DIV>
						<DIV class="dTD" style="WIDTH: 10em"><asp:textbox id="txPlace" runat="server" Width="20em" ToolTip="20"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7.5em"><asp:label id="Label6" runat="server">銷毀方法：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txMethod" runat="server" Width="20em" ToolTip="25"></asp:textbox></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 7.5em"><asp:label id="Label5" runat="server">備註：</asp:label></DIV>
						<DIV class="dTD"><asp:textbox id="txRemark" runat="server" Width="21em" ToolTip="30" TextMode="MultiLine"></asp:textbox></DIV>
					</DIV>
				</DIV>
				<DIV id="GridTable" class="DivTable">
					<DIV class="GridDiv" style="HEIGHT: 11.5em; WORD-BREAK: break-all"><asp:datagrid id="dg1" runat="server" PageSize="1" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
							<Columns>
								<asp:TemplateColumn HeaderText="項次">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="產生年度">
									<ItemTemplate>
										<asp:Label id="lbRead1" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="年度號/分類號/案次號">
									<ItemTemplate>
										<asp:Label id="lbRead2" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="案名">
									<ItemTemplate>
										<asp:Label id="lbRead3" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="案情摘要">
									<ItemTemplate>
										<asp:Label id="lbRead4" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="卷數">
									<ItemTemplate>
										<asp:Label id="lbRead5" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="備註">
									<ItemTemplate>
										<asp:Label id="lbRead6" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btOpen" runat="server" Text="開啟" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass = "hide" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
				<asp:Button ID="btCancel" runat="server" Text="取消" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
