<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDR436.aspx.cs" AutoEventWireup="false" Inherits="ED4.EDR436" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR436 開會通知單會議型式查詢列印作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDR436" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle"><asp:label id="Label1" runat="server" CssClass="RequireField">收創日期：</asp:label></DIV>
						<DIV class="dTD">
							<asp:textbox id="txRcvDateS" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>～
							<asp:textbox id="txRcvDateE" tabIndex="0" runat="server" Width="4em" CssClass="DatePicker" MaxLength="7"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle">
							<asp:label style="Z-INDEX: 0" id="Label2" runat="server">承辦單位：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:DropDownList id="dlDept" runat="server"></asp:DropDownList>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle">
							<asp:label id="Label3" runat="server">排序方式：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:DropDownList id="dlOrder" runat="server" Width="6.5em">
								<asp:ListItem Value="1">公文文號</asp:ListItem>
								<asp:ListItem Value="2">收創日期</asp:ListItem>
								<asp:ListItem Value="3">結案日期</asp:ListItem>
								<asp:ListItem Value="4">承辦單位</asp:ListItem>
								<asp:ListItem Value="5">會議型式</asp:ListItem>
							</asp:DropDownList>
						</DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable" id="GridTable">
					<DIV class="GridDiv" style="HEIGHT: 31.5em">
						<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="5">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSeqNo" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="公文文號">
									<ItemTemplate>
										<asp:Label id="lbDocNo" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="收創日期&lt;BR&gt;結案日期">
									<ItemTemplate>
										<asp:Label id="lbRcvDate" runat="server"></asp:Label><br>
										<asp:Label id="lbCloseDate" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="承辦單位&lt;BR&gt;承辦人">
									<ItemTemplate>
										<asp:Label id="lbDept" runat="server"></asp:Label><BR>
										<asp:Label id="lbEmpName" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="主旨">
									<ItemTemplate>
										<asp:Label id="lbSubject" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="會議型式">
									<ItemTemplate>
										<asp:Label id="lbMeetingType" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="匯出統計Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
