<%@ Page language="c#" Codebehind="EDR560.aspx.cs" AutoEventWireup="false" Inherits="ED5.EDR560" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDR560 發文標籤列印作業</TITLE>
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
		<FORM id="EDR560" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable">
				<DIV class="DivTable" id="Table1">
					<DIV class="dTR">
						<DIV class="dTDTitle">
							<asp:label id="Label9" runat="server" CssClass="RequireField">郵寄日期：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txPostDate" tabIndex="0" runat="server" Width="4em" CssClass="RequireFieldNumeric" MaxLength="7"></asp:textbox>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle">
							<asp:label id="Label8" runat="server">發文時間：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:textbox id="txSTime" tabIndex="10" runat="server" Width="2.5em" MaxLength="4" CssClass="InputFieldNumeric"></asp:textbox>
							<asp:label id="Label6" runat="server">－</asp:label>
							<asp:textbox id="txETime" tabIndex="10" runat="server" Width="2.5em" MaxLength="4" CssClass="InputFieldNumeric"></asp:textbox>
							<asp:dropdownlist id="dlTime" tabIndex="10" runat="server" Width="8em"></asp:dropdownlist>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle">
							<asp:label id="Label5" runat="server">列印範圍：</asp:label>
						</DIV>
						<DIV class="dTD">
							<DIV class="dTR">
								<asp:radiobutton id="rbAll" runat="server" GroupName="PrintRange" Text="全部"></asp:radiobutton>
							</DIV>
							<DIV class="dTR">
								<asp:radiobutton id="rbUser" runat="server" GroupName="PrintRange" Text="指定彙整人"></asp:radiobutton>
								<asp:textbox id="txUser" runat="server" Width="5em"></asp:textbox>
							</DIV>
						</DIV>
					</DIV>
					<DIV class="dTR">
						<DIV class="dTDTitle">
							<asp:label id="lbOrder" runat="server">排序方式：</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:radiobutton id="rbSeq" runat="server" GroupName="TypeGroup" Text="依郵寄序號"></asp:radiobutton>
							<asp:radiobutton id="rbOrgName" runat="server" GroupName="TypeGroup" Text="依受文者"></asp:radiobutton>
						</DIV>
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
								<asp:TemplateColumn>
									<HeaderTemplate>
										<DIV class="dTR">
											<DIV style="width:17.5em" class="dTD">
												<asp:Label id="OrgName" runat="server">受文機關</asp:Label>
											</DIV>
											<DIV style="width:8em" class="dTD">
												<asp:Label id="PostName" runat="server" Width="6em">郵寄方式</asp:Label>
											</DIV>
											<DIV style="width:14em" class="dTD">
												<asp:Label id="DocNo" runat="server">公文文號</asp:Label><BR>
											</DIV>
										</DIV>
										<DIV class="dTR">
											<asp:Label id="Address" runat="server">郵遞區號／地址</asp:Label>
										</DIV>
									</HeaderTemplate>
									<ItemTemplate>
										<DIV class="dTR">
											<DIV style="width:6em" class="dTD">
												<asp:Label id="lbOrgId" runat="server"></asp:Label>
											</DIV>
											<DIV style="width:12.5em" class="dTD">
												<asp:Label id="lbOrgName" runat="server"></asp:Label>
											</DIV>
											<DIV style="width:7em" class="dTD">
												<asp:Label id="lbPostName" runat="server"></asp:Label>
											</DIV>
											<DIV style="width:14em" class="dTD">
												<asp:TextBox id="txDocNo" runat="server" CssClass="PopUp"></asp:TextBox>
											</DIV>
										</DIV>
										<DIV class="dTR">
											<DIV style="width:4em" class="dTD">
												<asp:Label id="lbPostCode" runat="server"></asp:Label>
											</DIV>
											<DIV style="width:26em" class="dTD">
												<asp:Label id="lbAddress" runat="server"></asp:Label>
											</DIV>
										</DIV>
									</ItemTemplate>
								</asp:TemplateColumn>
							</Columns>
						</asp:datagrid>
					</DIV>
				</DIV>
			</DIV>
			<asp:Panel ID="tbTool" runat="server" CssClass="V3_GenericBannerToolBar">
				<asp:Button ID="btSearch" runat="server" Text="搜尋" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btPrint" runat="server" Text="列印" Style="display: none" DefaultStyle="newmode:none;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
