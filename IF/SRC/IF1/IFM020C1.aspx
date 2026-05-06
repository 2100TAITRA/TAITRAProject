<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="IFM020C1.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM020C1" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>IFM020C1</TITLE>
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
		<FORM id="IFM020C1" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../IFLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<div class="DivBaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em"><asp:label id="Label1" runat="server"  >群組編號：</asp:label></div>
						<div class="dTD"><asp:textbox id="txGrpNo" tabIndex="0" runat="server" Width="2.5em" CssClass="InputEnUpperField" MaxLength="4"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em"><asp:label id="Label2" runat="server"  >群組名稱：</asp:label></div>
						<div class="dTD"><asp:textbox id="txGrpName" tabIndex="0" runat="server" Width="19em" MaxLength="50"></asp:textbox></div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em"><asp:label id="Label5" runat="server" >群組類型：</asp:label></div>
						<div class="dTD">
							<asp:radiobutton id="rbTypeAll" runat="server" Text="全部" GroupName="RBType"></asp:radiobutton>
							<asp:radiobutton id="rbTypeDept" runat="server" Text="單位" GroupName="RBType"></asp:radiobutton>
							<asp:radiobutton id="rbTypeAcc" runat="server" Text="帳號" GroupName="RBType"></asp:radiobutton>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 6em"><asp:label id="Label3" runat="server" >群組層級：</asp:label></div>
						<div class="dTD">
							<asp:radiobutton id="rbAll" runat="server" GroupName="RBGRP" Text="全部"></asp:radiobutton>
							<asp:radiobutton id="rbOrg" runat="server" GroupName="RBGRP" Text="機關"></asp:radiobutton>
							<asp:radiobutton id="rbDept" runat="server" GroupName="RBGRP" Text="單位"></asp:radiobutton>
							<asp:radiobutton id="rbPrivate" runat="server" GroupName="RBGRP" Text="個人"></asp:radiobutton>
							<asp:textbox id="txPrivate" runat="server" Width="5.5em"></asp:textbox>
							<asp:imagebutton id="btHelpPriv" tabIndex="0" runat="server" ImageUrl="../../../STDN/IMAGE/HELPFILE_E.gif"></asp:imagebutton>
						</div>
					</div>
					<div class="dTR" id="trDept">
						<div class="dTDTitle" style="WIDTH: 6em"><asp:label id="Label4" runat="server" >所屬單位：</asp:label></div>
						<div class="dTD"><asp:dropdownlist id="ddlDept" runat="server"></asp:dropdownlist>
						<asp:textbox id="txRadioValue" runat="server" CssClass="hide"></asp:textbox>
					</div>
					</div>
				</div>
				<div class="DivTable">
					<div class="dTR">
						<div class="dTD">
							<div class="GridDiv" style="HEIGHT: 221px">
								<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSEQ_NO" runat="server"  ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="群組編號">
											<ItemTemplate>
												<asp:HyperLink id="hlGrpNo" runat="server" ></asp:HyperLink>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="群組名稱">
											<ItemTemplate>
												<asp:TextBox id="txGrpNm" tabIndex="-1" runat="server" Width="16em" CssClass="TextLabel" 
													 ReadOnly="True"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</div>
					</div>
				</div>
			</div>
			<asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:none;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
