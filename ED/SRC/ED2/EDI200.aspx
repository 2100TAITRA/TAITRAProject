<%@ Page language="c#" Codebehind="EDI200.aspx.cs" AutoEventWireup="false" Inherits="ED2.EDI200" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDI200 線上申請簽核流程查詢作業</TITLE>
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
		<FORM id="EDI200" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div id="GridTable" class="DivTable">
					<DIV class="GridDiv" style="height: 35em">
						<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server" Width="1.5em"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="簽核類型">
									<ItemTemplate>
										<asp:Label id="lbMsgFrom" runat="server" Width="4.5em"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="申請單單號">
									<HeaderTemplate>
										申請單<br>
										單號
									</HeaderTemplate>
									<ItemTemplate>
										<asp:Label id="lbMsgFromId" runat="server" Width="4.5em"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="單位">
									<HeaderTemplate>
										&nbsp;
										<HR style="HEIGHT: 1px" SIZE="1">
										單位
									</HeaderTemplate>
									<ItemTemplate>
										<asp:Label id="lbOuName" runat="server" Width="6.5em"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="角色">
									<HeaderTemplate>
										應簽核
										<HR style="HEIGHT: 1px" SIZE="1">
										角色
									</HeaderTemplate>
									<ItemTemplate>
										<asp:Label id="lbRoleName" runat="server" Width="3.5em"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="名稱">
									<HeaderTemplate>
										&nbsp;
										<HR style="HEIGHT: 1px" SIZE="1">
										名稱
									</HeaderTemplate>
									<ItemTemplate>
										<asp:Label id="lbUserName" runat="server" Width="3.5em"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="接收時間">
									<ItemTemplate>
										<asp:Label id="lbNewTime" runat="server" Width="8em"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="送出時間">
									<ItemTemplate>
										<asp:Label id="lbTxTime" runat="server" Width="8em"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="實際簽核者">
									<ItemTemplate>
										<asp:Label id="lbDirectorName" runat="server" Width="5.5em"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="異動別">
									<ItemTemplate>
										<asp:Label id="lbTxName" runat="server" Width="4.5em"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="簽核意見">
									<ItemTemplate>
										<asp:Label id="txReborCode" runat="server" Width="15.5em" ReadOnly="True"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="申請原因">
									<ItemTemplate>
										<asp:TextBox id="txReason" runat="server" Width="6.5em" CssClass="PopUp" ReadOnly="True"></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</div>
			</div>
		</FORM>
	</BODY>
</HTML>
