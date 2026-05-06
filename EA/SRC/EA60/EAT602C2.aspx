<%@ Page language="c#" Codebehind="EAT602C2.aspx.cs" AutoEventWireup="false" Inherits="EA60.EAT602C2" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<TITLE>EAT602C2 憑證資訊子視窗</TITLE>
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
		<FORM id="EAT602C2" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<!--#include file="../EALIB/GenericBanner.htm"-->
			<DIV style="Z-INDEX: -100; POSITION: absolute; WIDTH: 100px; HEIGHT: 100px; VISIBILITY: hidden; TOP: 0px; LEFT: 0px" id="hiddenDiv">
				<asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox>
			</DIV>
			<DIV id="BaseTable" class="DivBaseTable">
				<DIV id="MainTable" class="DivTable">
					<DIV class="dTR">
						<DIV style="WIDTH: 10em" class="dTDTitle"><asp:label id="Label1" runat="server" >憑證主體：</asp:label></DIV>
						<DIV class="dTD"><asp:label id="Label2" runat="server" ></asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 10em" class="dTDTitle"><asp:label id="Label3" runat="server" >有效期限（起）：</asp:label></DIV>
						<DIV class="dTD"><asp:label id="Label4" runat="server" ></asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 10em" class="dTDTitle"><asp:label id="Label5" runat="server" >有效期限（迄）：</asp:label></DIV>
						<DIV class="dTD"><asp:label id="Label6" runat="server" ></asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 10em" class="dTDTitle"><asp:label id="Label7" runat="server" >發行者：</asp:label></DIV>
						<DIV class="dTD"><asp:label id="Label8" runat="server" ></asp:label></DIV>
					</DIV>
					<DIV class="dTR">
						<DIV style="WIDTH: 10em" class="dTDTitle"><asp:label id="Label9" runat="server" >憑證序號：</asp:label></DIV>
						<DIV class="dTD"><asp:label id="Label10" runat="server" ></asp:label></DIV>
					</DIV>
				</DIV>
			</DIV>
		</FORM>
	</BODY>
</HTML>
