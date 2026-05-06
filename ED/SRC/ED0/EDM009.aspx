<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EDM009.aspx.cs" AutoEventWireup="false" Inherits="ED0.EDM009" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EDM009 個人新進待辦通知設定作業</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<LINK href="../EDLIB/EDLIB.css" type="text/css" rel="stylesheet">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EDM009" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EDLIB/GenericBanner.htm"-->
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV class="DivBaseTable" id="BaseTable" >
				<DIV class="DivTable" id="MainTable">
					<DIV class="dTR">
						<DIV class="dTD" style="width:16em">
							<asp:label id="Label1" runat="server" Width="5.5em">公文資料夾</asp:label>
						</DIV>
						<DIV class="dTD">
							<asp:label id="Label2" runat="server" Width="5.5em">通知資料夾</asp:label>
						</DIV>
					</DIV>
					<DIV class="DivTable">
						<DIV class="dTD">
							<DIV class="GridDiv" style="height: 17em" data-fixed="true">
								<asp:datagrid id="dgDoc" runat="server" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center" AutoGenerateColumns="False"	GridLines="Vertical">
									<Columns>
										<asp:TemplateColumn HeaderText="資料夾">
											<ItemTemplate>
												<asp:Label id="txDocFloder" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="是否通知">
											<ItemTemplate>
												<asp:CheckBox id="cbDocNotify" runat="server"></asp:CheckBox>
											</ItemTemplate>
										</asp:TemplateColumn>
									</Columns>
								</asp:datagrid>
							</DIV>
						</DIV>
							<DIV class="dTD">
							<DIV class="GridDiv" style="height: 17em" data-fixed="true" >
								<asp:datagrid id="dgMsg"  runat="server" HeaderStyle-HorizontalAlign="Center" ItemStyle-HorizontalAlign="Center" AutoGenerateColumns="False" GridLines="Vertical">
									<Columns>
										<asp:TemplateColumn HeaderText="資料夾">
											<ItemTemplate>
												<asp:Label id="txMsgFloder" runat="server" ></asp:Label>
											</ItemTemplate>
										</asp:TemplateColumn>
										<asp:TemplateColumn HeaderText="是否通知">
											<ItemTemplate>
												<asp:CheckBox id="cbMsgNotify" runat="server"></asp:CheckBox>
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
				<asp:Button ID="btSave" runat="server" Text="儲存" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
				<asp:Button ID="btDelete" runat="server" Text="刪除" Style="display: none" DefaultStyle="newmode:block;modifymode:block;" />
			</asp:Panel>
		</FORM>
	</BODY>
</HTML>
