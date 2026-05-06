<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls" %>
<%@ Register TagPrefix="cc1" Namespace="T2100.Web.UI.WebControls" Assembly="WebControl" %>
<%@ Page language="c#" Codebehind="TBI150.aspx.cs" AutoEventWireup="false" Inherits="TB1.TBI150" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<TITLE>TBI150</TITLE>
		<META content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<META content="C#" name="CODE_LANGUAGE">
		<META content="JavaScript" name="vs_defaultClientScript">
		<META content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STD/LIB/SYS.css" type="text/css" rel="stylesheet">
	</HEAD>
	<BODY MS_POSITIONING="GridLayout">
		<FORM id="TBI150" onkeyup="jf_CheckFull();" method="post" runat="server">
			<!--Template V3 Generated WebForm-->
			<DIV id="service" style="BEHAVIOR: url(../../../STD/LIB/webservice.htc)"></DIV>
			<FONT face="新細明體"></FONT><FONT face="新細明體"></FONT><FONT face="新細明體"></FONT><FONT face="新細明體">
			</FONT><FONT face="新細明體"></FONT><FONT face="新細明體"></FONT><FONT face="新細明體"></FONT>
			<FONT face="新細明體"></FONT><FONT face="新細明體"></FONT><FONT face="新細明體"></FONT>
			<DIV id="hiddenDiv" style="Z-INDEX: -100; VISIBILITY: hidden; WIDTH: 1px; HEIGHT: 1px"><asp:customvalidator id="Validator" runat="server" ErrorMessage="CustomValidator"></asp:customvalidator><asp:validationsummary id="ValidationSummary1" runat="server"></asp:validationsummary><asp:listbox id="lbReturnValue" runat="server" Width="80px"></asp:listbox></DIV>
			<TABLE class="BaseTable" id="BaseTable" style="Z-INDEX: 101" border="0">
			</TABLE>
			<iewc:toolbar id="tbTool" runat="server" Font-Size="X-Small" EnableViewState="False" CssClass="V3_GenericChildToolBar" style="Z-INDEX: 102; LEFT: 0px; POSITION: absolute; TOP: 0px">
				<iewc:ToolbarButton Text="下載(D)" ImageUrl="../../../STD/IMAGE/FRISTPAGE_E.gif" ID="btDownload" AccessKey="D" ToolTip="下載(ALT+D)"></iewc:ToolbarButton>
				<iewc:ToolbarSeparator></iewc:ToolbarSeparator>
				<iewc:ToolbarButton Text="＜＜" ID="btFirst" AccessKey="F" ToolTip="第一筆(ALT+F)"></iewc:ToolbarButton>
				<iewc:ToolbarButton Text="＜" ID="btPrev" AccessKey="P" ToolTip="前一筆(ALT+P)"></iewc:ToolbarButton>
				<iewc:ToolbarButton Text="＞" ID="btNext" AccessKey="N" ToolTip="下一筆(ALT+N)"></iewc:ToolbarButton>
				<iewc:ToolbarButton Text="＞＞" ID="btLast" AccessKey="L" ToolTip="末一筆(ALT+L)"></iewc:ToolbarButton>
				<iewc:ToolbarSeparator></iewc:ToolbarSeparator>
				<iewc:ToolbarLabel Text="共"></iewc:ToolbarLabel>
				<iewc:ToolbarLabel ID="lbTotal"></iewc:ToolbarLabel>
				<iewc:ToolbarLabel Text="筆"></iewc:ToolbarLabel>
				<iewc:ToolbarSeparator></iewc:ToolbarSeparator>
				<iewc:ToolbarLabel Text="第"></iewc:ToolbarLabel>
				<iewc:ToolbarTextBox Width="28px" ID="txPos"></iewc:ToolbarTextBox>
				<iewc:ToolbarLabel Text="筆"></iewc:ToolbarLabel>
				<iewc:ToolbarButton Text="GO" ID="btGo" ToolTip="GO(ALT+G)"></iewc:ToolbarButton>
			</iewc:toolbar></FORM>
	</BODY>
</HTML>
