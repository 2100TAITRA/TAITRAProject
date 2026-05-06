<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EAT807C1.aspx.cs" AutoEventWireup="false" Inherits="EA08.EAT807C1" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAT807C1 分類號使用單位查詢子視窗</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width = device - width, initial - scale = 1.0, maximum - scale = 1.0, user - scalable = 0">
		<meta name="format - detection" content="telephone = no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EAT807C1" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
                <asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
                <asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
                <asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:textbox id="h_OrgNo" runat="server" CssClass="hide" ></asp:textbox>
			</DIV>
			<DIV class="DivBaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 8em; "><asp:label id="Label2" runat="server">使用單位：</asp:label></DIV>
						<DIV class="dTD" style="width: 13em; ">
							<asp:dropdownlist id="dlUseDept" runat="server" ></asp:dropdownlist>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 8em; "><asp:label id="Label1" runat="server">版本別：</asp:label></DIV>
						<DIV class="dTD" style="width: 13em; ">
							<asp:textbox id="txVerNo" runat="server" Width="2em" MaxLength="3" CssClass="DisplayOnly" ReadOnly="true"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="width: 8em; "><asp:label id="Label3" runat="server" >最底層分類號：</asp:label></DIV>
						<DIV class="dTD" style="width: 13em; ">
                            <asp:textbox id="txClsNo" runat="server" Width="12.5em" MaxLength="20" ></asp:textbox>
							<asp:textbox id="h_ClsKey" runat="server" CssClass="hide" ></asp:textbox>
                            <asp:label id="lbClsName" runat="server" ></asp:label>
						</DIV>
					</DIV>
				</DIV>
				<DIV class="DivTable">
					<DIV class="dTR">
						<DIV class="dTD">
							<DIV class = "GridDiv" style="HEIGHT: 156px;">
								<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="99">
									<Columns>
										<asp:TemplateColumn HeaderText="序">
											<ItemTemplate>
												<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="分類號">
											<ItemTemplate>
												<asp:HyperLink id="hlClsNo" tabIndex="0" runat="server"></asp:HyperLink>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="使用單位">
											<ItemTemplate>
												<asp:Label id="lbDeptName" runat="server"></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</DIV>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="查詢" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
                <asp:Button ID="btPreview" runat="server" Text="預覽" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btExcel" runat="server" Text="Excel" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
