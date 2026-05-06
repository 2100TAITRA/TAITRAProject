<%@ Page language="c#" Codebehind="TBC320.aspx.cs" AutoEventWireup="false" Inherits="TB1.TBC320" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<TITLE>TBC320 他網RSS頻道訂閱設定查詢子視窗</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STD/LIB/SYS.css" type="text/css" rel="stylesheet">
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="TBC320" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../TBLIB/GenericChild.htm"-->
			<DIV id="service" style="BEHAVIOR: url(../../../STD/LIB/webservice.htc)"></DIV>
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<TABLE class="BaseTable" id="BaseTable" style="Z-INDEX: 102; LEFT: 12px; WIDTH: 100%; POSITION: absolute; TOP: 71px; HEIGHT: 80px"
				border="0">
				<TR>
					<TD style="HEIGHT: 58px" vAlign="top" align="center" colSpan="3"><FONT face="新細明體">
							<TABLE class="MainTable" id="MainTable" style="WIDTH: 251px; HEIGHT: 23px" cellSpacing="0"
								cellPadding="0">
								<TR>
									<TD class="LeftCol" align="right" colSpan="1" rowSpan="1"><asp:label id="Label1" runat="server" Width="80px" Font-Names="細明體" Font-Size="Small" CssClass="InputFieldLabel">頻道名稱：</asp:label></TD>
									<TD><asp:textbox id="txTitle" tabIndex="0" runat="server" Width="246px" Font-Names="細明體" Font-Size="Small"
											CssClass="InputFieldText" Height="25px"></asp:textbox></TD>
								</TR>
							</TABLE>
						</FONT>
					</TD>
				</TR>
				<TR>
					<TD style="WIDTH: 10%"></TD>
					<TD style="WIDTH: 80%" vAlign="top" align="center">
						<TABLE id="GridTable" style="WIDTH: 279px; HEIGHT: 296px" height="296" cellSpacing="0"
							cellPadding="0" width="279">
							<TR>
								<TD>
									<DIV style="OVERFLOW: auto; WIDTH: 278px; HEIGHT: 500px"><asp:datagrid id="dg1" CssClass = "hide" runat="server" Width="136px" Height="1px" BackColor="White" BorderStyle="None"
											BorderColor="#DEDFDE" ForeColor="Black" BorderWidth="1px" CellPadding="0" GridLines="Vertical" AutoGenerateColumns="False">
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
														<asp:HyperLink id="hlTitle" runat="server" Width="240px" CssClass="InputFieldLabel" Font-Size="Small"
															Font-Names="細明體"></asp:HyperLink>
													</ItemTemplate>
												</asp:TemplateColumn>
											</Columns>
											<PagerStyle HorizontalAlign="Right" ForeColor="Black" BackColor="#F7F7DE" Mode="NumericPages"></PagerStyle>
										</asp:datagrid></DIV>
								</TD>
							</TR>
						</TABLE>
					</TD>
					<TD style="WIDTH: 10%"></TD>
				</TR>
			</TABLE>
			<iewc:toolbar id="tbTool" runat="server" Font-Size="X-Small" CssClass="V3_GenericChildToolBar"
				EnableViewState="False">
				<iewc:ToolbarButton Text="搜尋(F)" ImageUrl="../../../STD/IMAGE/Search_E.gif" ID="btSearch" AccessKey="F"
					ToolTip="搜尋(ALT+F)"></iewc:ToolbarButton>
				<iewc:ToolbarSeparator></iewc:ToolbarSeparator>
			</iewc:toolbar></FORM>
	</BODY>
</HTML>
