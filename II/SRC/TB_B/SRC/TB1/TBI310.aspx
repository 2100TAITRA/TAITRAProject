<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="TBI310.aspx.cs" AutoEventWireup="false" Inherits="TB1.TBI310" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<TITLE>TBI310 RSS訂閱頻道列表</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STD/LIB/SYS.css" type="text/css" rel="stylesheet">
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="TBI310" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../TBLIB/GenericBanner.htm"-->
			<DIV id="service" style="BEHAVIOR: url(../../../STD/LIB/webservice.htc)"></DIV>
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<TABLE class="BaseTable" id="BaseTable" style="Z-INDEX: 102; LEFT: 12px; WIDTH: 100%; POSITION: absolute; TOP: 71px; HEIGHT: 80px"
				border="0">
				<TR>
					<TD style="HEIGHT: 489px" vAlign="top" align="center" colSpan="3">
						<TABLE id="GridTable" style="WIDTH: 319px; HEIGHT: 304px" height="304" cellSpacing="0"
							cellPadding="0" width="319">
							<TR>
								<TD>
									<DIV style="OVERFLOW: auto; WIDTH: 318px; HEIGHT: 500px">
										<asp:datagrid id="dg1" runat="server" Width="96px" Height="1px" AutoGenerateColumns="False" GridLines="Vertical"
											CellPadding="0" BorderWidth="1px" ForeColor="Black" BorderColor="#DEDFDE" BorderStyle="None"
											BackColor="White">
											<FooterStyle BackColor="#CCCC99"></FooterStyle>
											<SelectedItemStyle Font-Bold="True" ForeColor="White" BackColor="#CE5D5A"></SelectedItemStyle>
											<AlternatingItemStyle BackColor="White"></AlternatingItemStyle>
											<ItemStyle BackColor="#F7F7DE"></ItemStyle>
											<HeaderStyle Font-Bold="True" HorizontalAlign="Center" ForeColor="White" BackColor="#6B696B"></HeaderStyle>
											<Columns>
												<asp:TemplateColumn HeaderText="序">
													<ItemStyle HorizontalAlign="Right"></ItemStyle>
													<ItemTemplate>
														<asp:Label id="lbSEQ_NO" runat="server" Font-Size="Small" Font-Names="細明體"></asp:Label>
													</ItemTemplate>
												</asp:TemplateColumn>
												<asp:TemplateColumn HeaderText="頻道名稱">
													<ItemTemplate>
														<asp:Label id="lbNAME" runat="server" Width="240px" CssClass="InputFieldLabel" Font-Size="Small"
															Font-Names="細明體"></asp:Label>
														<asp:Label id="lbCATEGORY_ID" runat="server" CssClass="hide"></asp:Label>
													</ItemTemplate>
												</asp:TemplateColumn>
												<asp:TemplateColumn>
													<ItemTemplate>
														<asp:ImageButton id="btRSS" runat="server" ImageUrl="../IMAGE/RSS.gif"></asp:ImageButton>
													</ItemTemplate>
												</asp:TemplateColumn>
											</Columns>
											<PagerStyle HorizontalAlign="Right" ForeColor="Black" BackColor="#F7F7DE" Mode="NumericPages"></PagerStyle>
										</asp:datagrid></DIV>
								</TD>
							</TR>
						</TABLE>
					</TD>
				</TR>
				<TR>
					<TD style="WIDTH: 10%"></TD>
					<TD style="WIDTH: 80%" vAlign="top" align="center">
					</TD>
					<TD style="WIDTH: 10%"></TD>
				</TR>
			</TABLE>
			<iewc:toolbar id="tbTool" runat="server" CssClass="V3_GenericChildToolBar" EnableViewState="False"
				Font-Size="X-Small" Visible="False">
				<iewc:ToolbarButton Text="更新" ImageUrl="../../../STD/IMAGE/REFRESH_E.gif" ID="btRefresh" ToolTip="更新"></iewc:ToolbarButton>
				<iewc:ToolbarSeparator></iewc:ToolbarSeparator>
			</iewc:toolbar>
		</FORM>
	</BODY>
</HTML>
