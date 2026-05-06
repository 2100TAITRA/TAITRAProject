
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="EAC401.aspx.cs" AutoEventWireup="false" Inherits="EA04.EAC401" %>
<!DOCTYPE HTML >
<HTML>
	<HEAD>
		<TITLE>EAC401 媒體型式代碼查詢子視窗</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<style>.fixHeaderStyle { POSITION: relative; ; TOP: expression(this.offsetParent.scrollTop); BACKGROUND-COLOR: #6b696b; TEXT-ALIGN: center } </style>
		<LINK href="../../../STD/LIB/SYS.css" type="text/css" rel="stylesheet">
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="EAC401" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericChild.htm"-->
			<DIV id="service" style="BEHAVIOR: url(../../../STD/LIB/webservice.htc)"></DIV>
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<TABLE class="BaseTable" id="BaseTable" >
				<TR>
					<TD style="HEIGHT: 23px" vAlign="top" align="middle" colSpan="3"></TD>
				</TR>
				<TR>
					<TD style="WIDTH: 10%"></TD>
					<TD style="WIDTH: 80%" vAlign="top" align="middle">
						<TABLE id="GridTable" style="WIDTH: 490px; HEIGHT: 115px" height="115" cellSpacing="0" cellPadding="0" width="490">
							<TR>
								<TD></TD>
							</TR>
							<TR>
								<TD>
									<DIV style="OVERFLOW: auto; WIDTH: 491px; HEIGHT: 221px"><FONT face="新細明體">
											<asp:datagrid id="dg1" runat="server" Width="100%" BackColor="White" BorderStyle="None" BorderColor="#DEDFDE" ForeColor="Black" BorderWidth="1px" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False" Height="25%" PageSize="1">
												<SelectedItemStyle Font-Bold="True" ForeColor="White" BackColor="#CE5D5A"></SelectedItemStyle>
												<AlternatingItemStyle BackColor="White"></AlternatingItemStyle>
												<ItemStyle BackColor="#F7F7DE"></ItemStyle>
												<HeaderStyle Font-Bold="True" HorizontalAlign="Center" ForeColor="White" CssClass="fixHeaderStyle" BackColor="#6B696B"></HeaderStyle>
												<FooterStyle BackColor="#CCCC99"></FooterStyle>
												<Columns>
													<asp:TemplateColumn HeaderText="媒體代碼">
														<ItemStyle HorizontalAlign="Center"></ItemStyle>
														<ItemTemplate>
															<asp:HyperLink id="hlMediaNo" tabIndex="0" runat="server" Width="46px" CssClass="InputFieldLabel"></asp:HyperLink>
														</ItemTemplate>
													</asp:TemplateColumn>
													<asp:TemplateColumn HeaderText="媒體名稱">
														<ItemTemplate>
															<asp:Label id="lbMediaDesp" runat="server" Width="170px" CssClass="InputFieldLabel" Font-Size="Small" Font-Names="細明體"></asp:Label>
														</ItemTemplate>
													</asp:TemplateColumn>
													<asp:TemplateColumn HeaderText="計量單位">
														<ItemStyle HorizontalAlign="Center"></ItemStyle>
														<ItemTemplate>
															<asp:Label id="lbUnit" runat="server" Width="76px" CssClass="InputFieldLabel" Font-Names="細明體" Font-Size="Small"></asp:Label>
														</ItemTemplate>
													</asp:TemplateColumn>
													<asp:TemplateColumn HeaderText="預設代碼">
														<ItemStyle HorizontalAlign="Center"></ItemStyle>
														<ItemTemplate>
															<asp:Label id="lbDefault" runat="server" Width="46px" CssClass="InputFieldLabel" Font-Size="Small" Font-Names="細明體"></asp:Label>
														</ItemTemplate>
													</asp:TemplateColumn>
													<asp:TemplateColumn HeaderText="群組代碼">
														<ItemTemplate>
															<asp:Label id="lbGrpNo" runat="server" Width="46px" CssClass="InputFieldLabel" Font-Names="細明體" Font-Size="Small"></asp:Label>
														</ItemTemplate>
													</asp:TemplateColumn>
												</Columns>
												<PagerStyle HorizontalAlign="Right" ForeColor="Black" BackColor="#F7F7DE" Mode="NumericPages"></PagerStyle>
											</asp:datagrid></FONT></DIV>
								</TD>
							</TR>
						</TABLE>
					</TD>
					<TD style="WIDTH: 10%"></TD>
				</TR>
			</TABLE>
		</FORM>
	</BODY>
</HTML>
