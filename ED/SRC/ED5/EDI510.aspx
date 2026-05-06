<%@ Page language="c#" Codebehind="EDI510.aspx.cs" AutoEventWireup="false" Inherits="ED5.EDI510" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDI510 掛號號碼查詢作業</TITLE>
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
		<FORM id="DEI510_2" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; VISIBILITY: hidden; POSITION: absolute">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="5.5em"></asp:listbox>
				<asp:textbox id="H_Orgno" tabIndex="-1" runat="server" Width="1em" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_UserId" tabIndex="-1" runat="server" Width="1em" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_DeptNo" tabIndex="-1" runat="server" Width="1em" CssClass="hide"></asp:textbox>
				<asp:textbox id="H_CkPriv" tabIndex="-1" runat="server" Width="1em" CssClass="hide"></asp:textbox>
			</DIV>
			<div class="DivBaseTable" id="BaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 16.5em">
							<asp:label id="Label6" runat="server" Width="15.5em">公文文號或非公文郵寄項目編號：</asp:label>
						</div>
						<div style="WIDTH: 15em" class="dTD">
							<asp:textbox id="txDOC_NO" tabIndex="10" runat="server" Width="5.5em" MaxLength="10"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 16.5em">
							<asp:label id="Label5" runat="server">掛號號碼：</asp:label>
						</div>
						<div style="WIDTH: 15em" class="dTD">
							<asp:textbox id="txBULK_NO" tabIndex="20" runat="server" Width="3.5em" MaxLength="6"></asp:textbox>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 16.5em">
							<asp:label id="Label2" runat="server">發文日期：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txIssueDate" tabIndex="30" runat="server" Width="4em" MaxLength="7" CssClass="DatePicker" ></asp:textbox>
						</div>
					</div>
					<div id="trIssueByPriv">
						<div class="dTDTitle" style="WIDTH: 16.5em">
							<asp:label id="Label1" runat="server">發文單位：</asp:label>
						</div>
						<div class="dTD">
							<asp:dropdownlist id="ddlIssueUnit" runat="server" Width="6.5em"></asp:dropdownlist>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 16.5em">
							<asp:label id="Label3" runat="server">受文機關：</asp:label>
						</div>
						<div class="dTD" style="WIDTH: 11em">
							<asp:textbox id="txOrgno" tabIndex="40" runat="server" Width="9em" MaxLength="17"></asp:textbox>
							<asp:imagebutton id="btHelp" tabIndex="-1" runat="server" ImageUrl="..\IMAGE\HELPFILE_E.gif"></asp:imagebutton>
						</div>
						<div class="dTD"style="WIDTH: 9.5em">
							<asp:textbox id="txOrgName" tabIndex="-1" runat="server" Width="17em" CssClass="TextLabel"	ReadOnly="True"></asp:textbox>
						</div>
					</div>
				</div>
				<div id="GridTable" class="DivTable">
					<DIV class="GridDiv" style="HEIGHT: 16.5em">
						<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="郵寄日期">
									<ItemTemplate>
										<asp:Label id="lbPOST_DATE" runat="server" Width="1.5em"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="公文文號或非公文郵寄項目編號">
									<ItemTemplate>
										<asp:Label id="lbSRC_NO" runat="server" Width="1.5em"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="大宗掛號號碼">
									<ItemTemplate>
										<asp:Label id="lbBULK_NO" runat="server" Width="1.5em"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="受文者名稱">
									<ItemTemplate>
										<asp:Label id="lbORG_NAME" runat="server" Width="12em"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</div>
			</div>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" CssClass="hide" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
