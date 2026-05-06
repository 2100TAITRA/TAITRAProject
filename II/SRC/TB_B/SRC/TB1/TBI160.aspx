<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="TBI160.aspx.cs" AutoEventWireup="false" Inherits="TB1.TBI160" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<TITLE>TBI160</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STD/LIB/SYS.css" type="text/css" rel="stylesheet">
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="TBI160" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<DIV id="service" style="BEHAVIOR: url(../../../STD/LIB/webservice.htc)"></DIV>
			<DIV id="hiddenDiv" style="Z-INDEX: -100; LEFT: 0px; VISIBILITY: hidden; WIDTH: 100px; POSITION: absolute; TOP: 0px; HEIGHT: 100px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<TABLE class="BaseTable" id="BaseTable" style="Z-INDEX: 102; LEFT: 12px; WIDTH: 100%; POSITION: absolute; TOP: 12px; HEIGHT: 80px" border="0">
				<TR>
					<TD vAlign="top" align="left" colSpan="3">
						<DIV id="DivBulletin" style="DISPLAY: none; OVERFLOW: auto; WIDTH: 500px; HEIGHT: 400px">
							<TABLE class="MainTable" id="MainTable" style="Z-INDEX: 101" cellSpacing="0" cellPadding="0" height="1" width="1">
								<TR>
									<TD class="LeftCol" align="right" colSpan="1" rowSpan="1"><asp:label id="Label1" runat="server" Width="80px" CssClass="InputFieldLabel" Font-Size="Small" Font-Names="細明體">類　　別：</asp:label></TD>
									<TD colSpan="5"><asp:label id="lbCategory" runat="server" Font-Size="Small" Font-Names="細明體"></asp:label></TD>
								</TR>
								<TR>
									<TD class="LeftCol" align="right" colSpan="1" rowSpan="1"><asp:label id="Label2" runat="server" CssClass="InputFieldLabel" Font-Size="Small" Font-Names="細明體">公告日期：</asp:label></TD>
									<TD><asp:label id="lbPasteDate" runat="server" Font-Size="Small" Font-Names="細明體"></asp:label></TD>
								</TR>
								<TR>
									<TD class="LeftCol" align="right" colSpan="1" rowSpan="1"><asp:label id="Label3" runat="server" CssClass="InputFieldLabel" Font-Size="Small" Font-Names="細明體">刊登天數：</asp:label></TD>
									<TD><asp:label id="lbDays" runat="server" Font-Size="Small" Font-Names="細明體"></asp:label></TD>
								</TR>
								<TR>
									<TD class="LeftCol" align="right" colSpan="1" rowSpan="1"><asp:label id="Label4" runat="server" CssClass="InputFieldLabel" Font-Size="Small" Font-Names="細明體">公告期限：</asp:label></TD>
									<TD><asp:label id="lbExpireDate" runat="server" Font-Size="Small" Font-Names="細明體"></asp:label></TD>
								</TR>
								<TR>
									<TD class="LeftCol" align="right" colSpan="1" rowSpan="1"><asp:label id="Label5" runat="server" CssClass="InputFieldLabel" Font-Size="Small" Font-Names="細明體">主　　旨：</asp:label></TD>
									<TD colSpan="5"><asp:label id="lbSubject" runat="server" Font-Size="Small" Font-Names="細明體"></asp:label></TD>
								</TR>
								<TR>
									<TD class="LeftCol" vAlign="top" align="right" colSpan="1" rowSpan="1"><asp:label id="Label6" runat="server" CssClass="InputFieldLabel" Font-Size="Small" Font-Names="細明體">說　　明：</asp:label></TD>
									<TD vAlign="top" colSpan="5"><asp:label id="lbContent" runat="server" Width="400px" Font-Size="Small" Font-Names="細明體"></asp:label></TD>
								</TR>
							</TABLE>
						</DIV>
					</TD>
				</TR>
				<TR>
					<TD style="WIDTH: 10%"></TD>
					<TD style="WIDTH: 80%" vAlign="top" align="middle"></TD>
					<TD style="WIDTH: 10%"></TD>
				</TR>
			</TABLE>
		</FORM>
	</BODY>
</HTML>
