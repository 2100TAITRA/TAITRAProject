<%@ Page language="c#" Codebehind="IFM140T1.aspx.cs" AutoEventWireup="false" Inherits="IF1.IFM140T1" %>
<%@ Register TagPrefix="iewc" Namespace="Microsoft.Web.UI.WebControls" Assembly="Microsoft.Web.UI.WebControls, Version=1.0.2.116, Culture=neutral, PublicKeyToken=31bf3856ad364e35" %>
<!DOCTYPE HTML>
<HTML>
	<HEAD>
		<title>Left</title>
		<meta content="Microsoft Visual Studio 8.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../../../STDN/LIB/SYS.css" type="text/css" rel="stylesheet">
		<link rel="stylesheet" href="../IFLIB/css/zTreeStyle/zTreeStyle.css" type="text/css">
		<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
		<meta name="format-detection" content="telephone=no">
		<!--#include file="/STDN/Lib/Script.shtml"-->
		<asp:Literal ID="LiteralCSS" runat="server"></asp:Literal>
		<style>BODY { BACKGROUND-COLOR: white }
	TD { FONT-FAMILY: verdana,helvetica; WHITE-SPACE: nowrap; FONT-SIZE: 10pt; TEXT-DECORATION: none }
	A { COLOR: black; TEXT-DECORATION: none }
		</style>
	</HEAD>
	<body style="BACKGROUND-COLOR: window" MS_POSITIONING="GridLayout">
		<form id="Left" method="post" runat="server">
			<asp:customvalidator id="Validator" style="Z-INDEX: 105; POSITION: absolute; TOP: 195px; LEFT: 23px" runat="server" ErrorMessage="CustomValidator" CssClass="hidden"></asp:customvalidator>
			<asp:validationsummary id="ValidationSummary1" style="Z-INDEX: 104; POSITION: absolute; TOP: 252px; LEFT: 12px" runat="server" CssClass="hidden"></asp:validationsummary>
			<DIV id="hiddenDiv" style="Z-INDEX: -100; POSITION: absolute;VISIBILITY: hidden">
				<asp:customvalidator id="Customvalidator1" style="Z-INDEX: 105; POSITION: absolute; TOP: 195px; LEFT: 23px" runat="server" ErrorMessage="CustomValidator" CssClass="hidden"></asp:customvalidator>
				<asp:validationsummary id="ValidationSummary2" style="Z-INDEX: 104; POSITION: absolute; TOP: 252px; LEFT: 12px" runat="server" CssClass="hidden"></asp:validationsummary>
				<asp:listbox id="lbReturnValue" runat="server" Width="5.5em" CssClass="hidden"></asp:listbox>
			    <asp:textbox id="H_JsonData" runat="server" TextMode="MultiLine"></asp:textbox>
			</DIV>
			<DIV id="tbMain" style="WIDTH: 100%;" cellSpacing="0" cols="1" cellPadding="0" rows="2">
				<DIV style="TEXT-ALIGN: center; OVERFLOW: hidden">
					<IMG style="PADDING-BOTTOM: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px; PADDING-TOP: 0px" src="../IMAGE/UI_images/logo.gif" border="0">
				</DIV>
				<DIV style="WIDTH: 100%; TABLE-LAYOUT: fixed" cellSpacing="0" cols="1" cellPadding="0">
					<DIV style="BORDER-BOTTOM: buttonshadow 1px solid; BORDER-LEFT: buttonhighlight 1px solid; PADDING-BOTTOM: 2px; BACKGROUND-COLOR: menu; PADDING-LEFT: 2px; WIDTH: 100%; PADDING-RIGHT: 2px; HEIGHT: 1.5em; BORDER-TOP: buttonhighlight 1px solid; BORDER-RIGHT: buttonshadow 1px solid; PADDING-TOP: 2px" vAlign="middle" noWrap></DIV>
				</DIV>
			</DIV>
				<asp:DropDownList id="dlOrg" runat="server" AutoPostBack="True" CssClass="hidden"></asp:DropDownList>
				<asp:textbox id="txAppSetRootPath" style="Z-INDEX: 103; POSITION: absolute; DISPLAY: none; TOP: 258px; LEFT: 12px" runat="server"></asp:textbox>
				<asp:textbox id="txAuthWS" style="Z-INDEX: 103; POSITION: absolute; DISPLAY: none; TOP: 258px; LEFT: 12px" runat="server"></asp:textbox>
			<script src="../LIB/IF_LIB.js"></script>
			<script src="IFM140T1.js"></script>
			<div id="TheGreatTV" style="BACKGROUND-COLOR: window; WIDTH: 100%; FONT-SIZE: x-small; OVERFLOW: auto">下載應用程式選單中...</div>
			<DIV id="divForTreeView" style=" WIDTH: 100%; OVERFLOW: auto">
				<ul id="tv" class="ztree"></ul>
			</DIV>
		</form>
	</body>
<script type="text/javascript" src="../IFLIB/jquery.ztree.core-3.5.js"></script>
<script type="text/javascript" src="../IFLIB/jquery.ztree.exhide-3.5.js"></script>
</HTML>
