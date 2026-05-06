<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDT214C1.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDT214C1" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDT214C1 公文異動撤銷歷程明細檢視作業</TITLE>
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
		<FORM id="EDT214C1" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				 <asp:textbox id="txElecSysId" runat="server"></asp:textbox>
				 <asp:textbox id="txRcvScanSysId" runat="server"></asp:textbox>
				 <asp:textbox id="txNewByOu" runat="server"></asp:textbox>
				<asp:textbox id="txMsgId" runat="server"></asp:textbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width:6em">
							<asp:label id="Label1" runat="server" CssClass="KeyField">公文文號：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txDocNo" tabIndex="0" runat="server" Width="5.5em" CssClass="KeyUpperField" MaxLength="10"></asp:textbox>
						</DIV>
					</DIV>
				</DIV>
				<DIV id="GridTable" style="display:inline-flex;">
					<DIV style="min-width:37em">
						<asp:label id="Label2" runat="server">撤銷前：</asp:label><BR>
						<DIV class="GridDiv">
							<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
								<Columns>
									<asp:TemplateColumn HeaderText="序">
										<ItemTemplate>
											<asp:Label id="lbdg1SeqNo" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="公文狀態">
										<ItemTemplate>
											<asp:Label id="lbdg1Subfolder" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="作業單位">
										<ItemTemplate>
											<asp:Label id="lbdg1OwnOuName" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="負責人員">
										<ItemTemplate>
											<asp:Label id="lbdg1EmpName" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="公文接收時間">
										<ItemTemplate>
											<asp:Label id="lbdg1SignTime" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="公文送出時間">
										<ItemTemplate>
											<asp:Label id="lbdg1TxTime" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="異動別">
										<ItemTemplate>
											<asp:Label id="lbdg1TxName" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="核決者">
										<ItemTemplate>
											<asp:Label id="lbdg1AppUsername" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
								</Columns>
							</asp:datagrid>
						</DIV>
					</DIV>
					<DIV class="dTD" style="min-width:37em">
						<asp:label id="Label3" runat="server">撤銷後：</asp:label><BR>
						<DIV class="GridDiv">
							<asp:datagrid id="dg2" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="1">
								<Columns>
									<asp:TemplateColumn HeaderText="序">
										<ItemTemplate>
											<asp:Label id="lbdg2SeqNo" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="公文狀態">
										<ItemTemplate>
											<asp:Label id="lbdg2Subfolder" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="作業單位">
										<ItemTemplate>
											<asp:Label id="lbdg2OwnOuName" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="負責人員">
										<ItemTemplate>
											<asp:Label id="lbdg2EmpName" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="公文接收時間">
										<ItemTemplate>
											<asp:Label id="lbdg2SignTime" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="公文送出時間">
										<ItemTemplate>
											<asp:Label id="lbdg2TxTime" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="異動別">
										<ItemTemplate>
											<asp:Label id="lbdg2TxName" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
									<asp:TemplateColumn HeaderText="核決者">
										<ItemTemplate>
											<asp:Label id="lbdg2AppUsername" runat="server"></asp:Label>
										</ItemTemplate>
									</asp:TemplateColumn>
								</Columns>
							</asp:datagrid>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
