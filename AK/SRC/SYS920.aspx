<%@ Page language="c#" Codebehind="SYS920.aspx.cs" AutoEventWireup="false" Inherits="AK.SYS920" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE>
<HTML>
	<HEAD>
		<title>電子檔案管理系統</title>
		<meta content="Microsoft Visual Studio 7.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<link rel="stylesheet" href="/EA/EALIB/css/zTreeStyle/zTreeStyle.css" type="text/css">
		<LINK href="lib/style.css" type="text/css" rel="stylesheet">
	</HEAD>
	<body text="#000000" bgColor="#0e7cb7" MS_POSITIONING="GridLayout" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onload="fnLoad()">
		
		<%--<OBJECT STYLE="display:none" CLASSID="CLSID:E9D1CF41-2EC6-4E06-88E9-43E9235F086E" CODEBASE="lib\W32.CAB#Version=1,0,0,7"></OBJECT>
		<OBJECT STYLE="display:none" CLASSID="CLSID:1987EDF6-3B8A-4FBD-98A0-D9ED2BF64C79" CODEBASE="lib\EnvelopedCOM.cab#Version=2,3,3,301"></OBJECT>--%>
		<form id="Form1" method="post" runat="server">
			<!--#include file="/STDN/Lib/Script.shtml"-->
			<DIV id="divTree" >
				<ul id="Classtree" class="ztree"></ul>
			</DIV>
			<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center">
				<!--DWLayoutTable-->
				<tr>
					<td width="247" >
						<table width="100%" border="0" cellpadding="0" cellspacing="0">
							<!--DWLayoutTable-->
							<%--<tr>
								<TD width="247" height="40" valign="top">
									<table width="100%" border="0" cellpadding="0" cellspacing="0">
										<!--DWLayoutTable-->
										<tr>
											<TD width="247" height="40" valign="top" bgcolor="#0e7cb7"><!--DWLayoutEmptyCell-->
												&nbsp;
											</TD>
										</tr>
									</table>
								</TD>
							</tr>
							<tr>
								<TD height="40" valign="top">
									<table width="100%" border="0" cellpadding="0" cellspacing="0">
										<!--DWLayoutTable-->
										<tr>
											<TD width="23" height="40" valign="top" background="images/index_13.gif"><!--DWLayoutEmptyCell-->
												&nbsp;
											</TD>
											<TD width="188" valign="top" class="TreeTopBottom" background="images/index_14.gif"><!--DWLayoutEmptyCell-->
												&nbsp;
											</TD>
											<TD width="25" valign="top" background="images/index_15.gif"><!--DWLayoutEmptyCell-->
												&nbsp;
											</TD>
										</tr>
									</table>
								</TD>
							</tr>
							<tr>
								<TD height="274" valign="top">
									<table width="100%" border="0" cellpadding="0" cellspacing="0">
										<!--DWLayoutTable-->
										<tr>
											<TD width="34" height="274" valign="top" background="images/index_21.gif"><!--DWLayoutEmptyCell-->
												&nbsp;
											</TD>
											<TD width="188" valign="top">
												<table width="100%" border="0" cellpadding="0" cellspacing="0">
													<!--DWLayoutTable-->
													<tr>
														<TD bgcolor="#ffffff"><!--DWLayoutEmptyCell-->
															
														</TD>
													</tr>
												</table>
											</TD>
											<TD width="25" valign="top" background="images/index_23.gif"><!--DWLayoutEmptyCell-->
												&nbsp;
											</TD>
										</tr>
									</table>
								</TD>
							</tr>
							<tr>
								<TD height="39" valign="top">
									<table width="100%" border="0" cellpadding="0" cellspacing="0">
										<!--DWLayoutTable-->
										<tr>
											<TD width="34" height="39" valign="top" background="images/index_30.gif"><!--DWLayoutEmptyCell-->
												&nbsp;
											</TD>
											<TD width="188" valign="top" class="TreeTopBottom" background="images/index_31.gif"><!--DWLayoutEmptyCell-->
												&nbsp;
											</TD>
											<TD width="25" valign="top" background="images/index_32.gif"><!--DWLayoutEmptyCell-->
												&nbsp;
											</TD>
										</tr>
									</table>
								</TD>
							</tr>--%>
							<tr>
								<TD height="192" valign="top">
									<table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-left: 50px;">
										<!--DWLayoutTable-->
										<tr>
											<TD width="34" height="25" valign="top"><!--DWLayoutEmptyCell--> &nbsp;
											</TD>
											<TD class="bgCenter bg44" valign="top"><!--DWLayoutEmptyCell-->
												&nbsp;
											</TD>
											<TD width="25" valign="top"><!--DWLayoutEmptyCell--> &nbsp;
											</TD>
										</tr>
										<tr>
											<TD height="167" valign="top" background="images/index_48.gif"><!--DWLayoutEmptyCell-->
												&nbsp;
											</TD>
											<TD class="bgCenter bg49" valign="top" ><!--DWLayoutEmptyCell--> &nbsp;
											</TD>
											<%--<TD valign="top" background="images/index_50.gif"><!--DWLayoutEmptyCell--> &nbsp;
											</TD>--%>
										</tr>
									</table>
								</TD>
							</tr>
							<tr>
								<TD height="333">&nbsp;</TD>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<asp:textbox id="Cwin" style="Z-INDEX: 103; LEFT: 14px; POSITION: absolute; TOP: 116px" runat="server" CssClass="nosee"></asp:textbox>
			<asp:label id="lbUSERIP" style="Z-INDEX: 101; LEFT: 147px; POSITION: absolute; TOP: -4px" runat="server" Visible="False">lbUSERIP</asp:label>
			<asp:dropdownlist id="dlLINK" style="Z-INDEX: 102; LEFT: 8px; POSITION: absolute; TOP: 8px" runat="server" CssClass="nosee"></asp:dropdownlist></form>
	</body>
	<script type="text/javascript" src="/EA/EALIB/jquery.ztree.core-3.5.js"></script>
	<script type="text/javascript" src="/EA/EALIB/jquery.ztree.exhide-3.5.js"></script>
</HTML>
