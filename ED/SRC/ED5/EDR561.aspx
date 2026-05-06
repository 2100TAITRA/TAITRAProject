<%@ Page language="c#" Codebehind="EDR561.aspx.cs" AutoEventWireup="false" Inherits="ED5.EDR561" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR561 郵寄標籤批次列印作業</TITLE>
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
		<FORM id="EDR561" onkeyup="jf_CheckFull();" method="post" runat="server"> 
		<!--Template V3 Generated WebForm--> 
		<!--#include file="../EDLIB/GenericSearch.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:textbox id="txHideReturn" runat="server" Width="32px"></asp:textbox>
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
				<asp:textbox id="txHiddenEnv" runat="server" Width="1px" Height="6px"></asp:textbox>
				<asp:textbox id="txHiddenOrgNo" runat="server" Width="1px" Height="8px"></asp:textbox>
				<asp:textbox id="H_DeptNo" runat="server" Width="1px" Height="8px"></asp:textbox>
				<asp:textbox id="H_UserId" runat="server" Width="1px" Height="8px"></asp:textbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9.5em">
							<asp:label id="lbOrgName" runat="server" CssClass="KeyField">受文機關：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txAcpOrg" tabIndex="0" runat="server" Width="5.5em" CssClass="KeyField" MaxLength="20"></asp:textbox>
							<asp:imagebutton id="btHelp" tabIndex="0" runat="server" ImageUrl="../../../STD/IMAGE/HELPFILE_E.gif"></asp:imagebutton>&nbsp;
							<asp:label id="lbOrg" runat="server" Width="19em" CssClass="KeyField"></asp:label>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9.5em">
							<asp:label id="lbNo" runat="server">郵遞區號：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txMailNo" tabIndex="0" runat="server" Width="3.5em" CssClass="InputFieldNumeric" MaxLength="6"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9.5em">
							<asp:label id="lbAdd" runat="server">地址：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txAdd" tabIndex="0" runat="server" Width="22em"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle" style="WIDTH: 9.5em">
							<asp:label id="lbAcpName" runat="server">受文者：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txAcpName" tabIndex="0" runat="server" Width="9em"></asp:textbox>
						</DIV>
					</DIV>
				</DIV>
				<DIV id="GridTable" class="DivTable">
					<DIV class="dTR">
						<asp:Panel ID="tbSelect" runat="server" CssClass="DgSelectToolBar">
							<asp:Button ID="btSelectAll" runat="server" Text="全選" />
							<asp:Button ID="btSelectInverse" runat="server" Text="反向" />
							<asp:Button ID="btSelectClear" runat="server" Text="清除" />
							<asp:Button ID="btDeleteSelected" runat="server" Text="刪除" />
							<asp:Button ID="btUp" runat="server" Text="↑" />
							<asp:Button ID="btDown" runat="server" Text="↓" />
							<asp:Button ID="btAdd" runat="server" Text="加入" />
						</asp:Panel>
					</DIV>
					<DIV class="GridDiv" style="HEIGHT: 16.5em">
						<asp:datagrid id="dg1" runat="server" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" PageSize="30">
							<Columns>
								<asp:TemplateColumn HeaderText="序">
									<ItemTemplate>
										<asp:Label id="lbSEQ_NO" runat="server"></asp:Label>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="選">
									<ItemTemplate>
										<asp:CheckBox id="cbSelect" tabIndex="0" runat="server"></asp:CheckBox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="受文者">
									<ItemTemplate>
										<asp:TextBox id="txAcp" runat="server" width="9em"></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="郵遞區號">
									<ItemTemplate>
										<asp:textbox id="txNo" tabIndex="0" runat="server" CssClass="InputFieldNumeric" MaxLength="5" width="4.5em"></asp:textbox>
									</ItemTemplate>
								</asp:TemplateColumn>
								<asp:TemplateColumn HeaderText="地址">
									<ItemTemplate>
										<asp:TextBox id="txAddress" runat="server" width="22.5em"></asp:TextBox>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btClean" runat="server" Text="清除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
