<%@ Page language="c#" Codebehind="EAT400C1.aspx.cs" AutoEventWireup="false" Inherits="EA40.EAT400C1" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAT400C1 檔案清理計畫查詢子視窗</TITLE>
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
		<FORM id="EAT400C1" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
								<asp:label id="Label1" runat="server">制定日期：</asp:label> 
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txDate1" onkeyup="jf_CheckFull();" tabIndex="2" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox> 
							<asp:label id="Label10" runat="server">─</asp:label>
							<asp:textbox id="txDate2" onkeyup="jf_CheckFull();" tabIndex="2" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:5.5em">
							<asp:label id="Label2" runat="server">清理別：</asp:label></DIV>
						<DIV class="dTD">
							<asp:DropDownList id="dlPlanType" runat="server"></asp:DropDownList></DIV>
					</DIV>
				</DIV>
				<DIV id="GridTable" class="DivTable">
					<DIV class="dTR">
						<asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
							<asp:Button ID="btSelectAll" runat="server" Text="全選" />
							<asp:Button ID="btSelectInverse" runat="server" Text="反向" />
							<asp:Button ID="btSelectClear" runat="server" Text="清除" />
						</asp:Panel>
					</DIV>
					<DIV class="GridDiv" style="HEIGHT: 15.5em">
						<asp:datagrid id="dg1" runat="server" PageSize="50" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="4">
							<Columns>
								<asp:TemplateColumn HeaderText="選">
									<ItemTemplate>
										<asp:CheckBox id="cbSelect" runat="server" Checked="false"></asp:CheckBox>
									</ItemTemplate>
								</asp:TemplateColumn>											
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="批號">
									<ItemTemplate>
										<asp:HyperLink id="hlPlanNo" runat="server"></asp:HyperLink>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="制定日期">
									<ItemTemplate>
										<asp:Label id="lbPlanDate" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="清理別">
									<ItemTemplate>
										<asp:Label id="lbPlanType" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="檔號範圍">
									<ItemTemplate>
										<asp:Label id="lbFileNo" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="機密等級">
									<ItemTemplate>
										<asp:Label id="lbSecNo" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="計畫狀態">
									<ItemTemplate>
										<asp:Label id="lbPlanStatus" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btSave" runat="server" Text="確定" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
