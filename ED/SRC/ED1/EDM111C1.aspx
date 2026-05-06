<%@ Page language="c#" Codebehind="EDM111C1.aspx.cs" AutoEventWireup="false" Inherits="ED1.EDM111C1" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDM111C1 公文流程傳送對象明細作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY>
		<FORM id="EDM111C1" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:TextBox id="RoleCode" runat="server" Width="20px" tabIndex="-1"></asp:TextBox>
				<asp:TextBox id="UserCode" runat="server" Width="20px" tabIndex="-1"></asp:TextBox>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
                <asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<div id="BaseTable" class="DivBaseTable">
                <div id="MainTable" class="DivTable">
					<div class="dTR">
						<div class="dTDTitle" style="width: 5.5em">
                            <asp:label id="Label5" runat="server" >簽核類型：</asp:label>
						</div>
						<div class="dTD" style="width: 9em">
                            <asp:dropdownlist id="dlSignType" runat="server">
								<asp:ListItem></asp:ListItem>
								<asp:ListItem Value="P">紙本簽核</asp:ListItem>
								<asp:ListItem Value="E">線上簽核</asp:ListItem>
							</asp:dropdownlist>
						</div>
						<div class="dTDTitle" style="width: 7.5em">
							<asp:label id="Label1" runat="server" >傳送對象代碼：</asp:label>
						</div>
						<div class="dTD">
							<asp:textbox id="txNo" tabIndex="0" runat="server" Width="2.5em" MaxLength="4"></asp:textbox>
							<asp:imagebutton id="btFindOu" tabIndex="0" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:imagebutton>
						</div>
                    </div>
					<div class="dTR">
						<div class="dTDTitle" style="width: 5.5em">
                            <asp:label id="Label6" runat="server">傳送單位：</asp:label>
						</div>
						<div class="dTD" style="width: 9em">
                            <asp:dropdownlist id="dlDept" runat="server" Width="8.5em"></asp:dropdownlist>
						</div>
						<div class="dTDTitle" style="width: 7.5em">
							<asp:label id="Label7" runat="server">傳送角色：</asp:label>
						</div>
						<div class="dTD" style="width: 6.5em">
							<asp:dropdownlist id="dlRole" runat="server" Width="6em"></asp:dropdownlist>
						</div>
						<div class="dTDTitle" style="width: 5.5em">
							<asp:label id="Label2" runat="server">傳送人員：</asp:label>
						</div>
						<div class="dTD">
							<asp:dropdownlist id="dlUser" runat="server" Width="7em"></asp:dropdownlist>
						</div>
					</div>
				</div>
				<div id="GridTable" class="DivTable">
                    <div class="GridDiv">
                        <asp:datagrid id="dg1" runat="server" Width="37.5em" PageSize="30" AutoGenerateColumns="False" GridLines="Vertical" CellPadding="0">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="簽核類型">
									<ItemStyle HorizontalAlign="Center"></ItemStyle>
									<ItemTemplate>
										<asp:Label id="lbSignType" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="傳送對象代碼">
									<ItemTemplate>
										<asp:HyperLink id="hlToOu" tabIndex="0" runat="server"></asp:HyperLink>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="傳送單位">
									<ItemTemplate>
										<asp:Label id="lbOuID" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="傳送角色">
									<ItemTemplate>
										<asp:Label id="lbRole" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="傳送人員">
									<ItemTemplate>
										<asp:Label id="lbUser" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</div>
				</div>
			</div>
            <asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
                <asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
            </asp:Panel>
		</FORM>
	</BODY>
</HTML>
