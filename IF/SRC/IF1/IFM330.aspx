<%@ Page language="c#" Codebehind="IFM330.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM330" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>IFM330 設定同單位代理人員視窗</TITLE>
		<META name="GENERATOR" content="Microsoft Visual Studio 8.0">
		<META name="CODE_LANGUAGE" content="C#">
		<META name="vs_defaultClientScript" content="JavaScript">
		<META name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK rel="stylesheet" type="text/css" href="../../../STDN/LIB/SYS.css">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="IFM330" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../IFLIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px"
				id="hiddenDiv"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<div class="DivBaseTable">
				<div class="DivTable" id="MainTable">
					<div class="dTR">
						<div class="dTDTitle">請選擇欲被設定代理人之人員</div>
					</div>
				</div>
				<div class="DivTable">
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 4em;">
							<asp:label id="Label1" runat="server">科別：</asp:label>
						</div>
						<div class="dTD">
							<asp:DropDownList id="dlSecDept" runat="server" style="Z-INDEX: 0"></asp:DropDownList>
						</div>
					</div>
					<div class="dTR">
						<div class="dTDTitle" style="WIDTH: 4em">
							<asp:label style="Z-INDEX: 0" id="Label2" runat="server">姓名：</asp:label>
						</div>
						<div class="dTD">
							<asp:TextBox id="txName" runat="server" Width="6em"></asp:TextBox>
						</div>
					</div>
				</div>
				<div class="DivTable">
					<div class="dTR">
						<div class="dTD" >
							<div class="GridDiv" style="HEIGHT: 340px;">
								<asp:datagrid id="dg1" runat="server" PageSize="50" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="4">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSeq" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="帳號">
											<ItemTemplate>
												<asp:HyperLink id="hlAccount" runat="server"></asp:HyperLink>
												<asp:TextBox id="H_txIdentity" runat="server" CssClass="hide"></asp:TextBox>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="姓名">
											<ItemTemplate>
												<asp:Label id="lbName" runat="server"></asp:Label>
												<asp:HyperLink id="hlName" runat="server" CssClass="hide"></asp:HyperLink>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</DIV>
					</div>
				</div>
			</div>
			<asp:Panel ID="tbTool" CssClass="V3_GenericBannerToolBar" runat="server">
				<asp:Button ID="btSearch" runat="server" Text="搜索" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
			<asp:DropDownList style="Z-INDEX: 102; POSITION: absolute; TOP: 528px; LEFT: 576px" id="ddlAcount"
				runat="server" CssClass="hide"></asp:DropDownList>
			<asp:DropDownList style="Z-INDEX: 103; POSITION: absolute; TOP: 528px; LEFT: 648px" id="ddlUserIdentity"
				runat="server" CssClass="hide"></asp:DropDownList>
		</FORM>
	</BODY>
</HTML>
